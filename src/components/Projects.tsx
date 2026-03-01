'use client';

import { motion } from 'framer-motion';

const projects = [
    {
        title: 'CampusConnect',
        category: 'University Final Year Project',
        description: 'An upcoming comprehenhisive platform designed.Currently in development using the MERN stack.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: 'DevUtility',
        category: 'Fullstack Task Management System',
        description: 'A productivity application featuring user authentication,real-time database updates,and a custom dashbord for tracking project milestones..',
        image: 'https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Enterprise Dashboard',
        category: 'UI implementation & Logics',
        description: 'A robust web interface built to handle complex user data.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'CineLens',
        category: 'Cinematic Photography Portfolio',
        description: 'A curated digital gallery showcasing moody and cinematic prespectives.',
        image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2564&auto=format&fit=crop',
    }
];

export default function Projects() {
    return (
        <section className="relative z-20 bg-[#121212] py-32 px-6 lg:px-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-16"
                >
                    <h2 className="text-sm uppercase tracking-widest text-[#FFF95E] mb-4 font-semibold">Selected Work</h2>
                    <h3 className="text-4xl md:text-5xl font-sans tracking-tight text-white mb-2">Innovation in motion.</h3>
                    <p className="text-zinc-500 font-light max-w-xl">Curated works representing the intersection of aesthetics and robust engineering.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                            className="group relative flex flex-col rounded-[2rem] bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500 hover:border-white/10"
                        >
                            <div className="relative h-[450px] w-full overflow-hidden p-[2px]">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent z-10 opacity-80" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] object-cover rounded-t-[calc(2rem-2px)] transition-transform duration-1000 group-hover:scale-110"
                                />
                            </div>
                            <div className="relative z-20 p-8 pt-0 flex flex-col flex-grow transform -translate-y-12">
                                <span className="text-xs font-semibold text-[#FFF95E] mb-3 uppercase tracking-wider drop-shadow-md">{project.category}</span>
                                <h4 className="text-3xl font-sans font-medium text-white mb-3 drop-shadow-md">{project.title}</h4>
                                <p className="text-zinc-400 font-light leading-relaxed mb-6 max-w-sm drop-shadow-md">{project.description}</p>
                                <div className="mt-auto">
                                    <span className="inline-flex items-center text-sm font-medium text-white gap-2 group-hover:text-[#FFF95E] transition-colors cursor-pointer">
                                        Explore Project
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-2 transition-transform duration-300">
                                            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
