import React, { useState, useEffect } from 'react';
import { 
    MailIcon, 
    LocationIcon, 
    MenuIcon, 
    XIcon,
    FacebookIcon,
    LinkedinIcon,
    InstagramIcon,
    PlusIcon,
    SendIcon
} from './icons';
import { Page, BlogPost } from '../types';

type UserRole = 'admin' | 'superadmin' | null;

interface HeaderProps {
    navigate: (page: Page, options?: { post?: BlogPost, anchor?: string }) => void;
    onAdmissionClick: () => void;
    userRole: UserRole;
    onLogout: () => void;
    logo: string;
    schoolName: string;
    schoolNameSuffix: string;
}

interface NavItem {
    name: string;
    page: Page;
    href: string;
}

const Header: React.FC<HeaderProps> = ({ navigate, onAdmissionClick, userRole, onLogout, logo, schoolName, schoolNameSuffix }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNav = (e: React.MouseEvent, page?: Page, anchor?: string) => {
        if (page) {
            e.preventDefault();
            navigate(page, { anchor });
            setMobileMenuOpen(false);
        }
    };

    const navItems: NavItem[] = [
        { name: 'Home', page: 'home', href: '#' },
        { name: 'About', page: 'about', href: '#' },
        { name: 'Courses', page: 'courses', href: '#' },
        { name: 'Blog', page: 'blog', href: '#' },
        { name: 'Contact', page: 'contact', href: '#' },
    ];

    if (userRole) {
        navItems.push({ name: 'Dashboard', page: 'admin', href: '#' });
    }

    return (
        <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled ? 'translate-y-0' : 'translate-y-0'}`}>
            {/* Tactical Top Bar */}
            <div className={`bg-slate-950/90 border-b border-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex items-center space-x-2.5 group cursor-default">
                            <div className="relative">
                                <MailIcon className="w-3 h-3 text-secondary" />
                                <div className="absolute inset-0 bg-secondary/40 blur-sm animate-pulse rounded-full"></div>
                            </div>
                            <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                                <span className="text-secondary/60 mr-2">Link:</span>
                                FaustinaEasyEducation@gmail.com
                            </span>
                        </div>
                        <div className="flex items-center space-x-2.5 group cursor-default">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
                            <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                                <span className="text-primary/60 mr-2">Loc:</span>
                                Trichy, India
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-5 ml-auto">
                        <div className="flex items-center space-x-4 pr-4 border-r border-white/10">
                            <a href="#" className="text-slate-500 hover:text-white transition-colors"><LinkedinIcon className="w-3 h-3" /></a>
                            <a href="#" className="text-slate-500 hover:text-secondary transition-colors"><InstagramIcon className="w-3 h-3" /></a>
                        </div>
                        <div className="flex items-center text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_#10b981]"></span>
                            System Live
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bridge */}
            <div className={`transition-all duration-500 relative ${scrolled ? 'bg-slate-950/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-b border-white/5 py-2' : 'bg-white/95 backdrop-blur-md py-4'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        {/* Brand Identity */}
                        <div className="flex items-center">
                            <a href="#" onClick={(e) => handleNav(e, 'home')} className="flex items-center group">
                                <div className="relative p-1 bg-gradient-to-br from-primary/10 to-transparent rounded-xl mr-4 overflow-hidden">
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer"></div>
                                    <img src={logo} alt="Logo" className="h-10 sm:h-12 w-auto transition-all duration-500 group-hover:scale-110 relative z-10" />
                                </div>
                                <div className="flex items-start">
                                    <div className={`w-1 h-8 rounded-full mr-3 self-center transition-colors duration-500 ${scrolled ? 'bg-primary/40' : 'bg-primary'}`}></div>
                                    <span className={`text-lg sm:text-2xl font-black tracking-tighter uppercase leading-none transition-colors duration-500 ${scrolled ? 'text-white' : 'text-slate-900'}`}>
                                        {schoolName} <br/>
                                        <span className={`${scrolled ? 'text-primary' : 'text-primary'}`}>{schoolNameSuffix}</span>
                                    </span>
                                </div>
                            </a>
                        </div>
                        
                        {/* Neural Nav Links */}
                        <nav className="hidden lg:flex items-center space-x-2">
                            {navItems.map((item) => (
                                <a 
                                    key={item.name}
                                    href={item.href} 
                                    onClick={(e) => handleNav(e, item.page)} 
                                    className={`relative px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 group overflow-hidden ${scrolled ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-primary'}`}
                                >
                                    <span className="relative z-10">{item.name}</span>
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-500 shadow-[0_0_10px_#06b6d4]"></span>
                                    <span className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                </a>
                            ))}
                        </nav>

                        {/* Actions Control - Admission CTA */}
                        <div className="flex items-center space-x-6">
                            <button 
                                onClick={onAdmissionClick}
                                className={`group relative overflow-hidden font-black py-3 px-8 rounded-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 active:translate-y-0 text-[10px] tracking-[0.3em] uppercase border border-white/10 ${scrolled ? 'bg-primary text-white' : 'bg-slate-900 text-white'}`}
                            >
                                <span className="relative z-10 flex items-center">
                                    <span className="mr-2 text-secondary/60 font-medium">01</span>
                                    Apply Now
                                    <div className="ml-3 relative w-4 h-4 overflow-hidden">
                                        <PlusIcon className="w-4 h-4 absolute inset-0 transition-transform duration-500 group-hover:translate-y-[-100%]" />
                                        <SendIcon className="w-4 h-4 absolute inset-0 translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0 text-secondary" />
                                    </div>
                                </span>
                                {/* Pulsing Ambient Glow */}
                                <div className="absolute inset-0 bg-primary/20 animate-pulse group-hover:opacity-0 transition-opacity"></div>
                                {/* Tech Shimmer Layer */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:animate-[shimmer_1.5s_infinite] transition-all"></div>
                                {/* High-Contrast Slide Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-700"></div>
                            </button>
                            
                            <button
                                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                className={`lg:hidden p-3 rounded-2xl transition-all ${scrolled ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-800 hover:bg-primary hover:text-white'}`}
                            >
                                {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Holographic Mobile Interface */}
            <div className={`lg:hidden fixed inset-0 z-[110] transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)}></div>
                <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-slate-900 border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-10 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-16">
                            <div className="flex items-center">
                                <div className="w-1 h-6 bg-primary mr-3 rounded-full"></div>
                                <span className="text-xl font-black text-white uppercase tracking-tighter leading-none">
                                    {schoolName} <br/>
                                    <span className="text-primary text-sm">{schoolNameSuffix}</span>
                                </span>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-white/5 text-white hover:bg-primary transition-colors">
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <nav className="flex flex-col space-y-6">
                            {navItems.map((item, idx) => (
                                <a 
                                    key={item.name}
                                    href={item.href} 
                                    onClick={(e) => handleNav(e, item.page)} 
                                    className="group flex items-center text-3xl font-black text-slate-400 hover:text-white transition-all duration-300 py-2"
                                    style={{ transitionDelay: `${idx * 50}ms` }}
                                >
                                    <span className="text-primary mr-4 opacity-0 group-hover:opacity-100 transition-opacity text-sm tracking-widest">0{idx+1}</span>
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        <div className="mt-auto pt-10 border-t border-white/5">
                             {userRole ? (
                                <button onClick={onLogout} className="w-full bg-red-500/10 text-red-500 font-black py-5 rounded-2xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-[0.2em] text-xs">
                                    Terminate Session
                                </button>
                            ) : (
                                <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Neural Network Ready</p>
                                    <button onClick={onAdmissionClick} className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl shadow-xl hover:bg-secondary hover:text-white transition-all uppercase text-[10px] tracking-widest">Connect Now</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;