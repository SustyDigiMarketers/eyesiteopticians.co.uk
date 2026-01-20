import React from 'react';
import { CheckIcon, PlayCircleIcon } from './icons';
import { Page } from '../types';
import { media } from './media';

interface WhyChooseUsProps {
    navigate: (page: Page) => void;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ navigate }) => {
    return (
        <section className="bg-white py-16 sm:py-24" id="why-choose-us">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="lg:pr-8 text-center lg:text-left">
                    <p className="text-primary font-semibold mb-2">Why Choose Us</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                        Our Blended Learning Model
                    </h2>
                    <p className="text-gray-600 mb-8">
                        We operate through a blended learning model combining:
                    </p>
                    <ul className="space-y-4 mb-10 inline-block text-left">
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">Classroom-based training (6 technology enabled smart classrooms)</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">Online live sessions.</span>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">Weekend workshops.</span>
                        </li>
                         <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">Project-based practical labs.</span>
                        </li>
                    </ul>
                    <div>
                        <button 
                            onClick={() => navigate('courses')}
                            className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-hover transition-all duration-300"
                        >
                            Discover More
                        </button>
                    </div>
                </div>
                <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] rounded-lg overflow-hidden group">
                    <img
                        src={media.whyChooseUs.lectureHall}
                        alt="A modern lecture hall"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <a href="#" aria-label="Play video about our university" className="transform scale-100 group-hover:scale-110 transition-transform duration-300">
                            <PlayCircleIcon className="w-20 h-20 lg:w-24 lg:h-24 text-white opacity-80 group-hover:opacity-100" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;