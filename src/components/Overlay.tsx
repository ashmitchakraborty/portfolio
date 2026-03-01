'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Section 1: 0% - 25% scroll
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

    // Section 2: 30% - 45% scroll
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.15, 0.45], [100, -100]);

    // Section 3: 60% scroll
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.75], [100, -100]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] z-10 pointer-events-none">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-8 lg:px-24 overflow-hidden">

                {/* Section 1 */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute inset-0 flex items-center justify-center transform-gpu"
                >
                    <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-white text-center drop-shadow-2xl mix-blend-difference">
                        Ashmit Ranjan Chakraborty.<br />
                        <span className="text-zinc-300 font-light">Fullstack Developer.</span>
                    </h1>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute inset-0 flex items-center justify-start px-8 lg:px-24 transform-gpu"
                >
                    <h2 className="text-4xl md:text-6xl font-sans tracking-tight text-white drop-shadow-2xl max-w-2xl mix-blend-difference">
                        I build <span className="text-zinc-300 font-light italic">Creative websites.</span>
                    </h2>
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute inset-0 flex items-center justify-end px-8 lg:px-24 transform-gpu"
                >
                    <h2 className="text-4xl md:text-6xl font-sans tracking-tight text-white text-right drop-shadow-2xl max-w-2xl mix-blend-difference">
                        Bridging <span className="text-zinc-300 font-light italic">design</span> and <span className="text-zinc-300 font-light italic">engineering.</span>
                    </h2>
                </motion.div>
            </div>
        </div>
    );
}
