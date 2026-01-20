import React, { useState } from 'react';
import { StarIcon, PlayCircleIcon, PlusIcon, MinusIcon } from './icons';
import { Course } from './CourseCard';
import { Page } from '../types';
import { 
    DesignIcon, 
    ManagementIcon, 
    ProgrammingIcon, 
    BusinessIcon, 
    AccountingIcon, 
    WritingIcon,
    GlobeIcon,
    LaptopIcon,
    GraduationCapIcon,
    UserCircleIcon,
    SearchIcon
} from './icons';
import { media } from './media';

const CoursesHero: React.FC = () => {
    return (
        <section className="bg-slate-900 text-white pt-16 sm:pt-20 pb-10 md:pb-24 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/wave-grid.png')] opacity-5"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 z-10 relative">
                <div className="text-center md:text-left">
                    <p className="text-sm font-bold text-secondary mb-2 tracking-wide">Education Goal</p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                        Your Gateway to Global Skills and Opportunities.
                    </h1>
                    <p className="text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                        Presenting Academy, the tech school of the future.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-all duration-300 w-full sm:w-auto">
                            Explore Courses
                        </button>
                        <button className="flex items-center font-semibold hover:text-secondary transition-colors">
                            <PlayCircleIcon className="w-10 h-10 sm:w-12 sm:h-12 mr-2 text-white" />
                            <span>Watch it Now</span>
                        </button>
                    </div>
                </div>
                <div className="relative h-full flex justify-center items-end order-first md:order-last">
                     <img 
                        src={media.coursesPage.heroStudent}
                        alt="A smiling student with a backpack and notebook" 
                        className="max-w-xs sm:max-w-sm md:max-w-md w-full"
                    />
                </div>
            </div>
             {/* Decorative elements */}
            <div className="absolute top-1/4 left-10 w-4 h-4 bg-secondary/50 transform rotate-45 opacity-50 hidden md:block"></div>
            <div className="absolute top-20 right-1/4 w-6 h-6 bg-primary/30 rounded-full opacity-50 hidden md:block"></div>
        </section>
    );
};

