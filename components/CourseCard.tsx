import React from 'react';
import { StarIcon, UserCircleIcon, ClockIcon, ArrowRightIcon } from './icons';

export interface Course {
    id: number;
    image: string;
    category: string;
    price: string;
    title: string;
    description: string;
    explanation: string;
    uniqueness: string[];
    lessons: number;
    students: number;
    rating: number;
    instructor: {
        name: string;
    };
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    return (
        <div className="group relative bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02] flex flex-col w-full transition-spring">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-700 pointer-events-none"></div>
            
            <div className="relative h-60 overflow-hidden">
                <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute top-6 left-6 flex space-x-2">
                    <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
                        {course.category}
                    </span>
                    <span className="bg-secondary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
                        {course.price}
                    </span>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-full bg-white text-slate-900 font-black py-3 px-6 rounded-2xl shadow-xl flex items-center justify-center space-x-2 border-2 border-transparent hover:border-secondary transition-colors">
                        <span>Enroll Now</span>
                        <ArrowRightIcon className="w-4 h-4 text-secondary" />
                    </button>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-grow relative z-10">
                <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'text-secondary' : 'text-slate-200'}`} />
                    ))}
                    <span className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-widest">{course.rating} Rating</span>
                </div>

                <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-primary transition-colors leading-tight">
                    {course.title}
                </h3>
                
                <p className="text-slate-500 text-sm mb-8 flex-grow leading-relaxed">
                    {course.description}
                </p>

                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 pt-6 border-t border-slate-50">
                    <div className="flex items-center space-x-2 group/stat">
                        <ClockIcon className="w-4 h-4 text-primary group-hover/stat:scale-125 transition-transform" />
                        <span>{course.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center space-x-2 group/stat">
                        <UserCircleIcon className="w-4 h-4 text-secondary group-hover/stat:scale-125 transition-transform" />
                        <span>{course.students} Learners</span>
                    </div>
                </div>
            </div>
            
            <div className="h-1.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 absolute bottom-0 left-0"></div>
        </div>
    );
};

export default CourseCard;