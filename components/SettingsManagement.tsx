import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { PhotoIcon } from './icons';
import { fileToBase64 } from './utils';

interface SettingsManagementProps {
    config: SiteConfig;
    onUpdate: (config: SiteConfig) => void;
}

const SettingsManagement: React.FC<SettingsManagementProps> = ({ config, onUpdate }) => {
    const [logo, setLogo] = useState(config.logo);
    const [schoolName, setSchoolName] = useState(config.schoolName);
    const [schoolNameSuffix, setSchoolNameSuffix] = useState(config.schoolNameSuffix);
    const [loading, setLoading] = useState(false);

    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const base64 = await fileToBase64(file);
            setLogo(base64);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onUpdate({ logo, schoolName, schoolNameSuffix });
        setLoading(false);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <section className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-gray-800 tracking-tighter">Site <span className="text-blue-600">Configuration</span></h2>
                    <p className="text-gray-500 font-medium">Manage your institution's global branding and digital identity.</p>
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest">Logo Branding</label>
                            <div className="flex items-center space-x-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-blue-500/50 transition-colors">
                                        {logo ? (
                                            <img src={logo} alt="Site Logo" className="w-full h-full object-contain p-2" />
                                        ) : (
                                            <PhotoIcon className="w-8 h-8 text-gray-300" />
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        id="logoUpload" 
                                        accept="image/*" 
                                        onChange={handleLogoChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                    />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-2 font-medium">PNG or SVG recommended.<br/>Transparent background works best.</p>
                                    <label htmlFor="logoUpload" className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer uppercase tracking-tighter">Replace Identity</label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Institution Name</label>
                                <input 
                                    type="text" 
                                    value={schoolName} 
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    className="w-full bg-gray-50 border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold"
                                    placeholder="e.g. FAUSTINA"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Name Suffix</label>
                                <input 
                                    type="text" 
                                    value={schoolNameSuffix} 
                                    onChange={(e) => setSchoolNameSuffix(e.target.value)}
                                    className="w-full bg-gray-50 border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-blue-600"
                                    placeholder="e.g. EASY EDUCATION"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-slate-900 text-white font-black py-4 px-12 rounded-xl hover:bg-blue-600 transition-all duration-500 shadow-xl disabled:opacity-50 tracking-widest uppercase text-sm"
                        >
                            {loading ? 'Synchronizing...' : 'Save Configuration'}
                        </button>
                    </div>
                </form>
            </section>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start space-x-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h4 className="font-bold text-blue-900 mb-1 uppercase text-xs tracking-wider">Note to Admin</h4>
                    <p className="text-blue-800/70 text-sm leading-relaxed">Changes to the logo and institution name will be applied globally across the Header, Footer, and all marketing sections immediately after saving.</p>
                </div>
            </div>
        </div>
    );
};

export default SettingsManagement;