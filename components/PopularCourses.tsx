import React from 'react';
import CourseCard, { Course } from './CourseCard';

interface PopularCoursesProps {
    courses: Course[];
}

const PopularCourses: React.FC<PopularCoursesProps> = ({ courses }) => {
    const popularCourses = courses.slice(0, 4);

    return (
        <section className="bg-slate-50/50 py-32 relative overflow-hidden" id="courses">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(66,133,244,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-3xl">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-6 animate-float">
                            Academic Excellence
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-6">
                            Master the Skills of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">The Future.</span>
                        </h2>
                        <p className="text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
                            Join over 11,000 global learners who are shaping their destiny through our cutting-edge technical and linguistic programs.
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <button className="bg-white border border-slate-200 text-slate-800 font-black px-8 py-4 rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-500">
                            View All Courses
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {popularCourses.map((course, index) => (
                        <div 
                            key={course.id} 
                            className="opacity-0 translate-y-12 animate-[slideUp_0.8s_ease-out_forwards]"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <CourseCard course={course} />
                        </div>
                    ))}
                </div>
            </div>
            
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default PopularCourses;