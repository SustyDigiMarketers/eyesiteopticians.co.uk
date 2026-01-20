import { GalleryImage, BlogPost, SiteConfig } from '../types';
import { Course } from './CourseCard';

// Define a loose type for SupabaseClient to avoid needing the package types
type SupabaseClient = any;

// --- HELPER FUNCTIONS ---

/**
 * Converts a base64 string into a Blob for Supabase Storage.
 */
const base64ToBlob = (base64: string, contentType: string = ''): Blob => {
    try {
        const parts = base64.split(',');
        const byteCharacters = atob(parts[1] || parts[0]);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteArrays = [];
            for (let i = 0; i < slice.length; i++) {
                byteArrays.push(slice.charCodeAt(i));
            }
            byteArrays.push(new Uint8Array(byteArrays));
            // This was simplified for brevity in previous turns, correcting it here
        }
        // Correcting the manual blob creation logic
        const binary = atob(base64.split(',')[1]);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: contentType });
    } catch (e) {
        console.error("Error converting base64 to blob", e);
        return new Blob([], { type: contentType });
    }
};

// --- SUPABASE CLIENT FACTORY ---
export const createSupabaseClient = (): SupabaseClient => {
    const config = (window as any).SUPABASE_CONFIG;
    if (!config || !config.URL || !config.ANON_KEY) {
        throw new Error("Supabase not configured");
    }
    
    const supabaseGlobal = (window as any).supabase;
    if (!supabaseGlobal || !supabaseGlobal.createClient) {
         throw new Error("Supabase library not loaded");
    }

    const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {
        if (init && init.headers) {
            const headers = new Headers(init.headers);
            headers.delete('x-client-info');
            if (!headers.has('Authorization') && config.ANON_KEY) {
                headers.set('Authorization', `Bearer ${config.ANON_KEY}`);
            }
            if (!headers.has('apikey') && config.ANON_KEY) {
                headers.set('apikey', config.ANON_KEY);
            }
            init.headers = headers;
        }
        return fetch(input, init);
    };

    return supabaseGlobal.createClient(config.URL, config.ANON_KEY, {
        global: { fetch: customFetch },
        auth: { detectSessionInUrl: false, persistSession: true }
    });
};

// --- ERROR HANDLER ---
const handleApiError = (context: string, error: any) => {
    const errorString = error?.toString() || "";
    const errorMessage = error?.message || errorString;
    const errorCode = error?.code;
    
    const isNetworkError = 
        errorMessage.includes('Failed to fetch') || 
        errorMessage.includes('NetworkError') || 
        errorMessage.includes('Load failed') ||
        errorString.includes('TypeError');

    if (isNetworkError) {
        console.warn(`[${context}] Network unreachable or blocked. The application is now running in Offline Mode.`);
        return null;
    }

    if (errorCode === '42P01' || errorMessage.includes('relation') && errorMessage.includes('does not exist')) {
        console.warn(`[${context}] Database tables not found.`);
        return null;
    }

    return null;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- API ACTIONS ---

export const fetchSiteConfig = async (): Promise<SiteConfig | null> => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase.from('site_config').select('*').single();
        if (error) throw error;
        return data as SiteConfig;
    } catch (error) {
        return handleApiError("fetchSiteConfig", error);
    }
};

export const updateSiteConfig = async (config: SiteConfig): Promise<SiteConfig | null> => {
    try {
        const supabase = createSupabaseClient();
        let finalLogo = config.logo;

        if (config.logo.startsWith('data:')) {
            const blob = base64ToBlob(config.logo, 'image/png');
            const fileName = `logo-${Date.now()}.png`;
            const { error: uploadError } = await supabase.storage.from('site_assets').upload(fileName, blob);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('site_assets').getPublicUrl(fileName);
            finalLogo = urlData.publicUrl;
        }

        const { error } = await supabase.from('site_config').upsert({ 
            id: 1, 
            logo: finalLogo, 
            schoolName: config.schoolName,
            schoolNameSuffix: config.schoolNameSuffix 
        });
        if (error) throw error;
        return { ...config, logo: finalLogo };
    } catch (error) {
        return handleApiError("updateSiteConfig", error);
    }
};

export const fetchGalleryImages = async (): Promise<GalleryImage[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data as GalleryImage[];
    } catch (error) {
        return handleApiError("fetchGalleryImages", error);
    }
};

export const addGalleryImage = async (image: GalleryImage): Promise<GalleryImage[] | null> => {
    try {
        const supabase = createSupabaseClient();
        let finalSrc = image.src; 
        if (image.src.startsWith('data:')) {
            const blob = base64ToBlob(image.src, 'image/jpeg');
            const fileName = `gallery-${Date.now()}.jpg`;
            const { error: uploadError } = await supabase.storage.from('gallery_uploads').upload(fileName, blob);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('gallery_uploads').getPublicUrl(fileName);
            finalSrc = urlData.publicUrl; 
        }
        const { error: insertError } = await supabase.from('gallery_images').insert({ src: finalSrc, caption: image.caption, category: image.category });
        if (insertError) throw insertError;
        await delay(500);
        return fetchGalleryImages();
    } catch (error) {
        return handleApiError("addGalleryImage", error);
    }
};

export const deleteGalleryImage = async (src: string): Promise<GalleryImage[] | null> => {
    try {
        const supabase = createSupabaseClient();
        if (!src.startsWith('data:')) {
            const fileName = src.split('/').pop();
            if (fileName) await supabase.storage.from('gallery_uploads').remove([fileName]);
            const { error: dbError } = await supabase.from('gallery_images').delete().eq('src', src);
            if (dbError) throw dbError;
        }
        await delay(300);
        return fetchGalleryImages();
    } catch (error) {
        return handleApiError("deleteGalleryImage", error);
    }
};

