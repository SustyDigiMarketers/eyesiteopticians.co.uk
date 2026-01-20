import React from 'react';
import { UniversityIcon, BookOpenIcon, MailIcon } from './icons';
import { Page } from '../types';

interface FeatureCardsProps {
    navigate: (page: Page) => void;
    onAdmissionClick: () => void;
}

interface CardProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ icon, title, description, onClick }) => (
  <div 
    onClick={onClick}
    className="group relative overflow-hidden glass-card rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(3,79,173,0.1)] border-white/40"
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
  >
    {/* Animated background glow */}
    <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
    
    <div className="relative z-10">
        <div className="bg-gradient-to-br from-primary to-primary-hover text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
          {React.cloneElement(icon, { className: "w-7 h-7" })}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3 transition-colors group-hover:text-primary">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        
        <div className="mt-6 flex items-center text-primary font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            Learn More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </div>
    </div>
  </div>
);

const FeatureCards: React.FC<FeatureCardsProps> = ({ navigate, onAdmissionClick }) => {
  const features = [
    {
      icon: <BookOpenIcon />,
      title: 'Our Programs',
      description: 'Explore futuristic courses in Robotics, Coding, and Languages.',
      onClick: () => navigate('courses'),
    },
    {
      icon: <UniversityIcon />,
      title: 'Quick Admission',
      description: 'Apply in minutes through our streamlined digital enrollment process.',
      onClick: onAdmissionClick,
    },
    {
      icon: <MailIcon />,
      title: 'Contact Support',
      description: 'Get in touch with our experts for career guidance and counseling.',
      onClick: () => navigate('contact'),
    },
  ];

  return (
    <div className="relative -mt-32 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;