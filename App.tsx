import React, { useEffect } from 'react';
import { Page, BlogPost } from './types';
import {
    Header,
    Footer,
    Hero,
    FeatureCards,
    AboutSection,
    StatsSection,
    WhyChooseUs,
    PopularCourses,
    TestimonialsSection,
    AboutPage,
    CoursesPage,
    BlogPage,
    SingleBlogPostPage,
    AdmissionForm,
    GalleryManagement,
    SuperAdminDashboard,
    ContactPage,
    CourseDetailPage,
    Course,
    LoginPage,
    Notification
} from './components';

import { useContentManagement } from './components/hooks/useContentManagement';
import { useNavigation } from './components/hooks/useNavigation';
import { useAuth } from './components/hooks/useAuth';
import { useModals } from './components/hooks/useModals';
import { media } from './components/media';

const App: React.FC = () => {
    const { 
        galleryImages, 
        blogPosts, 
        courses, 
        siteConfig,
        contentHandlers,
        notification,
        clearNotification
    } = useContentManagement();

    useEffect(() => {
        const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (favicon) {
            favicon.href = siteConfig.logo || media.favicon;
            favicon.type = 'image/png';
        }
        document.title = `${siteConfig.schoolName} ${siteConfig.schoolNameSuffix}`;
    }, [siteConfig]);

    const { currentPage, selectedPost, selectedCourse, navigate } = useNavigation();
    
    const { userRole, login, logout } = useAuth();

    const { 
        isAdmissionFormOpen,
        isLoginPageOpen,
        modalHandlers 
    } = useModals();

    const coursesForCoursesPage = courses.map(course => ({
        ...course,
        title: course.category,
    }));

    const renderPageContent = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <>
                        <Hero navigate={navigate} schoolName={siteConfig.schoolName} />
                        <FeatureCards navigate={navigate} onAdmissionClick={modalHandlers.handleAdmissionClick} />
                        <AboutSection navigate={navigate} schoolName={`${siteConfig.schoolName} ${siteConfig.schoolNameSuffix}`} />
                        <StatsSection />
                        <WhyChooseUs navigate={navigate} />
                        <PopularCourses courses={courses} />
                        <TestimonialsSection />
                    </>
                );
            case 'about': return <AboutPage galleryImages={galleryImages} schoolName={`${siteConfig.schoolName} ${siteConfig.schoolNameSuffix}`} />;
            case 'courses': return <CoursesPage courses={coursesForCoursesPage} navigate={navigate} />;
            case 'course-detail': return selectedCourse ? <CourseDetailPage course={selectedCourse} navigate={navigate} /> : <CoursesPage courses={coursesForCoursesPage} navigate={navigate} />;
            case 'blog': return <BlogPage navigate={navigate} blogPosts={blogPosts} />;
            case 'blog-post': return selectedPost ? <SingleBlogPostPage post={selectedPost} navigate={navigate} allPosts={blogPosts} /> : <BlogPage navigate={navigate} blogPosts={blogPosts} />;
            case 'contact': return <ContactPage />;
            case 'admin':
                if (userRole === 'admin') {
                    return <GalleryManagement images={galleryImages} onAddImage={contentHandlers.addGalleryImage} onDeleteImage={contentHandlers.deleteGalleryImage} />;
                }
                return <Hero navigate={navigate} schoolName={siteConfig.schoolName} />;
            default: return <Hero navigate={navigate} schoolName={siteConfig.schoolName} />;
        }
    };
    
    if (currentPage === 'admin' && userRole === 'superadmin') {
        return (
            <>
                <SuperAdminDashboard 
                    galleryImages={galleryImages}
                    onAddGalleryImage={contentHandlers.addGalleryImage}
                    onDeleteGalleryImage={contentHandlers.deleteGalleryImage}
                    blogPosts={blogPosts}
                    onAddBlogPost={contentHandlers.addBlogPost}
                    onUpdateBlogPost={contentHandlers.updateBlogPost}
                    onDeleteBlogPost={contentHandlers.deleteBlogPost}
                    courses={courses}
                    onAddCourse={contentHandlers.addCourse}
                    onUpdateCourse={contentHandlers.updateCourse}
                    onDeleteCourse={contentHandlers.deleteCourse}
                    siteConfig={siteConfig}
                    onUpdateSiteConfig={contentHandlers.updateSiteConfig}
                    navigate={navigate}
                    onLogout={logout}
                />
                 {isAdmissionFormOpen && <AdmissionForm onClose={modalHandlers.handleCloseAdmissionForm} courses={courses} />}
                 {isLoginPageOpen && <LoginPage onClose={modalHandlers.handleCloseLoginPage} onLogin={login} />}
                 {notification && <Notification notification={notification} onClose={clearNotification} />}
            </>
        );
    }

    return (
        <>
            <Header 
                navigate={navigate} 
                onAdmissionClick={modalHandlers.handleAdmissionClick} 
                userRole={userRole} 
                onLogout={logout}
                logo={siteConfig.logo}
                schoolName={siteConfig.schoolName}
                schoolNameSuffix={siteConfig.schoolNameSuffix}
            />
            {renderPageContent()}
            <Footer 
                navigate={navigate} 
                onLoginClick={modalHandlers.handleOpenLoginPage} 
                onAdmissionClick={modalHandlers.handleAdmissionClick} 
                logo={siteConfig.logo}
                schoolName={siteConfig.schoolName}
                schoolNameSuffix={siteConfig.schoolNameSuffix}
            />
            {isAdmissionFormOpen && <AdmissionForm onClose={modalHandlers.handleCloseAdmissionForm} courses={courses} siteConfig={siteConfig} />}
            {isLoginPageOpen && <LoginPage onClose={modalHandlers.handleCloseLoginPage} onLogin={login} />}
            {notification && <Notification notification={notification} onClose={clearNotification} />}
        </>
    );
};

export default App;