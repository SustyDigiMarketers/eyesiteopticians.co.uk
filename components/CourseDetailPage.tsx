import React from 'react';
import { Course } from './CourseCard';
import { Page } from '../types';
import { ArrowLeftIcon, CheckIcon, ClockIcon, StarIcon, UserCircleIcon } from './icons';

interface CourseDetailPageProps {
    course: Course;
    navigate: (page: Page) => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, navigate }) => {
    
    const renderRating = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<StarIcon key={`star-${i}`} className="w-5 h-5 text-secondary" />);
        }
        
        if (stars.length < 5) {
            for (let i = stars.length; i < 5; i++) {
                 stars.push(<StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
            }
        }
        return stars;
    };

    const formatStudentCount = (students: number): string => {
        if (students >= 1000) {
            return `${(students / 1000).toFixed(1)}K`;
        }
        return students.toString();
    };
    
    return (
        <main className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <button
                    onClick={() => navigate('courses')}
                    className="flex items-center text-primary font-semibold hover:text-primary-hover transition-colors mb-8"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Back to All Courses
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <img src={course.image} alt={course.title} className="w-full h-auto max-h-[450px] object-cover rounded-lg shadow-lg mb-8" />
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                            {course.title}
                        </h1>
                        
                        <div className="prose prose-lg max-w-none text-gray-700 mb-10">
                            <p>{course.explanation}</p>
                        </div>

                        <div className="bg-slate-50 p-6 sm:p-8 rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">What You'll Learn</h2>
                             <ul className="space-y-4">
                                {course.uniqueness.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckIcon className="w-6 h-6 text-emerald-500 mr-3 mt-1 flex-shrink-0 bg-emerald-100 p-1 rounded-full" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:sticky lg:top-28 h-fit">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                            
                            <button className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-all duration-300 mb-6">
                                Enroll Now
                            </button>
                            
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800">Lessons</span>
                                    <div className="flex items-center">
                                         <ClockIcon className="w-5 h-5 mr-2 text-gray-400"/>
                                         <span>{course.lessons}</span>
                                    </div>
                                </li>
                                <li className="flex justify-between items-center border-t pt-4">
                                    <span className="font-semibold text-gray-800">Students</span>
                                    <div className="flex items-center">
                                         <UserCircleIcon className="w-5 h-5 mr-2 text-gray-400"/>
                                         <span>{formatStudentCount(course.students)}</span>
                                    </div>
                                </li>
                                <li className="flex justify-between items-center border-t pt-4">
                                    <span className="font-semibold text-gray-800">Rating</span>
                                    <div className="flex items-center">
                                        {renderRating(course.rating)}
                                        <span className="ml-2 font-bold text-gray-700">{course.rating.toFixed(1)}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default CourseDetailPage;