import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Navbar from "./navbar";
import Router from "next/router";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

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

  const navigate = (url: string) => {
    Router.push(url);
  };

  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const [errorBanner, showErrorBanner] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const response = await fetch("/api/blogs");

    if (response.status === 403) {
      showErrorBanner({
        show: true,
        message: "Unauthorized. Please login again",
      });

      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);

      return;
    } else if (!response.ok) {
      setBlogs([]);
    }

    const body = await response.json();
    setBlogs(body);
  };

  const prepareBlogForShow = (blog: IBlog) => {
    const createdDate = blog.createdAt.split("T");
    const blogForShow = {
      _id: blog._id,
      title: blog.title,
      content:
        blog.content.length > 20
          ? blog.content.slice(0, 17) + "..."
          : blog.content,
      authorId: blog.authorId,
      createdAt: `${createdDate[0]} ${createdDate[1].slice(0, 5)}`,
      user: {
        username: blog.user.username,
      },
    };

    return blogForShow;
  };

  const resetError = () => {
    showErrorBanner({
      show: false,
      message: "",
    });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-red-600" id="invalid-form" hidden={!errorBanner.show}>
        <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <span className="flex rounded-lg bg-red-800 p-2">
                <ExclamationTriangleIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 truncate font-medium text-white">
                <span className="md:hidden">Error!</span>
                <span className="hidden md:inline">{errorBanner.message}</span>
              </p>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                onClick={() => resetError()}
                type="button"
                className="-mr-1 flex rounded-md p-2 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Home
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <h1 className={styles.title}>Welcome smit!</h1>
          <div className={styles.grid}>
            {blogs.map((blog) => {
              const blogForShow = prepareBlogForShow(blog);
              return (
                <a
                  key={blogForShow._id}
                  href={blogForShow._id}
                  className={styles.card}
                >
                  <h2>{blogForShow.title}</h2>
                  <p>{blogForShow.content}</p>
                  <h5>
                    {blogForShow.user.username} | {blogForShow.createdAt}
                  </h5>
                </a>
              );
            })}
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
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;
