import React, { useState, useEffect, useRef } from 'react';
import { Course } from './CourseCard';
import { PencilIcon, TrashIcon } from './icons';
import { fileToBase64 } from './utils';

interface CourseManagementProps {
    courses: Course[];
    onAdd: (course: Omit<Course, 'id'>) => void;
    onUpdate: (course: Course) => void;
    onDelete: (id: number) => void;
}

const CourseManagement: React.FC<CourseManagementProps> = ({ courses, onAdd, onUpdate, onDelete }) => {
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [formState, setFormState] = useState({
        title: '', category: '', price: '', lessons: '', students: '', rating: '', instructorName: '',
    });
    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (editingCourse) {
            setFormState({
                title: editingCourse.title,
                category: editingCourse.category,
                price: editingCourse.price,
                lessons: String(editingCourse.lessons),
                students: String(editingCourse.students),
                rating: String(editingCourse.rating),
                instructorName: editingCourse.instructor.name,
            });
            setImage(editingCourse.image);
            setImageFile(null);
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            resetForm();
        }
    }, [editingCourse]);

    const resetForm = () => {
        setEditingCourse(null);
        setFormState({ title: '', category: '', price: '', lessons: '', students: '', rating: '', instructorName: '' });
        setImage(null);
        setImageFile(null);
        const fileInput1 = document.getElementById('courseImageUpload') as HTMLInputElement;
        if (fileInput1) fileInput1.value = '';
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const base64 = await fileToBase64(file);
            setImageFile(file);
            setImage(base64);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            alert('Please select a course image.');
            return;
        }

        const courseData = {
            image,
            category: formState.category,
            price: formState.price,
            title: formState.title,
            description: `A comprehensive course on ${formState.title}.`,
            explanation: 'Detailed explanation for this course is coming soon.',
            uniqueness: ['Expert-led instruction', 'Practical assignments'],
            lessons: Number(formState.lessons),
            students: Number(formState.students),
            rating: Number(formState.rating),
            instructor: { name: formState.instructorName },
        };

        if (editingCourse) {
            onUpdate({ ...editingCourse, ...courseData });
        } else {
            onAdd(courseData);
        }
        resetForm();
    };

    return (
        <div className="space-y-12">
            <section className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {/* Course Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input name="title" value={formState.title} onChange={handleInputChange} placeholder="Title" required className="w-full border-gray-300 rounded-md shadow-sm"/>
                        <input name="category" value={formState.category} onChange={handleInputChange} placeholder="Category" required className="w-full border-gray-300 rounded-md shadow-sm"/>
                        <input name="price" value={formState.price} onChange={handleInputChange} placeholder="Price (e.g., $29.99)" required className="w-full border-gray-300 rounded-md shadow-sm"/>
                        <input name="lessons" type="number" value={formState.lessons} onChange={handleInputChange} placeholder="Lessons" required className="w-full border-gray-300 rounded-md shadow-sm"/>
                        <input name="students" type="number" value={formState.students} onChange={handleInputChange} placeholder="Students" required className="w-full border-gray-300 rounded-md shadow-sm"/>
                        <input name="rating" type="number" step="0.1" value={formState.rating} onChange={handleInputChange} placeholder="Rating (e.g., 4.8)" required className="w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    {/* Instructor Details */}
                    <div className="pt-4 border-t">
                         <label htmlFor="instructorName" className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
                        <input id="instructorName" name="instructorName" value={formState.instructorName} onChange={handleInputChange} placeholder="Instructor Name" required className="w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    {/* Course Image */}
                    <div>
                        <label htmlFor="courseImageUpload" className="block text-sm font-medium text-gray-700 mb-2">Course Image</label>
                        <input type="file" id="courseImageUpload" accept="image/*" onChange={handleFileChange} required={!editingCourse} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        {image && <img src={image} alt="Course Preview" className="mt-4 rounded-md w-full max-w-xs h-auto object-cover" />}
                    </div>
                    <div className="flex items-center space-x-4 pt-4">
                        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700">{editingCourse ? 'Update Course' : 'Add Course'}</button>
                        {editingCourse && <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-md hover:bg-gray-300">Cancel</button>}
                    </div>
                </form>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Courses ({courses.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                       <div key={course.id} className="bg-white border rounded-lg overflow-hidden shadow-sm relative">
                           <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                           <div className="p-4">
                               <h3 className="font-bold text-gray-800 truncate">{course.title}</h3>
                               <p className="text-sm text-gray-500">{course.category}</p>
                               <div className="flex justify-between items-center mt-2 text-sm">
                                   <span className="font-bold text-blue-600">{course.price}</span>
                                   <span>{course.students} Students</span>
                               </div>
                           </div>
                           <div className="absolute top-2 right-2 flex flex-col space-y-2">
                               <button onClick={() => setEditingCourse(course)} className="bg-white/80 backdrop-blur-sm text-blue-600 hover:text-blue-800 p-2 rounded-full shadow"><PencilIcon className="w-4 h-4"/></button>
                               <button onClick={() => window.confirm('Are you sure?') && onDelete(course.id)} className="bg-white/80 backdrop-blur-sm text-red-600 hover:text-red-800 p-2 rounded-full shadow"><TrashIcon className="w-4 h-4"/></button>
                           </div>
                       </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CourseManagement;