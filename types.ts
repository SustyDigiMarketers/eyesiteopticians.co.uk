import React from 'react';

export type Page = 'home' | 'about' | 'blog' | 'courses' | 'contact' | 'blog-post' | 'admin' | 'course-detail';

export interface BlogPost {
    id: number;
    image: string;
    category: string;
    date: string;
    author: string;
    comments: number;
    title: string;
    excerpt: string;
    content: string;
}

export interface GalleryImage {
    src: string;
    category: string;
    caption: string;
}

export interface SiteConfig {
    logo: string;
    schoolName: string;
    schoolNameSuffix: string;
}