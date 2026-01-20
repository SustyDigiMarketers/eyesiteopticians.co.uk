import React, { useState } from 'react';
import { LocationIcon, MailIcon, PhoneIcon, CheckIcon, SendIcon } from './icons';
import { media } from './media';

const PageHeader: React.FC = () => (
    <section className="relative h-72 sm:h-96 bg-slate-900 text-white overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0">
            <img
                src={media.pageHeaders.contact}
                alt="Tech Network"
                className="w-full h-full object-cover opacity-20 scale-110 animate-[pulse_10s_ease-in-out_infinite]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-slate-900 to-slate-950"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 animate-grid"></div>
        </div>

        {/* Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent animate-[scan-line_4s_linear_infinite] opacity-30"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md mb-6 animate-float">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Establish Connection</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-4 uppercase">
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Terminal</span>
            </h1>
            <p className="max-w-xl text-slate-400 font-medium text-lg leading-relaxed">
                Our neural network of support agents is ready to synchronize with your queries.
            </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </section>
);

const ContactDetails: React.FC = () => {
    const contactInfo = [
        {
            icon: <LocationIcon />,
            title: "Command Center",
            line1: "1/ 1B, North Ukkadai,",
            line2: "Trichy 620 010, India",
            color: "from-primary to-primary-hover"
        },
        {
            icon: <MailIcon />,
            title: "Data Uplink",
            line1: "FaustinaEasyEducation",
            line2: "@gmail.com",
            color: "from-primary to-secondary"
        },
        {
            icon: <PhoneIcon />,
            title: "Direct Frequency",
            line1: "+91 638 49 121 65",
            line2: "+91 91 599 67 555",
            color: "from-indigo-600 to-primary"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20 -mt-16">
            {contactInfo.map((item, index) => (
                <div key={index} className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl border border-slate-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/10">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-all group-hover:bg-primary/5"></div>
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-8 h-8 text-white" })}
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">{item.title}</h3>
                    <div className="text-slate-500 font-medium">
                        <p>{item.line1}</p>
                        <p>{item.line2}</p>
                    </div>

                    <div className="mt-8 h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-700"></div>
                </div>
            ))}
        </div>
    );
};

const PartyPop = () => (
    <>
        {[...Array(20)].map((_, i) => {
            const style = {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `party-pop-anim ${0.6 + Math.random() * 0.5}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.3}s`,
                backgroundColor: ['#4285F4', '#34A853', '#FBBC04', '#EA4335', '#10b981'][Math.floor(Math.random() * 5)]
            };
            return <div key={i} style={style} className="party-popper"></div>
        })}
    </>
);

const ContactFormAndMap: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
             setError('Protocol interrupted. Please retry connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
             {/* Tech Background Blobs */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-float"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }}></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Form Side */}
                <div className="relative">
                    {isSuccess ? (
                        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col items-center justify-center text-center h-full relative overflow-hidden">
                            <PartyPop />
                            <div className="w-24 h-24 bg-secondary-light text-secondary rounded-full flex items-center justify-center mb-8 animate-bounce">
                                <CheckIcon className="w-12 h-12" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">Encryption Successful</h2>
                            <p className="text-slate-500 font-medium mb-10 max-w-xs">Your transmission has reached our servers. Our unit will respond within 24 operational hours.</p>
                            <button 
                                onClick={() => setIsSuccess(false)}
                                className="bg-slate-900 text-white font-black py-4 px-10 rounded-2xl hover:bg-primary transition-all duration-300 shadow-xl"
                            >
                                Send New Packets
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100">
                            <div className="mb-10">
                                <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter uppercase">Initialize <span className="text-primary">Inquiry</span></h2>
                                <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Access Core Support Systems</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <input type="text" name="name" placeholder="Assigned Name" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-slate-400" />
                                    <input type="email" name="email" placeholder="Digital Address" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-slate-400" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <input type="tel" name="phone" placeholder="Contact Frequency" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-slate-400" />
                                    <select name="subject" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium appearance-none cursor-pointer">
                                        <option value="" disabled selected>System Protocol</option>
                                        <option value="Admission">Admission Systems</option>
                                        <option value="Fees">Financial Uplink</option>
                                        <option value="Courses">Knowledge Modules</option>
                                        <option value="Business">Strategic Alliance</option>
                                    </select>
                                </div>
                                <textarea name="message" rows={5} placeholder="Encrypted Message Data" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-slate-400"></textarea>
                                
                                <input type="hidden" name="formName" value="Contact" />
                                {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{error}</p>}
                                
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="group relative w-full sm:w-auto overflow-hidden bg-slate-900 text-white font-black py-5 px-12 rounded-2xl shadow-xl transition-all duration-500 disabled:bg-slate-300 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        {isSubmitting ? 'Syncing...' : 'Transmit Message'}
                                        {!isSubmitting && <SendIcon className="w-4 h-4 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Map Side */}
                <div className="relative group h-[500px] lg:h-full">
                    {/* Futuristic Frame Decorations */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl z-20 group-hover:scale-110 transition-transform"></div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-secondary rounded-br-2xl z-20 group-hover:scale-110 transition-transform"></div>
                    
                    <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="relative h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white z-10">
                        <div className="absolute top-6 left-6 z-20 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-googleRed animate-ping mr-2"></span>
                            Live Satellite Feed
                        </div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.978078694769!2d78.7163084!3d10.8129893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf4f7287a7127%3A0xfd4fb37b49ec6b9e!2s1%2F18%2F1%2F4A%2C%201st%20St%2C%20Kamaraj%20Nagar%2C%20Tiruchirappalli%2C%20Tamil%20Nadu%20620004!5e0!3m2!1sen!2sin!4v1762701854744!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Command Center Map"
                            className="grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000"
                        ></iframe>
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ContactPage: React.FC = () => {
    return (
        <main className="bg-slate-50 min-h-screen">
            <PageHeader />
            <div className="pb-24 pt-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ContactDetails />
                </div>
            </div>
            <ContactFormAndMap />
        </main>
    );
};

// Injection of unique animation styles
const styles = `
@keyframes scan-line {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(800%); }
}
@keyframes party-pop-anim {
    0% { transform: scale(0) rotate(0deg); opacity: 1; }
    100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
}
.party-popper {
    position: absolute;
    width: 10px;
    height: 10px;
    opacity: 0;
    z-index: 5;
    border-radius: 2px;
}
`;

if (typeof document !== 'undefined' && !document.getElementById('contact-futuristic-styles')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'contact-futuristic-styles';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

export default ContactPage;