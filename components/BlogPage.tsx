import React from 'react';
import { ArrowRightIcon, ClockIcon, SearchIcon, UserCircleIcon } from './icons';
import { Page, BlogPost } from '../types';
import { media } from './media';

interface BlogPageProps {
    navigate: (page: Page, options: { post: BlogPost }) => void;
    blogPosts: BlogPost[];
}

const PageHeader: React.FC = () => (
    <section className="relative h-64 bg-slate-900 text-white">
        <img 
            src={media.pageHeaders.blog} 
            alt="Person typing on a laptop" 
            className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Our Blog</h1>
            <p className="mt-2 text-lg">Home / <span className="text-primary">Blog</span></p>
        </div>
    </section>
);

const BlogPostCard: React.FC<{ post: BlogPost; onReadMore: () => void; }> = ({ post, onReadMore }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
        <div className="relative">
            <img src={post.image} alt={post.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">{post.category}</div>
        </div>
        <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                <div className="flex items-center">
                    <UserCircleIcon className="w-4 h-4 mr-1.5" />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1.5" />
                    <span>{post.date}</span>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 h-24">{post.title}</h2>
            <p className="text-gray-600 mb-6">{post.excerpt}</p>
            <button onClick={onReadMore} className="font-semibold text-primary hover:text-primary-hover transition-colors flex items-center">
                Read More <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
        </div>
    </div>
);

const Sidebar: React.FC<{ blogPosts: BlogPost[]; navigate: (page: Page, options: { post: BlogPost }) => void; }> = ({ blogPosts, navigate }) => (
    <aside className="space-y-8">
        {/* Search Widget */}
        <div className="p-6 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-tighter">Search</h3>
            <div className="relative">
                <input type="text" placeholder="Search posts..." className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary pr-10" />
                <button className="absolute inset-y-0 right-0 px-3 text-gray-500">
                    <SearchIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
        {/* Categories Widget */}
        <div className="p-6 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-tighter">Categories</h3>
            <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between items-center"><a href="#" className="hover:text-primary">Technology</a> <span>(1)</span></li>
                <li className="flex justify-between items-center"><a href="#" className="hover:text-primary">Student Life</a> <span>(1)</span></li>
                <li className="flex justify-between items-center"><a href="#" className="hover:text-primary">Campus Events</a> <span>(0)</span></li>
                <li className="flex justify-between items-center"><a href="#" className="hover:text-primary">Career</a> <span>(0)</span></li>
                <li className="flex justify-between items-center"><a href="#" className="hover:text-primary">Academics</a> <span>(0)</span></li>
            </ul>
        </div>
        {/* Recent Posts Widget */}
        <div className="p-6 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-tighter">Recent Posts</h3>
            <div className="space-y-4">
                {blogPosts.slice(0, 3).map(post => (
                    <div key={post.id} className="flex items-start space-x-4">
                        <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-500">{post.date}</p>
                            <button onClick={() => navigate('blog-post', { post })} className="font-semibold text-gray-800 hover:text-primary leading-tight block text-left">{post.title}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </aside>
);

const BlogPage: React.FC<BlogPageProps> = ({ navigate, blogPosts }) => {
    return (
        <main>
            <PageHeader />
            <div className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            {blogPosts.map(post => (
                                <BlogPostCard 
                                    key={post.id} 
                                    post={post} 
                                    onReadMore={() => navigate('blog-post', { post })}
                                />
                            ))}
                        </div>
                        <div className="lg:col-span-1">
                            <Sidebar blogPosts={blogPosts} navigate={navigate} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BlogPage;