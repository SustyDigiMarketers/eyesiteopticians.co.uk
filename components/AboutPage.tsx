import React, { useState, useEffect } from 'react';
import StatsSection from './StatsSection'; // Re-use existing component
import { ArrowLeftIcon, ArrowRightIcon, XIcon, TargetIcon, RocketIcon } from './icons';
import { GalleryImage, Page, BlogPost } from '../types';
import { Course } from './CourseCard';
import { media } from './media';

const PageHeader = () => (
    <section className="relative h-56 sm:h-64 bg-gray-800 text-white">
        <img 
            src={media.pageHeaders.about} 
            alt="University campus background" 
            className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold">About Us</h1>
            <p className="mt-2 text-base sm:text-lg">Home / <span className="text-primary">About Us</span></p>
        </div>
    </section>
);

const AboutEduker = () => (
    <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
                <p className="text-primary font-semibold mb-2">Our Story</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                    Bridging Skills and Opportunities
                </h2>
                <p className="text-gray-600 mb-4">
                    Faustina Easy Education Private Limited is an emerging EdTech and skill-development company headquartered in Trichy, Tamil Nadu. We provide language training, technology education, and skill-enhancement programs that empower students and professionals to thrive in today’s global environment.
                </p>
                <p className="text-gray-600 mb-8">
                    Our mission is to bridge the gap between academic knowledge and employable skills by offering career-relevant, affordable, and community-driven learning experiences.
                </p>
            </div>
            <div className="relative h-[400px] sm:h-[450px]">
                <img 
                    src={media.aboutPage.collaboratingStudents} 
                    alt="Students collaborating in a modern learning space" 
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
                 <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-primary text-white p-4 sm:p-6 rounded-lg shadow-xl w-48 sm:w-60">
                    <p className="text-4xl sm:text-5xl font-bold">100%</p>
                    <p className="mt-1 text-sm sm:text-base">Placement Assistance</p>
                </div>
            </div>
        </div>
    </section>
);

const MissionVisionSection = () => (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Futuristic background elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-prism.png')] opacity-[0.03]"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" aria-hidden="true"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
                <p className="text-primary font-semibold mb-2">Our Guiding Principles</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                    Shaping the Future of Education
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Mission Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
                    <div className="flex items-center space-x-4 mb-4">
                         <div className="bg-gradient-to-br from-primary to-primary-hover p-3 rounded-lg shadow-lg">
                            <TargetIcon className="w-8 h-8 text-white"/>
                         </div>
                         <h3 className="text-2xl font-bold">Our Mission</h3>
                    </div>
                    <p className="text-slate-300">
                        To make learning simple, accessible, and impactful by blending traditional teaching values with modern EdTech innovations — empowering every learner to communicate confidently, think creatively, and to become a global citizen and to train and support women entrepreneurs and rural youth with capacity-building programs, promoting inclusive education and digital empowerment.
                    </p>
                </div>
                {/* Vision Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-secondary transition-all duration-300 transform hover:-translate-y-2">
                     <div className="flex items-center space-x-4 mb-4">
                         <div className="bg-gradient-to-br from-secondary to-secondary-hover p-3 rounded-lg shadow-lg">
                            <RocketIcon className="w-8 h-8 text-white"/>
                         </div>
                         <h3 className="text-2xl font-bold">Our Vision</h3>
                    </div>
                    <p className="text-slate-300">
                        To become the most trusted and innovative education platform wordwide — connecting rural learners with global-standard skills, languages, and technologies for a brighter future.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

const filters = [
    { name: 'All', value: 'all' },
    { name: 'Campus Life', value: 'campus' },
    { name: 'Events', value: 'events' },
    { name: 'Academics', value: 'academics' },
];

interface GallerySectionProps {
    galleryImages: GalleryImage[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ galleryImages }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const filteredImages = activeFilter === 'all'
        ? galleryImages
        : galleryImages.filter(image => image.category === activeFilter);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        setSelectedImageIndex(null);
    };

    const showNextImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
        }
    };

    const showPrevImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isLightboxOpen) return;
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'Escape') closeLightbox();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, selectedImageIndex, filteredImages]);
    
    useEffect(() => {
        closeLightbox();
    }, [activeFilter]);

    return (
        <>
            <section id="gallery" className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                        <p className="text-primary font-semibold mb-2">Campus Moments</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                            Our Gallery
                        </h2>
                    </div>
                    <div className="flex justify-center flex-wrap space-x-2 sm:space-x-4 mb-12">
                        {filters.map(filter => (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={`px-4 py-2 rounded-md font-semibold text-sm sm:text-base transition-colors duration-300 ${
                                    activeFilter === filter.value
                                        ? 'bg-primary text-white shadow'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {filter.name}
                            </button>
                        ))}
                    </div>
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6">
                        {filteredImages.map((image, index) => (
                            <div 
                                key={index} 
                                className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer mb-4 sm:mb-6 [break-inside:avoid]"
                                onClick={() => openLightbox(index)}
                            >
                                <img 
                                    src={image.src} 
                                    alt={`Gallery image ${index + 1} from ${image.category} category`} 
                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {isLightboxOpen && selectedImageIndex !== null && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image gallery lightbox"
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={filteredImages[selectedImageIndex].src}
                            alt={filteredImages[selectedImageIndex].caption || `Enlarged gallery image ${selectedImageIndex + 1}`}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 text-center rounded-b-lg">
                            <p>
                                {filteredImages[selectedImageIndex].caption || `Image ${selectedImageIndex + 1}`}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                        aria-label="Close lightbox"
                    >
                        <XIcon className="w-8 h-8" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); showPrevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60 transition-colors"
                        aria-label="Previous image"
                    >
                        <ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8"/>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); showNextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-60 transition-colors"
                        aria-label="Next image"
                    >
                        <ArrowRightIcon className="w-6 h-6 sm:w-8 sm:h-8"/>
                    </button>
                </div>
            )}
        </>
    );
};
// --- END: Gallery Section logic ---

interface AboutPageProps {
    galleryImages: GalleryImage[];
    // Added schoolName to fix TypeScript error in App.tsx
    schoolName?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ galleryImages, schoolName }) => {
    return (
        <main>
            <PageHeader />
            <AboutEduker />
            <MissionVisionSection />
            <StatsSection />
            <GallerySection galleryImages={galleryImages} />
        </main>
    );
};

export default AboutPage;

// Add styles for lightbox animation
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
`;

if (typeof document !== 'undefined' && !document.getElementById('fade-in-animation-style-about')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'fade-in-animation-style-about';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}