import React from 'react';
import { GlobeIcon, LaptopIcon, UsersIcon, LibraryIcon } from './icons';

interface StatItemProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => (
  <div className="relative group bg-white p-8 rounded-3xl border border-gray-100 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(66,133,244,0.1)] overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors"></div>
    
    <div className="flex flex-col items-center sm:items-start relative z-10">
        <div className="text-primary mb-6 p-4 rounded-2xl bg-primary-light group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
            {React.cloneElement(icon, { className: "w-10 h-10" })}
        </div>
        <div className="text-center sm:text-left">
            <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter group-hover:text-primary transition-colors">{value}</p>
            <p className="text-gray-500 font-medium text-sm sm:text-base uppercase tracking-widest">{label}</p>
        </div>
    </div>
  </div>
);

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <GlobeIcon />,
      value: '3+',
      label: 'Years of Excellence',
    },
    {
      icon: <LaptopIcon />,
      value: '99+',
      label: 'Digital Courses',
    },
    {
      icon: <UsersIcon />,
      value: '10+',
      label: 'Expert Mentors',
    },
    {
      icon: <LibraryIcon />,
      value: '11k+',
      label: 'Global Learners',
    },
  ];

  return (
    <section className="bg-slate-50/50 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;