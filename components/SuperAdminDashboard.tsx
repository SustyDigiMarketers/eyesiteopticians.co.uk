import React, { useState } from 'react';
import { GalleryImage, BlogPost, Page, SiteConfig } from '../types';
import { Course } from './CourseCard';
import GalleryManagement from './GalleryManagement';
import BlogManagement from './BlogManagement';
import CourseManagement from './CourseManagement';
import SettingsManagement from './SettingsManagement';
import { 
    LogoGraduationCapIcon,
    PhotoIcon,
    PencilIcon,
    GraduationCapIcon,
    ArrowTopRightOnSquareIcon,
    ArrowLeftOnRectangleIcon,
    ManagementIcon
} from './icons';

interface SuperAdminDashboardProps {
    galleryImages: GalleryImage[];
    onAddGalleryImage: (image: GalleryImage) => void;
    onDeleteGalleryImage: (src: string) => void;
    blogPosts: BlogPost[];
    onAddBlogPost: (post: Omit<BlogPost, 'id' | 'date' | 'author' | 'comments'>) => void;
    onUpdateBlogPost: (post: BlogPost) => void;
    onDeleteBlogPost: (id: number) => void;
    courses: Course[];
    onAddCourse: (course: Omit<Course, 'id'>) => void;
    onUpdateCourse: (course: Course) => void;
    onDeleteCourse: (id: number) => void;
    siteConfig: SiteConfig;
    onUpdateSiteConfig: (config: SiteConfig) => void;
    navigate: (page: Page) => void;
    onLogout: () => void;
}

type Tab = 'gallery' | 'blogs' | 'courses' | 'settings';

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = (props) => {
    const [activeTab, setActiveTab] = useState<Tab>('gallery');

    const renderContent = () => {
        switch(activeTab) {
            case 'gallery':
                return <GalleryManagement images={props.galleryImages} onAddImage={props.onAddGalleryImage} onDeleteImage={props.onDeleteGalleryImage} isSuperAdminView={true} />;
            case 'blogs':
                return <BlogManagement posts={props.blogPosts} onAdd={props.onAddBlogPost} onUpdate={props.onUpdateBlogPost} onDelete={props.onDeleteBlogPost} />;
            case 'courses':
                return <CourseManagement courses={props.courses} onAdd={props.onAddCourse} onUpdate={props.onUpdateCourse} onDelete={props.onDeleteCourse} />;
            case 'settings':
                return <SettingsManagement config={props.siteConfig} onUpdate={props.onUpdateSiteConfig} />;
            default:
                return null;
        }
    };

    const SidebarLink: React.FC<{tabName: Tab, label: string, icon: React.ReactNode}> = ({ tabName, label, icon }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === tabName
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 flex-shrink-0 h-full overflow-y-hidden">
                <button onClick={() => props.navigate('home')} className="flex items-center space-x-3 p-2 mb-8 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="bg-blue-600 p-2 rounded-md">
                        <LogoGraduationCapIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-white block leading-tight">Superadmin</span>
                        <span className="text-xs text-gray-400 block leading-tight">{props.siteConfig.schoolName} Academy</span>
                    </div>
                </button>

                <nav className="flex-grow space-y-2">
                    <SidebarLink tabName="gallery" label="Manage Gallery" icon={<PhotoIcon className="w-5 h-5"/>} />
                    <SidebarLink tabName="blogs" label="Manage Blogs" icon={<PencilIcon className="w-5 h-5"/>} />
                    <SidebarLink tabName="courses" label="Manage Courses" icon={<GraduationCapIcon className="w-5 h-5"/>} />
                    <SidebarLink tabName="settings" label="Site Settings" icon={<ManagementIcon className="w-5 h-5"/>} />
                </nav>

                <div className="mt-auto space-y-2">
                    <button 
                        onClick={() => props.navigate('home')}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        <span>Back to Site</span>
                    </button>
                    <button 
                        onClick={props.onLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 p-6 sm:p-10 overflow-y-auto h-full">
                {renderContent()}
            </main>
        </div>
    );
};

export default SuperAdminDashboard;