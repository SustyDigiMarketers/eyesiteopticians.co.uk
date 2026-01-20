import React from 'react';
import { BlogPost, Page } from '../types';
import { ClockIcon, UserCircleIcon, SearchIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from './icons';
import { media } from './media';

interface SingleBlogPostPageProps {
    post: BlogPost;
    allPosts: BlogPost[];
    navigate: (page: Page, options?: { post?: BlogPost }) => void;
}

const PageHeader: React.FC = () => (
    <section className="relative h-64 bg-gray-800 text-white">
        <img 
            src={media.pageHeaders.blog} 
            alt="Person typing on a laptop" 
            className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold">Blog Details</h1>
            <p className="mt-2 text-lg">Home / <span className="text-blue-300">Blog Details</span></p>
        </div>
    </section>
);

const Sidebar: React.FC<{ allPosts: BlogPost[]; navigate: (page: Page, options?: { post?: BlogPost }) => void; }> = ({ allPosts, navigate }) => (
    <aside className="space-y-8">
        {/* Search Widget */}
        <div className="p-6 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Search</h3>
            <div className="relative">
                <input type="text" placeholder="Search posts..." className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10" />
                <button className="absolute inset-y-0 right-0 px-3 text-gray-500">
                    <SearchIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
        {/* Recent Posts Widget */}
        <div className="p-6 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h3>
            <div className="space-y-4">
                {allPosts.slice(0, 3).map(post => (
                    <div key={post.id} className="flex items-start space-x-4">
                        <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-500">{post.date}</p>
                            <button onClick={() => navigate('blog-post', { post })} className="font-semibold text-gray-800 hover:text-blue-600 leading-tight block text-left">{post.title}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </aside>
);

const SingleBlogPostPage: React.FC<SingleBlogPostPageProps> = ({ post, allPosts, navigate }) => {
    
    return (
        <main>
            <PageHeader />
            <div className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <article className="lg:col-span-2">
                            <img src={post.image} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8" />
                            <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                <div className="flex items-center">
                                    <UserCircleIcon className="w-4 h-4 mr-1.5" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center">
                                    <ClockIcon className="w-4 h-4 mr-1.5" />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">{post.title}</h1>
                            
                            <div className="prose prose-lg max-w-none text-gray-700">
                                {post.content && typeof post.content === 'string' 
                                    ? post.content.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                                        <p key={index} className="mb-4">{paragraph}</p>
                                      ))
                                    : <p>{post.excerpt}</p>
                                }
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                                <span className="font-semibold text-gray-800">Share this post:</span>
                                <div className="flex space-x-3">
                                    <a href="#" aria-label="Share on Facebook" className="text-gray-500 hover:text-blue-600"><FacebookIcon className="w-5 h-5"/></a>
                                    <a href="#" aria-label="Share on LinkedIn" className="text-gray-500 hover:text-blue-700"><LinkedinIcon className="w-5 h-5"/></a>
                                    <a href="#" aria-label="Share on Instagram" className="text-gray-500 hover:text-pink-500"><InstagramIcon className="w-5 h-5"/></a>
                                </div>
                            </div>
                        </article>

                        <div className="lg:col-span-1">
                            <Sidebar allPosts={allPosts} navigate={navigate} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SingleBlogPostPage;