const PartnersSection: React.FC = () => {
    const partnerLogos = ['pencil', 'YBullFit', 'sixbase', 'pelican', 'AQUA', 'insight'];
    return (
        <div className="bg-white py-8 relative md:-mt-16 z-20 shadow-lg rounded-lg mx-4 md:mx-auto max-w-6xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-8 gap-y-4 items-center">
                        {partnerLogos.map(logo => (
                            <span key={logo} className="font-serif text-2xl text-gray-400 font-semibold text-center">{logo}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


interface TopicCardProps {
    title: string;
    courses: string;
    icon: React.ReactNode;
    color: string;
    onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ title, courses, icon, color, onClick }) => {
    return (
        <div onClick={onClick} className="bg-white border border-gray-100 rounded-lg p-4 sm:p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px] cursor-pointer">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${color}`}>
                {icon}
            </div>
            <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">{title}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{courses}</p>
        </div>
    )
}

const categoryDetails: { [key: string]: { icon: React.ReactElement, color: string } } = {
    'Foreign Languages': { icon: <GlobeIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-red-100 text-red-500' },
    'Phonics & English Communication': { icon: <WritingIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-primary-light text-primary' },
    'Robotics & Coding': { icon: <ProgrammingIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-red-100 text-red-500' },
    'Computer Hardware & IT Skills': { icon: <LaptopIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-secondary-light text-secondary' },
    'Commerce & Accounts': { icon: <AccountingIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-secondary-light text-secondary' },
    'Creative Arts': { icon: <DesignIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-purple-100 text-purple-500' },
    'Entrepreneurial coaching': { icon: <ManagementIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-yellow-100 text-yellow-500' },
    'Digital marketing training': { icon: <BusinessIcon className="w-8 h-8 sm:w-10 sm:h-10"/>, color: 'bg-yellow-100 text-yellow-500' },
};

const PopularTopicsSection: React.FC<{ courses: Course[], navigate: (page: Page, options: { course: Course }) => void }> = ({ courses, navigate }) => {
    return (
         <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                        Popular Topic, Which are Most <br className="hidden sm:block"/> Favourite To Students
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                    {courses.slice(0, 8).map(course => {
                        const details = categoryDetails[course.category] || { icon: <GraduationCapIcon />, color: 'bg-gray-100 text-gray-500'};
                        return <TopicCard 
                            key={course.id} 
                            title={course.title}
                            courses={`${course.lessons} lessons`}
                            icon={details.icon}
                            color={details.color}
                            onClick={() => navigate('course-detail', { course })}
                        />
                    })}
                </div>
            </div>
        </section>
    )
}

const HowItWorksSection: React.FC = () => {
    const steps = [
        {
            icon: <UserCircleIcon className="w-10 h-10 text-white" />,
            title: "Apply for Admission",
            description: "Start your journey by filling out our simple admission form to join our community.",
            color: "bg-primary"
        },
        {
            icon: <SearchIcon className="w-10 h-10 text-white" />,
            title: "Find Your Course",
            description: "Browse our extensive catalog of courses to find the one that matches your goals.",
            color: "bg-secondary"
        },
        {
            icon: <GraduationCapIcon className="w-10 h-10 text-white" />,
            title: "Start Learning",
            description: "Dive into expert-led content, complete projects, and start building new skills.",
            color: "bg-indigo-500"
        }
    ];

    return (
        <section className="bg-white py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-primary font-semibold mb-2">EASY PROCESS</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">How It Works</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Scaling up your knowledge is simple. Follow these three easy steps to begin your learning journey with us.</p>
                </div>
                <div className="relative max-w-5xl mx-auto">
                    {/* Dashed line connecting the steps */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-1 border-t-2 border-dashed border-gray-300"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${step.color} shadow-lg mb-4 z-10 border-4 border-white`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                                <p className="text-gray-600 px-4">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


const faqData = [
    {
        question: "What are the admission requirements?",
        answer: "Admission requirements vary by program. Generally, we require a completed application form, official transcripts, letters of recommendation, and a personal statement. Some programs may have additional requirements like portfolios or standardized test scores."
    },
    {
        question: "Can I apply for financial aid or scholarships?",
        answer: "Yes, we offer a variety of financial aid options, including scholarships, grants, and student loans. We encourage all prospective students to visit our financial aid office's website to explore the opportunities available and submit the necessary forms."
    },
    {
        question: "What is campus life like?",
        answer: "Our university boasts a vibrant and diverse campus life with over 100 student clubs and organizations, regular events, sports teams, and cultural festivals. There's always something happening, providing ample opportunities to get involved, make new friends, and develop new skills."
    },
    {
        question: "Do you offer online or remote learning options?",
        answer: "Absolutely. We offer a wide range of fully online and hybrid programs for both undergraduate and graduate students. Our flexible learning options are designed to accommodate the needs of students from all walks of life, allowing you to learn from anywhere in the world."
    }
];

const FaqSection: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-primary font-semibold mb-2">FAQ</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center text-left p-6 font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none"
                                aria-expanded={openFaq === index}
                            >
                                <span>{faq.question}</span>
                                {openFaq === index ? <MinusIcon className="w-5 h-5 text-primary" /> : <PlusIcon className="w-5 h-5 text-gray-500" />}
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                                <div className="p-6 pt-0 text-gray-600">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

interface CoursesPageProps {
    courses: Course[];
    navigate: (page: Page, options: { course: Course }) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ courses, navigate }) => {
    return (
        <main className="bg-slate-50">
            <CoursesHero />
            <PartnersSection />
            <PopularTopicsSection courses={courses} navigate={navigate} />
            <HowItWorksSection />
            <FaqSection />
        </main>
    );
};

export default CoursesPage;