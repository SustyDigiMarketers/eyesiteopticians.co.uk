import { useState, useEffect } from 'react';
import { GalleryImage, BlogPost, SiteConfig } from '../../types';
import { Course } from '../CourseCard';
import * as api from '../api';
import { media } from '../media';
import { NotificationType } from '../Notification';

export const useContentManagement = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [siteConfig, setSiteConfig] = useState<SiteConfig>({
        logo: media.logo,
        schoolName: 'FAUSTINA',
        schoolNameSuffix: 'EASY EDUCATION'
    });
    const [notification, setNotification] = useState<NotificationType | null>(null);

    const clearNotification = () => setNotification(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [galleryData, blogData, courseData, configData] = await Promise.all([
                    api.fetchGalleryImages(),
                    api.fetchBlogPosts(),
                    api.fetchCourses(),
                    api.fetchSiteConfig()
                ]);

                setGalleryImages((galleryData && galleryData.length > 0) ? galleryData : media.initialContent.gallery);
                setBlogPosts((blogData && blogData.length > 0) ? blogData : media.initialContent.blog);
                setCourses((courseData && courseData.length > 0) ? courseData : media.initialContent.courses);
                
                if (configData) {
                    setSiteConfig(configData);
                }

            } catch (error: any) {
                console.warn("Content loading encountered an issue, utilizing static content.");
                setGalleryImages(media.initialContent.gallery);
                setBlogPosts(media.initialContent.blog);
                setCourses(media.initialContent.courses);
            }
        };
        loadData();
    }, []);

    const contentHandlers = {
        updateSiteConfig: async (config: SiteConfig) => {
            setSiteConfig(config);
            const updated = await api.updateSiteConfig(config);
            if (updated) {
                setSiteConfig(updated);
                setNotification({ message: "Site settings updated successfully!", type: 'success' });
            } else {
                setNotification({ message: "Failed to save settings to database.", type: 'error' });
            }
        },
        addGalleryImage: async (image: GalleryImage) => {
            setGalleryImages(prev => [image, ...prev]);
            const updatedImages = await api.addGalleryImage({ ...image });
            if (updatedImages) {
                setGalleryImages(updatedImages);
                setNotification({ message: "Image uploaded successfully!", type: 'success' });
            } else {
                setNotification({ message: "Upload Failed: Permission Denied.", type: 'error' });
            }
        },
        deleteGalleryImage: async (src: string) => {
            const previousImages = galleryImages;
            setGalleryImages(prev => prev.filter(img => img.src !== src));
            const updatedImages = await api.deleteGalleryImage(src);
            if (updatedImages) {
                setGalleryImages(updatedImages);
                setNotification({ message: "Image deleted.", type: 'success' });
            } else {
                 setGalleryImages(previousImages);
                 setNotification({ message: "Delete failed.", type: 'error' });
            }
        },
        addBlogPost: async (post: Omit<BlogPost, 'id' | 'date' | 'author' | 'comments'>) => {
            const tempId = Date.now();
            const newPost: BlogPost = {
                ...post,
                id: tempId,
                date: new Date().toLocaleDateString(),
                author: 'Admin',
                comments: 0
            };
            setBlogPosts(prev => [newPost, ...prev]);
            const updatedPosts = await api.addBlogPost({ ...post });
            if (updatedPosts) {
                setBlogPosts(updatedPosts);
                setNotification({ message: "Blog post published!", type: 'success' });
            } else {
                setNotification({ message: "Publish Failed: Permission Denied.", type: 'error' });
            }
        },
        updateBlogPost: async (updatedPost: BlogPost) => {
            setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
            const updatedPosts = await api.updateBlogPost({ ...updatedPost });
            if (updatedPosts) {
                setBlogPosts(updatedPosts);
                setNotification({ message: "Blog post updated.", type: 'success' });
            } else {
                 setNotification({ message: "Update Failed: Permission Denied.", type: 'error' });
            }
        },
        deleteBlogPost: async (id: number) => {
            const previousPosts = blogPosts;
            setBlogPosts(prev => prev.filter(p => p.id !== id));
            const updatedPosts = await api.deleteBlogPost(id);
            if (updatedPosts) {
                 setBlogPosts(updatedPosts);
                 setNotification({ message: "Blog post deleted.", type: 'success' });
            } else {
                 setBlogPosts(previousPosts);
                 setNotification({ message: "Delete failed.", type: 'error' });
            }
        },
        addCourse: async (course: Omit<Course, 'id'>) => {
            const tempId = Date.now();
            const newCourse: Course = { ...course, id: tempId };
            setCourses(prev => [newCourse, ...prev]);
            const updatedCourses = await api.addCourse({ ...course });
            if (updatedCourses) {
                setCourses(updatedCourses);
                setNotification({ message: "Course added successfully!", type: 'success' });
            } else {
                setNotification({ message: "Save Failed: Permission Denied.", type: 'error' });
            }
        },
        updateCourse: async (updatedCourse: Course) => {
            setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
            const updatedCourses = await api.updateCourse({ ...updatedCourse });
             if (updatedCourses) {
                setCourses(updatedCourses);
                setNotification({ message: "Course updated.", type: 'success' });
            } else {
                setNotification({ message: "Update Failed: Permission Denied.", type: 'error' });
            }
        },
        deleteCourse: async (id: number) => {
            const previousCourses = courses;
            setCourses(prev => prev.filter(c => c.id !== id));
            const updatedCourses = await api.deleteCourse(id);
            if (updatedCourses) {
                setCourses(updatedCourses);
                setNotification({ message: "Course deleted.", type: 'success' });
            } else {
                setCourses(previousCourses);
                setNotification({ message: "Delete failed.", type: 'error' });
            }
        },
    };

    return {
        galleryImages,
        blogPosts,
        courses,
        siteConfig,
        contentHandlers,
        notification,
        clearNotification
    };
};