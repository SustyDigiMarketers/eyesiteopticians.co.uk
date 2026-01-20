// All media assets are managed here for easy updating.
// Using web URLs to ensure the application runs without needing a local 'assets' folder.

import { GalleryImage, BlogPost } from '../types';
import { Course } from './CourseCard';

const initialGallery: GalleryImage[] = [
    { src: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop', category: 'campus', caption: 'Modern architecture of the university campus.' },
    { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop', category: 'events', caption: 'Guest speaker at our annual tech conference.' },
    { src: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800&auto=format&fit=crop', category: 'academics', caption: 'Students engaged in a collaborative project.' },
    { src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800&auto=format&fit=crop', category: 'campus', caption: 'Serene view of the campus library.' },
    { src: 'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?q=80&w=800&auto=format&fit=crop', category: 'events', caption: 'Celebrating the achievements of our graduates.' },
    { src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop', category: 'academics', caption: 'Hands-on learning in the science lab.' },
    { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop', category: 'campus', caption: 'A quiet place for students to study and relax.' },
    { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop', category: 'events', caption: 'Students participating in a coding hackathon.' },
];

const initialCourses: Course[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
        category: 'Foreign Languages',
        price: 'Free',
        title: 'Foreign Languages',
        description: 'Master a new language with our immersive courses taught by native speakers.',
        explanation: 'Our foreign language program focuses on conversational fluency and cultural understanding. Through interactive lessons and real-world scenarios, you will not only learn to speak, read, and write in a new language but also gain a deep appreciation for its cultural context.',
        uniqueness: ['Taught by certified native speakers', 'Focus on conversational skills', 'Cultural immersion activities', 'Access to language labs and software'],
        lessons: 15,
        students: 125,
        rating: 4.8,
        instructor: { name: 'Dr. Elena Petrova' }
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
        category: 'Phonics & English Communication',
        price: '$49.99',
        title: 'Phonics & English Communication',
        description: 'Build a strong foundation in English pronunciation and communication skills.',
        explanation: 'This course is designed for learners of all ages to improve their English proficiency. We cover the fundamentals of phonics, grammar, vocabulary, and confident public speaking. Our interactive modules make learning engaging and effective.',
        uniqueness: ['Structured phonics program', 'Confidence-building speaking exercises', 'Comprehensive grammar modules', 'Small group practice sessions'],
        lessons: 20,
        students: 310,
        rating: 4.9,
        instructor: { name: 'Prof. David Smith' }
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1535378437323-95a48a946b6b?q=80&w=800&auto=format&fit=crop',
        category: 'Robotics & Coding',
        price: '$79.99',
        title: 'Robotics & Coding',
        description: 'Step into the future with hands-on robotics and coding workshops.',
        explanation: 'Unlock your potential in the world of technology. This course provides a hands-on introduction to robotics, programming, and automation. You will learn to build and code your own robots, understand an IoT project, and develop problem-solving skills.',
        uniqueness: ['Hands-on projects with robot kits', 'Learn Python and C++ for robotics', 'Introduction to AI and Machine Learning', 'Compete in robotics challenges'],
        lessons: 25,
        students: 180,
        rating: 4.7,
        instructor: { name: 'Dr. Anita Chen' }
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?q=80&w=800&auto=format&fit=crop',
        category: 'Computer Hardware & IT Skills',
        price: '$59.99',
        title: 'Computer Hardware & IT Skills',
        description: 'Gain practical knowledge of computer hardware, networking, and IT support.',
        explanation: 'This program prepares you for a career in IT support and system administration. You will learn to assemble, troubleshoot, and maintain computer systems, as well as manage networks and ensure cybersecurity. This is a practical, career-focused course.',
        uniqueness: ['Real-world hardware assembly labs', 'Network configuration simulations', 'Cybersecurity fundamentals', 'Preparation for CompTIA A+ certification'],
        lessons: 30,
        students: 250,
        rating: 4.8,
        instructor: { name: 'Mr. James Lee' }
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop',
        category: 'Commerce & Accounts',
        price: '$39.99',
        title: 'Commerce & Accounts',
        description: 'Understand the principles of commerce, accounting, and financial management.',
        explanation: 'This course provides a solid foundation in business and finance. Topics include financial accounting, business law, economics, and management principles. It is ideal for aspiring entrepreneurs and future business leaders.',
        uniqueness: ['Case study-based learning', 'Practical accounting software training', 'Basics of financial modeling', 'Guest lectures from industry experts'],
        lessons: 22,
        students: 400,
        rating: 4.6,
        instructor: { name: 'Ms. Priya Sharma, CPA' }
    },
     {
        id: 6,
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
        category: 'Creative Arts',
        price: '$69.99',
        title: 'Creative Arts',
        description: 'Unleash your creativity with our diverse range of arts and design courses.',
        explanation: 'Explore your artistic talents in our Creative Arts program. Whether you are interested in painting, sculpture, digital design, or photography, our experienced instructors will guide you in developing your unique artistic voice and building a professional portfolio.',
        uniqueness: ['Access to professional art studios', 'Portfolio development workshops', 'Instruction in various media', 'Annual student art exhibition'],
        lessons: 18,
        students: 150,
        rating: 4.9,
        instructor: { name: 'Prof. Marco Bianchi' }
    },
];

const initialBlogPosts: BlogPost[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
        category: 'Technology',
        date: 'June 10, 2024',
        author: 'John Doe',
        comments: 5,
        title: 'The Future of AI in Education',
        excerpt: 'Explore how artificial intelligence is revolutionizing the learning experience, from personalized tutoring to automated grading systems.',
        content: `Artificial intelligence (AI) is no longer a concept confined to science fiction; it's a transformative force reshaping industries, and education is no exception. In recent years, AI has begun to revolutionize the learning experience in profound ways, offering possibilities that were once unimaginable.\n\nOne of the most significant impacts of AI in education is its ability to provide personalized learning paths. Traditional classrooms often struggle to cater to the individual pace and style of each student. AI-powered platforms can analyze a student's performance in real-time, identifying strengths and weaknesses. Based on this data, the system can recommend customized content, exercises, and resources, ensuring that each learner receives the support they need to succeed.`
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
        category: 'Student Life',
        date: 'May 28, 2024',
        author: 'Jane Smith',
        comments: 12,
        title: '5 Tips for a Successful First Year at University',
        excerpt: 'Navigating your first year of university can be challenging. Here are five essential tips to help you thrive both academically and socially.',
        content: `Starting university is an exciting milestone, but it can also be overwhelming. The transition to higher education brings new freedoms, responsibilities, and challenges. To help you make the most of this experience, here are five tips for a successful first year.\n\nFirst, get organized from day one. Use a planner or digital calendar to keep track of class schedules, assignment deadlines, and exams. Effective time management is crucial for staying on top of your coursework and reducing stress.\n\nSecond, don't be afraid to ask for help. Whether it's from professors, teaching assistants, or academic advisors, there are numerous resources available to support you. Attending office hours is a great way to clarify doubts and build relationships with your instructors.`
    }
];


export const media = {
  logo: 'https://i.ibb.co/7bJkS4B/logo.png',
  favicon: 'https://i.ibb.co/7bJkS4B/logo.png', // Change this URL to update the fallback tab icon
  hero: {
    video1: 'https://videos.pexels.com/video-files/3196344/3196344-uhd_2560_1440_25fps.mp4',
    video2: 'https://videos.pexels.com/video-files/3196062/3196062-uhd_2560_1440_25fps.mp4',
    video3: 'https://videos.pexels.com/video-files/3196062/3196062-uhd_2560_1440_25fps.mp4', 
  },
  aboutSection: {
    studentsSmiling: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    studentReading: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    universityBuilding: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
  },
  whyChooseUs: {
    lectureHall: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
  },
  pageHeaders: {
    about: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop',
    blog: 'https://images.unsplash.com/photo-1499750310159-52f8f6f324e1?q=80&w=1920&auto=format&fit=crop',
    contact: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1920&auto=format&fit=crop',
  },
  aboutPage: {
    collaboratingStudents: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800&auto=format&fit=crop',
  },
  coursesPage: {
    heroStudent: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
  },
  initialContent: {
    gallery: initialGallery,
    courses: initialCourses,
    blog: initialBlogPosts,
  }
};