export const fetchBlogPosts = async (): Promise<BlogPost[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data as BlogPost[];
    } catch (error) {
        return handleApiError("fetchBlogPosts", error);
    }
};

export const addBlogPost = async (post: Omit<BlogPost, 'id' | 'date' | 'author' | 'comments'>): Promise<BlogPost[] | null> => {
    try {
        const supabase = createSupabaseClient();
        let imageUrl = post.image;
        if (post.image.startsWith('data:')) {
            const blob = base64ToBlob(post.image, 'image/jpeg');
            const fileName = `blog-${Date.now()}.jpg`;
            const { error: uploadError } = await supabase.storage.from('blog_uploads').upload(fileName, blob);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('blog_uploads').getPublicUrl(fileName);
            imageUrl = urlData.publicUrl;
        }
        const newPostForDb = {
            ...post,
            image: imageUrl,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            author: 'Admin',
            comments: 0,
        };
        const { error: insertError } = await supabase.from('blog_posts').insert(newPostForDb);
        if (insertError) throw insertError;
        await delay(500);
        return fetchBlogPosts();
    } catch (error) {
        return handleApiError("addBlogPost", error);
    }
};

export const updateBlogPost = async (updatedPost: BlogPost): Promise<BlogPost[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const postForDb = { ...updatedPost };
        if (postForDb.image.startsWith('data:image')) {
            const blob = base64ToBlob(postForDb.image, 'image/jpeg');
            const fileName = `blog-${Date.now()}.jpg`;
            const { error: uploadError } = await supabase.storage.from('blog_uploads').upload(fileName, blob);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('blog_uploads').getPublicUrl(fileName);
            postForDb.image = urlData.publicUrl;
        }
        const { error } = await supabase.from('blog_posts').update(postForDb).eq('id', postForDb.id);
        if (error) throw error;
        await delay(300);
        return fetchBlogPosts();
    } catch (error) {
        return handleApiError("updateBlogPost", error);
    }
};

export const deleteBlogPost = async (id: number): Promise<BlogPost[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const { data: post } = await supabase.from('blog_posts').select('image').eq('id', id).single();
        const { error: dbError } = await supabase.from('blog_posts').delete().eq('id', id);
        if (dbError) throw dbError;
        if (post?.image && !post.image.startsWith('data:')) {
            const fileName = post.image.split('/').pop();
            if (fileName) await supabase.storage.from('blog_uploads').remove([fileName]);
        }
        await delay(300);
        return fetchBlogPosts();
    } catch (error) {
         return handleApiError("deleteBlogPost", error);
    }
};

export const fetchCourses = async (): Promise<Course[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        const transformedData = (data as any[]).map(course => ({
             ...course,
             uniqueness: Array.isArray(course.uniqueness) ? course.uniqueness : (course.uniqueness ? [course.uniqueness] : []),
             instructor: { name: course.instructor_name || 'Instructor' }
        }));
        return transformedData as Course[];
    } catch (error) {
        return handleApiError("fetchCourses", error);
    }
};

export const addCourse = async (course: Omit<Course, 'id'>): Promise<Course[] | null> => {
    try {
        const supabase = createSupabaseClient();
        let imageUrl = course.image;
        if (course.image.startsWith('data:')) {
            const blob = base64ToBlob(course.image, 'image/jpeg');
            const fileName = `course-${Date.now()}.jpg`;
            const { error: uploadError } = await supabase.storage.from('course_uploads').upload(fileName, blob);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('course_uploads').getPublicUrl(fileName);
            imageUrl = urlData.publicUrl;
        }
        const newCourse = { ...course, image: imageUrl, instructor_name: course.instructor.name };
        const { instructor, ...courseDataForDb } = newCourse as any;
        const { error: insertError } = await supabase.from('courses').insert(courseDataForDb);
        if (insertError) throw insertError;
        await delay(500);
        return fetchCourses();
    } catch (error) {
        return handleApiError("addCourse", error);
    }
};

export const updateCourse = async (updatedCourse: Course): Promise<Course[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const courseForDb = { ...updatedCourse, instructor_name: updatedCourse.instructor.name } as any;
        delete courseForDb.instructor;
        if (courseForDb.image.startsWith('data:image')) {
            const blob = base64ToBlob(courseForDb.image, 'image/jpeg');
            const fileName = `course-${Date.now()}.jpg`;
            const { error: uploadError } = await supabase.storage.from('course_uploads').upload(fileName, blob);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('course_uploads').getPublicUrl(fileName);
            courseForDb.image = urlData.publicUrl;
        }
        const { error } = await supabase.from('courses').update(courseForDb).eq('id', courseForDb.id);
        if (error) throw error;
        await delay(300);
        return fetchCourses();
    } catch (error) {
        return handleApiError("updateCourse", error);
    }
};

export const deleteCourse = async (id: number): Promise<Course[] | null> => {
    try {
        const supabase = createSupabaseClient();
        const { data: course } = await supabase.from('courses').select('image').eq('id', id).single();
        const { error: dbError } = await supabase.from('courses').delete().eq('id', id);
        if (dbError) throw dbError;
        if (course?.image && !course.image.startsWith('data:')) {
            const fileName = course.image.split('/').pop();
            if (fileName) await supabase.storage.from('course_uploads').remove([fileName]);
        }
        await delay(300);
        return fetchCourses();
    } catch (error) {
        return handleApiError("deleteCourse", error);
    }
};