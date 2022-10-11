import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Navbar from '../navbar'

const Home: NextPage = () => {
    type IBlog = {
        _id: string;
        title: string;
        content: string;
        authorId: string;
        createdAt: string;
        updatedAt: string;
        user: {
            _id: string;
            username: string;
            email: string;
        };
    };

    const [blogs, setBlogs] = useState<IBlog[]>([]);

    useEffect(() => {
        loadBlogs()
    }, [])

    const loadBlogs = async () => {
        const response = await fetch('/api/blogs');

        if (!response.ok) {
            setBlogs([]);
        }

        const body = await response.json();
        setBlogs(body);
    }

    const prepareBlogForShow = (blog: IBlog) => {
        const createdDate = blog.createdAt.split('T');
        const blogForShow = {
            _id: blog._id,
            title: blog.title,
            content: (blog.content.length > 20) ? blog.content.slice(0, 17) + '...' : blog.content,
            authorId: blog.authorId,
            createdAt: `${createdDate[0]} ${createdDate[1].slice(0, 5)}`,
            user: {
                username: blog.user.username
            }
        };

        return blogForShow;
    }

    return (
        <>
            <Navbar></Navbar>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Home
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <h1 className={styles.title}>
                        Welcome smit!
                    </h1>
                    <div className={styles.grid}>
                        {
                            blogs.map((blog) => {
                                const blogForShow = prepareBlogForShow(blog);
                                return (
                                    <a key={blogForShow._id} href={blogForShow._id} className={styles.card}>
                                        <h2>{blogForShow.title}</h2>
                                        <p>{blogForShow.content}</p>
                                        <h5>{blogForShow.user.username} | {blogForShow.createdAt}</h5>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </main>
            <div className={styles.container}>
                <footer className={styles.footer}>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{' '}
                        <span className={styles.logo}>
                            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                        </span>
                    </a>
                </footer>
            </div >
        </>
    )
}

export default Home
