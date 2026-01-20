import React, { useState, useEffect, useRef } from 'react';
import { SwooshStarIcon, QuoteIcon } from './icons';

const testimonialsData = [
    {
        quote: "Faustina Academy completely changed my career trajectory. The blend of technology and language is unique and powerful.",
        name: 'Mehwish',
        role: 'Full Stack Developer',
        avatar: 'https://i.pravatar.cc/150?u=1'
    },
    {
        quote: "The environment here is world-class. I learned Robotics in a way that was practical, engaging, and industry-focused.",
        name: 'Elizabeth Jeff',
        role: 'Robotics Engineer',
        avatar: 'https://i.pravatar.cc/150?u=2'
    },
    {
        quote: "The best EdTech platform I've encountered. They truly care about rural empowerment and digital equality.",
        name: 'Emily Thomas',
        role: 'Language Specialist',
        avatar: 'https://i.pravatar.cc/150?u=3'
    },
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length),
            6000
        );

        return () => {
            resetTimeout();
        };
    }, [currentIndex]);

    return (
        <section className="py-32 bg-white relative overflow-hidden" id="testimonials">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-1/2 pointer-events-none"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <div className="inline-block p-4 bg-primary rounded-3xl shadow-2xl shadow-primary/30 mb-10 animate-float">
                            <QuoteIcon className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-10">
                            Echoes of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Our Visionaries.</span>
                        </h2>
                        <p className="text-xl text-slate-500 max-w-md leading-relaxed font-medium mb-12">
                            Real stories from students who transformed their lives through our blended learning ecosystem.
                        </p>
                        
                        <div className="flex space-x-4">
                            {testimonialsData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-700 ${
                                        currentIndex === index ? 'w-12 bg-primary' : 'w-3 bg-slate-200 hover:bg-slate-300'
                                    }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-secondary/20 rounded-full blur-[80px] opacity-20 animate-pulse"></div>
                        
                        <div className="glass-card rounded-[3rem] p-12 sm:p-16 relative overflow-hidden transition-spring min-h-[450px] flex flex-col justify-center border-white/50 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]">
                            <div className="relative z-10">
                                <div 
                                    key={currentIndex} 
                                    className="animate-[fadeSlideIn_0.8s_cubic-bezier(0.16,1,0.3,1)]"
                                >
                                    <p className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight mb-12 italic">
                                        "{testimonialsData[currentIndex].quote}"
                                    </p>
                                    
                                    <div className="flex items-center space-x-6">
                                        <div className="w-20 h-20 rounded-2.5xl overflow-hidden shadow-2xl border-4 border-white">
                                            <img src={testimonialsData[currentIndex].avatar} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-900">{testimonialsData[currentIndex].name}</h4>
                                            <p className="text-sm font-bold text-primary uppercase tracking-widest">{testimonialsData[currentIndex].role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute -bottom-10 -right-10 opacity-5">
                                <SwooshStarIcon className="w-64 h-64 scale-150" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateX(30px) scale(0.98); }
                    to { opacity: 1; transform: translateX(0) scale(1); }
                }
            `}</style>
        </section>
    );
};

export default TestimonialsSection;