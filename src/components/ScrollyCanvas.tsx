'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 90;

const currentFrame = (index: number) => {
  // 1. Changed padding from 2 to 3 (for "000")
  const padded = index.toString().padStart(3, '0');
  
  // 2. Updated the delay to match your filename exactly ("0.066s")
  // Make sure the extension (.webp, .jpg, .png) matches your actual files!
  return `/sequence/frame_${padded}_delay-0.066s.png`; 
};
function drawScaledImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) {
  // SAFETY CHECK 1: Never draw a broken image
  if (!img.complete || img.naturalHeight === 0) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  
  // We can now safely use natural dimensions
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
  const newWidth = imgWidth * ratio;
  const newHeight = imgHeight * ratio;

  const offsetX = (canvasWidth - newWidth) / 2;
  const offsetY = (canvasHeight - newHeight) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, newWidth, newHeight);
}

export default function ScrollyCanvas({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Render Loop
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = images[index];

    if (!canvas || !ctx || !img) return;

    if (img.complete) {
        drawScaledImage(ctx, img, canvas);
    } else {
        img.onload = () => drawScaledImage(ctx, img, canvas);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    const rawIndex = Math.floor(latest * FRAME_COUNT);
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, rawIndex));
    renderFrame(frameIndex);
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
        if (canvasRef.current && images.length > 0) {
            // Set canvas size to match window
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;

            // Redraw current frame immediately so it doesn't disappear
            const latest = scrollYProgress.get();
            const rawIndex = Math.floor(latest * FRAME_COUNT);
            const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, rawIndex));
            renderFrame(frameIndex);
        }
    };
    
    // Initial setup
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {children}
      </div>
    </div>
  );
}