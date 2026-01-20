
import React, { useEffect, useRef, useState } from 'react';
import { XIcon, LogoGraduationCapIcon, CheckIcon, UserCircleIcon, MailIcon, PhoneIcon, BookOpenIcon, SendIcon } from './icons';
import { Course } from './CourseCard';
import { SiteConfig } from '../types';

interface AdmissionFormProps {
    onClose: () => void;
    courses: Course[];
    siteConfig?: SiteConfig;
}

const PartyPop = () => (
    <>
        {[...Array(30)].map((_, i) => {
            const style = {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `party-pop-anim ${0.8 + Math.random() * 0.7}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.4}s`,
                backgroundColor: ['#4285F4', '#34A853', '#FBBC04', '#EA4335', '#10b981', '#f59e0b'][Math.floor(Math.random() * 6)]
            };
            return <div key={i} style={style} className="party-popper"></div>
        })}
    </>
);

const AdmissionForm: React.FC<AdmissionFormProps> = ({ onClose, courses, siteConfig }) => {
    const formRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(e.target as Node)) {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        if (!isSuccess) {
            const firstInput = formRef.current?.querySelector('input');
            firstInput?.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose, isSuccess]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            await fetch("https://script.google.com/macros/s/AKfycbxcrLrH3d5aHVydy2YHYHzfruVC6JIh8p_lcQgfjHSTN22Y0UsA_UsiC1vCssNthUHyaQ/exec", {
                method: 'POST',
                body: formData,
                mode: 'no-cors',
            });
            setIsSuccess(true);
            form.reset();
        } catch (err: any) {
             setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-slate-100/40 backdrop-blur-xl z-[150] flex items-center justify-center p-4 transition-all duration-500 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admission-form-title"
        >
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div 
                ref={formRef} 
                className="relative bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.12)] w-full max-w-2xl overflow-hidden flex flex-col transition-spring animate-form-entry"
            >
                {/* Tech Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-[0.03] pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line"></div>

                <div className="relative flex items-center justify-between p-6 sm:p-10 border-b border-slate-100 bg-white/50 backdrop-blur-xl">
                    <div className="flex items-center space-x-5">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl shadow-lg shadow-primary/10">
                                <LogoGraduationCapIcon className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div>
                             <h2 id="admission-form-title" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">Gateway <span className="text-primary">Portal</span></h2>
                             <p className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-widest">Enrolling for the 2024-25 Era</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all active:scale-95"
                        aria-label="Close admission form"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="relative max-h-[75vh] overflow-y-auto">
                    {isSuccess ? (
                        <div className="text-center p-12 sm:p-20 relative overflow-hidden flex flex-col justify-center min-h-[500px] bg-white">
                            <PartyPop />
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)] animate-float">
                                    <CheckIcon className="w-12 h-12 text-white" />
                                </div>
                                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Transmission <span className="text-emerald-500">Complete.</span></h2>
                                <p className="text-slate-500 font-medium text-lg max-w-xs mx-auto mb-10 leading-relaxed">
                                    Your profile has been synchronized with our servers. Our mentors will reach out shortly.
                                </p>
                                <button 
                                    onClick={onClose}
                                    className="bg-slate-900 text-white font-black py-4 px-12 rounded-2xl hover:bg-emerald-600 transition-all duration-500 shadow-xl"
                                >
                                    Dismiss Portal
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-10 relative z-10 bg-white">
                            {/* Personal Details Section */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-8 h-1 bg-primary rounded-full"></div>
                                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">Cadet Identification</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                            <UserCircleIcon className="w-5 h-5" />
                                        </div>
                                        <input 
                                            type="text" id="name" name="name" required 
                                            placeholder="Full Name" 
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/50 transition-all placeholder:text-slate-400 font-medium" 
                                        />
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                            <MailIcon className="w-5 h-5" />
                                        </div>
                                        <input 
                                            type="email" id="email" name="email" required 
                                            placeholder="Email Address" 
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/50 transition-all placeholder:text-slate-400 font-medium" 
                                        />
                                    </div>
                                    <div className="relative group sm:col-span-2">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                            <PhoneIcon className="w-5 h-5" />
                                        </div>
                                        <input 
                                            type="tel" id="phone" name="phone" 
                                            placeholder="Phone Identity (Optional)" 
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/50 transition-all placeholder:text-slate-400 font-medium" 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Program Section */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-8 h-1 bg-secondary rounded-full"></div>
                                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">Program Selection</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-secondary transition-colors pointer-events-none">
                                            <BookOpenIcon className="w-5 h-5" />
                                        </div>
                                        <select 
                                            id="course" name="course" required 
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-4 focus:ring-secondary/5 focus:border-secondary/50 transition-all appearance-none cursor-pointer font-medium"
                                        >
                                            <option value="" className="bg-white">Select Future Discipline</option>
                                            {courses.map(course => (
                                                <option key={course.id} value={course.title} className="bg-white">
                                                    {course.title}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <textarea 
                                            id="message" name="message" rows={4} 
                                            placeholder="Mission Statement: Why join the vision?" 
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/50 transition-all placeholder:text-slate-400 font-medium"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="flex items-center h-6">
                                    <input id="terms" name="terms" type="checkbox" required className="h-5 w-5 bg-white border-slate-300 text-primary rounded-md focus:ring-primary/30" />
                                </div>
                                <div className="ml-4 text-sm">
                                    <label htmlFor="terms" className="font-bold text-slate-700">Authorize Data Synchronisation</label>
                                    <p className="text-slate-500">I consent to the secure processing of my details under Global Privacy Protocols.</p>
                                </div>
                            </div>

                            <input type="hidden" name="formName" value="Admission" />
                            {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100">{error}</p>}
                            
                            <div className="pt-4 pb-2">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="w-full group relative overflow-hidden bg-slate-900 text-white font-black py-5 px-6 rounded-2xl hover:shadow-[0_12px_24px_rgba(66,133,244,0.1)] transition-all duration-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 flex items-center justify-center space-x-3">
                                        <span className="tracking-widest uppercase text-sm">{isSubmitting ? 'Synchronizing...' : 'Initialize Admission'}</span>
                                        {!isSubmitting && <SendIcon className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-hover translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

// Advanced animations
const styles = `
@keyframes scan-line {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}
@keyframes form-entry {
    from { opacity: 0; transform: scale(0.98) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes party-pop-anim {
    0% { transform: scale(0) rotate(0deg); opacity: 1; }
    50% { opacity: 1; }
    100% { transform: scale(2) rotate(360deg) translateY(-100px); opacity: 0; }
}
.animate-form-entry {
    animation: form-entry 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-scan-line {
    animation: scan-line 4s linear infinite;
}
.party-popper {
    position: absolute;
    width: 12px;
    height: 12px;
    opacity: 0;
    z-index: 5;
    border-radius: 4px;
}
`;

if (typeof document !== 'undefined' && !document.getElementById('admission-form-futuristic-styles')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'admission-form-futuristic-styles';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

export default AdmissionForm;
