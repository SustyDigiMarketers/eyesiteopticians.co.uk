import React, { useState, useRef } from 'react';
import { 
    FacebookIcon, 
    LinkedinIcon, 
    InstagramIcon, 
    SendIcon, 
    MailIcon,
    LocationIcon,
    PhoneIcon
} from './icons';
import { Page } from '../types';

interface FooterProps {
    navigate: (page: Page, options?: { anchor?: string }) => void;
    onLoginClick: () => void;
    onAdmissionClick: () => void;
    logo: string;
    schoolName: string;
    schoolNameSuffix: string;
}

const Footer: React.FC<FooterProps> = ({ navigate, onLoginClick, onAdmissionClick, logo, schoolName, schoolNameSuffix }) => {
    
    const [copyrightClicks, setCopyrightClicks] = useState(0);
    const clickTimeoutRef = useRef<number | null>(null);

    const handleNav = (e: React.MouseEvent, page: Page, anchor?: string) => {
        e.preventDefault();
        navigate(page, { anchor });
    };
    
    const handleCopyrightClick = () => {
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        const newClickCount = copyrightClicks + 1;
        setCopyrightClicks(newClickCount);
        if (newClickCount >= 3) {
            onLoginClick();
            setCopyrightClicks(0);
        } else {
            clickTimeoutRef.current = window.setTimeout(() => setCopyrightClicks(0), 1000);
        }
    };

    return (
        <footer className="relative bg-[#020617] text-slate-400 overflow-hidden border-t border-white/5 font-sans">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-start">
                            {/* Accent Bar from design */}
                            <div className="w-1.5 h-10 bg-primary/60 rounded-full mr-4 self-center"></div>
                            <span className="text-lg font-black text-white tracking-tighter uppercase leading-tight">
                                {schoolName} <br/>
                                <span className="text-white/80">{schoolNameSuffix}</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed font-medium text-slate-400 max-w-xs">
                            Re-engineering the educational landscape through advanced pedagogical frameworks.
                        </p>
                        <div className="flex space-x-3">
                            {[
                                { icon: <FacebookIcon />, label: 'Facebook', href: '#' },
                                { icon: <LinkedinIcon />, label: 'LinkedIn', href: '#' },
                                { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
                            ].map((social, idx) => (
                                <a key={idx} href={social.href} className="relative p-2.5 bg-slate-900 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all group/social">
                                    {React.cloneElement(social.icon as React.ReactElement<any>, { className: "w-4 h-4 relative z-10" })}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* System Core Column */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8 opacity-50">System Core</h3>
                        <ul className="space-y-4 text-sm font-bold">
                            {['home', 'about', 'courses', 'contact'].map((page) => (
                                <li key={page}>
                                    <a href="#" onClick={(e) => handleNav(e, page as Page)} className="text-slate-400 hover:text-primary transition-all">
                                        {page.charAt(0).toUpperCase() + page.slice(1)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Operations Hub Column */}
                    <div className="lg:col-span-3">
                        <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8 opacity-50">Operations Hub</h3>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onAdmissionClick(); }} className="text-slate-400 hover:text-secondary transition-all">Admissions Portal</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'home', 'testimonials')} className="text-slate-400 hover:text-white transition-all">Success Matrix</a></li>
                            <li><a href="#" onClick={(e) => handleNav(e, 'blog')} className="text-slate-400 hover:text-white transition-all">Digital Intel</a></li>
                        </ul>
                    </div>

                    {/* Terminal Card */}
                    <div className="lg:col-span-3">
                        <div className="bg-[#0b1222]/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 space-y-6 shadow-2xl">
                            <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-2 opacity-60">Terminal</h3>
                            <div className="space-y-5">
                                <div className="flex items-center group/item">
                                    <div className="p-2 border border-white/10 rounded-lg mr-4 group-hover/item:border-primary transition-colors">
                                        <LocationIcon className="w-4 h-4 text-slate-500 group-hover/item:text-primary"/>
                                    </div>
                                    <span className="text-xs text-slate-400 font-bold group-hover/item:text-slate-200 transition-colors">Trichy, India</span>
                                </div>
                                <div className="flex items-center group/item">
                                    <div className="p-2 border border-white/10 rounded-lg mr-4 group-hover/item:border-primary transition-colors">
                                        <MailIcon className="w-4 h-4 text-slate-500 group-hover/item:text-primary"/>
                                    </div>
                                    <span className="text-xs text-slate-400 font-bold truncate group-hover/item:text-slate-200 transition-colors">FaustinaEasyEd...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="relative bg-black/40 py-8 border-t border-white/5 z-10 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-[9px] font-black tracking-[0.2em] uppercase text-slate-600">
                    <p onClick={handleCopyrightClick} className="cursor-pointer hover:text-primary transition-colors select-none">
                        &copy; {new Date().getFullYear()} <span className="text-slate-500">{schoolName} {schoolNameSuffix}</span>
                    </p>
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <span className="opacity-40">Core Engine</span>
                        <a href="https://sustydigimarketers.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-secondary transition-all">SustyDigiMarketers</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;