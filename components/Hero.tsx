
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';
import { Page, BlogPost } from '../types';
import { Course } from './CourseCard';
import { media } from './media';

const slides = [
    {
        pretitle: "FAUSTINA ACADEMY",
        title: "Together We'll Explore New Horizons",
        description: "Experience the next generation of education where technology meets human potential.",
        video: media.hero.video1
    },
    {
        pretitle: "INNOVATIVE FUTURE",
        title: "Shape Your Destiny with Intelligence",
        description: "Unlock premium language skills and technical expertise in a world-class environment.",
        video: media.hero.video2
    },
    {
        pretitle: "GLOBAL IMPACT",
        title: "Join a Network of Visionaries",
        description: "Bridging the gap between rural talent and international opportunities.",
        video: media.hero.video3
    }
];

interface HeroProps {
    navigate: (page: Page, options?: { post?: BlogPost, course?: Course, anchor?: string }) => void;
    schoolName?: string;
}

const Hero: React.FC<HeroProps> = ({ navigate, schoolName }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 7000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

    return (
        <section className="relative h-[600px] md:h-[750px] text-white overflow-hidden bg-black">
            <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] animate-grid"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-black"></div>
            </div>

            {slides.map((slide, index) => (
                <div 
                    key={index} 
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <video 
                        src={slide.video} 
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-slate-900/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]"></div>
                    
                    <div className="relative z-20 h-full flex items-center">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className={`max-w-4xl transition-all duration-1000 transform ${index === currentSlide ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
                                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-xl mb-8 animate-float">
                                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                                    <p className="text-secondary font-black tracking-[0.3em] uppercase text-xs sm:text-sm">{slide.pretitle}</p>
                                </div>
                                
                                <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black mb-8 leading-[0.95] tracking-tighter drop-shadow-2xl">
                                    {slide.title.split(' ').map((word, i) => (
                                        <span key={i} className={`inline-block mr-4 ${i % 2 === 0 ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary relative group'}`}>
                                            {word}
                                            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer"></span>
                                        </span>
                                    ))}
                                </h1>
                                
                                <p className="text-lg sm:text-2xl text-gray-300/90 mb-12 max-w-2xl leading-relaxed font-medium">
                                    {slide.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-5">
                                    <button 
                                        onClick={() => navigate('courses')}
                                        className="relative group overflow-hidden bg-primary text-white font-black py-5 px-12 rounded-2xl hover:shadow-[0_0_40px_rgba(66,133,244,0.5)] transition-all duration-500"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            Discover Courses
                                            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
                                    </button>
                                    <button 
                                        onClick={() => navigate('about')}
                                        className="bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black py-5 px-12 rounded-2xl hover:bg-white/20 transition-all duration-500 hover:border-white/40"
                                    >
                                        Our Story
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex space-x-4 items-center">
                {slides.map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-1.5 transition-all duration-700 rounded-full ${i === currentSlide ? 'w-16 bg-primary shadow-[0_0_10px_rgba(66,133,244,0.8)]' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                    />
                ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none"></div>

            <button onClick={prevSlide} className="absolute z-30 left-10 top-1/2 transform -translate-y-1/2 glass-card p-5 rounded-2xl text-white hover:bg-primary hover:border-transparent transition-all group">
                <ArrowLeftIcon className="w-7 h-7 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="absolute z-30 right-10 top-1/2 transform -translate-y-1/2 glass-card p-5 rounded-2xl text-white hover:bg-primary hover:border-transparent transition-all group">
                <ArrowRightIcon className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
            </button>
        </section>
    );
};

export default Hero;
