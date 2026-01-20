import React, { useState, useEffect, useRef } from 'react';
import { BlogPost } from '../types';
import { PencilIcon, TrashIcon } from './icons';
import { fileToBase64 } from './utils';

interface BlogManagementProps {
    posts: BlogPost[];
    onAdd: (post: Omit<BlogPost, 'id' | 'date' | 'author' | 'comments'>) => void;
    onUpdate: (post: BlogPost) => void;
    onDelete: (id: number) => void;
}

const BlogManagement: React.FC<BlogManagementProps> = ({ posts, onAdd, onUpdate, onDelete }) => {
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title);
            setCategory(editingPost.category);
            setContent(editingPost.content);
            setImage(editingPost.image);
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            resetForm();
        }
    }, [editingPost]);
    
    const resetForm = () => {
        setEditingPost(null);
        setTitle('');
        setCategory('');
        setContent('');
        setImage(null);
        const fileInput = document.getElementById('blogImageUpload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const base64Image = await fileToBase64(file);
            setImage(base64Image);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            alert('Please select an image.');
            return;
        }

        const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');
        const postData = { title, category, content, excerpt, image };

        if (editingPost) {
            onUpdate({ ...editingPost, ...postData });
        } else {
            onAdd(postData);
        }
        resetForm();
    };

    return (
        <div className="space-y-12">
            <section className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input id="blogTitle" type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="blogCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input id="blogCategory" type="text" value={category} onChange={e => setCategory(e.target.value)} required className="w-full border-gray-300 rounded-md shadow-sm" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="blogContent" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea id="blogContent" value={content} onChange={e => setContent(e.target.value)} required rows={8} className="w-full border-gray-300 rounded-md shadow-sm" placeholder="Write your blog post here. Separate paragraphs with a new line."></textarea>
                    </div>
                    <div>
                        <label htmlFor="blogImageUpload" className="block text-sm font-medium text-gray-700 mb-2">Blog Image</label>
                        <input type="file" id="blogImageUpload" accept="image/*" onChange={handleFileChange} required={!editingPost} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        {image && <img src={image} alt="Preview" className="mt-4 rounded-md w-full max-w-xs h-auto object-cover" />}
                    </div>
                    <div className="flex items-center space-x-4 pt-4">
                        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700">{editingPost ? 'Update Post' : 'Add Post'}</button>
                        {editingPost && <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-md hover:bg-gray-300">Cancel</button>}
                    </div>
                </form>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Blog Posts ({posts.length})</h2>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Image</th>
                                    <th scope="col" className="px-6 py-3">Title</th>
                                    <th scope="col" className="px-6 py-3 hidden md:table-cell">Category</th>
                                    <th scope="col" className="px-6 py-3 hidden lg:table-cell">Date</th>
                                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map(post => (
                                    <tr key={post.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4"><img src={post.image} alt={post.title} className="w-24 h-16 object-cover rounded"/></td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                                        <td className="px-6 py-4 hidden md:table-cell">{post.category}</td>
                                        <td className="px-6 py-4 hidden lg:table-cell">{post.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button onClick={() => setEditingPost(post)} className="text-blue-600 hover:text-blue-800 p-2"><PencilIcon className="w-5 h-5"/></button>
                                                <button onClick={() => window.confirm('Are you sure you want to delete this post?') && onDelete(post.id)} className="text-red-600 hover:text-red-800 p-2"><TrashIcon className="w-5 h-5"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogManagement;