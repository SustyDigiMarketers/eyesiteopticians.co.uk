import { useState, useCallback } from 'react';
import { Page, BlogPost } from '../../types';
import { Course } from '../CourseCard';

export const useNavigation = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const navigate = useCallback((page: Page, options?: { post?: BlogPost, course?: Course, anchor?: string }) => {
        const { post, course, anchor } = options || {};
        const scrollToAction = () => anchor ? document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }) : window.scrollTo(0, 0);

        if (page === currentPage && !post && !course && anchor) {
            scrollToAction();
            return;
        }

        setCurrentPage(page);

        if (post) {
            setSelectedPost(post);
        } else if (page !== 'blog-post') {
            setSelectedPost(null);
        }
        
        if (course) {
            setSelectedCourse(course);
        } else if (page !== 'course-detail') {
            setSelectedCourse(null);
        }

        setTimeout(scrollToAction, 100);
    }, [currentPage]);
    
    return {
        currentPage,
        selectedPost,
        selectedCourse,
        navigate,
    };
};
