import React from 'react';
import { CheckIcon } from './icons';
import { Page, BlogPost } from '../types';
import { Course } from './CourseCard';
import { media } from './media';

interface AboutSectionProps {
    navigate: (page: Page, options?: { post?: BlogPost, course?: Course, anchor?: string }) => void;
    schoolName?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ navigate, schoolName }) => {
    return (
        <section className="py-24 bg-white relative overflow-hidden" id="about-us">
            {/* Floating background blobs */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-float"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative group">
                    {/* Futuristic Image Collage */}
                    <div className="relative w-full max-w-lg mx-auto aspect-square lg:aspect-auto lg:h-[600px]">
                        <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite] p-8"></div>
                        
                        <img 
                            src={media.aboutSection.studentsSmiling} 
                            alt="Students" 
                            className="absolute right-0 top-0 w-[85%] h-[85%] object-cover rounded-3xl shadow-2xl z-10 border-8 border-white group-hover:scale-[1.02] transition-transform duration-700"
                        />
                        
                        <div className="absolute left-0 bottom-12 w-2/3 p-4 glass-card rounded-2xl shadow-2xl z-20 animate-float">
                            <div className="flex items-center space-x-4">
                                <div className="bg-primary text-white p-3 rounded-xl shadow-lg shadow-primary/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xl font-black text-slate-800">10k+ Books</p>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Digital Resource Hub</p>
                                </div>
                            </div>
                        </div>
                        
                        <img 
                            src={media.aboutSection.studentReading} 
                            alt="Student" 
                            className="absolute left-0 top-12 w-2/5 aspect-square object-cover rounded-2xl shadow-xl z-10 border-4 border-white"
                        />
                    </div>
                </div>

                <div className="lg:pl-8">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary font-black text-xs uppercase tracking-[0.2em] mb-6">
                        Tomorrow's Education
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
                        Empowering Minds Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Innovation</span>
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                        Faustina Easy Education is not just an academy; it's a launchpad for your global career. We blend advanced technical training with linguistic mastery to create well-rounded visionaries.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                        {[
                            'Cloud Learning Systems',
                            'Expert Language Mentors',
                            'Career-Ready Projects',
                            'Global Certification'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center space-x-3 group/item">
                                <div className="bg-primary rounded-lg p-1 group-hover/item:scale-110 transition-transform">
                                    <CheckIcon className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-bold text-slate-700">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={() => navigate('about')}
                        className="bg-slate-900 text-white font-black py-4 px-12 rounded-xl hover:bg-primary transition-all duration-300 shadow-xl shadow-slate-900/10"
                    >
                        Explore More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;