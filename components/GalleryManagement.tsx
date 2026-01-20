import React, { useState } from 'react';
import { GalleryImage } from '../types';
import { XIcon } from './icons';

interface GalleryManagementProps {
    images: GalleryImage[];
    onAddImage: (image: GalleryImage) => void;
    onDeleteImage: (src: string) => void;
    isSuperAdminView?: boolean;
}

const GalleryManagement: React.FC<GalleryManagementProps> = ({ images, onAddImage, onDeleteImage, isSuperAdminView = false }) => {
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState('campus');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile || !preview) {
            alert('Please select an image file.');
            return;
        }

        const newImage: GalleryImage = {
            src: preview,
            caption,
            category,
        };

        onAddImage(newImage);

        // Reset form
        setCaption('');
        setCategory('campus');
        setImageFile(null);
        setPreview(null);
        const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const componentContainer = (content: React.ReactNode) => {
        if (isSuperAdminView) {
            return <div>{content}</div>;
        }
        return (
            <main className="bg-slate-50 min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b pb-4">Admin Dashboard</h1>
                    {content}
                </div>
            </main>
        );
    };

    return componentContainer(
        <>
            <section className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload New Gallery Image</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="md:col-span-1">
                        <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-2">Image File</label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {preview && <img src={preview} alt="Image preview" className="mt-4 rounded-md w-full max-w-xs h-auto object-cover" />}
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                        <div className="sm:col-span-2">
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                            <input
                                type="text"
                                id="caption"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                required
                                placeholder="e.g., Graduation Day 2024"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="campus">Campus Life</option>
                                <option value="events">Events</option>
                                <option value="academics">Academics</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-all duration-300">
                                Add to Gallery
                            </button>
                        </div>
                    </div>
                </form>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Gallery ({images.length})</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {images.map((image, index) => (
                        <div key={index} className="group relative bg-white p-2 rounded-lg shadow-sm">
                            <img src={image.src} alt={image.caption} className="w-full h-48 object-cover rounded-md" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center rounded-lg">
                                <button
                                    onClick={() => onDeleteImage(image.src)}
                                    className="bg-red-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100"
                                    aria-label="Delete image"
                                >
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="pt-2 text-center">
                                <p className="text-sm font-medium text-gray-700 truncate px-1">{image.caption}</p>
                                <p className="text-xs text-gray-500 capitalize">{image.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default GalleryManagement;
