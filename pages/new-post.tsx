import { NextPage } from "next";
import Navbar from "./navbar";
import Router from 'next/router'
import { useState } from "react";
import { ExclamationTriangleIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const NewPost: NextPage = () => {
    const [post, setPost] = useState({
        title: '',
        content: '',
        authorId: "123",
        // file: e.target.file-upload.value,
    });

    const [errorBanner, showErrorBanner] = useState(false);
    const [sucessBanner, showSucessBanner] = useState(false);

    const createPost = async (event: any) => {
        if (!post.title || !post.content) {
            showErrorBanner(true);
            return;
        }

        event.preventDefault();

        const formData = {
            title: event.target.title.value,
            content: event.target.content.value,
            authorId: "123",
            // file: e.target.file-upload.value,
        }

        setPost(formData)

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        }

        const response = await fetch('/api/blogs', options)

        if (response.ok) {
            showSucessBanner(true);
            setPost({
                title: '',
                content: '',
                authorId: "123",
                // file: e.target.file-upload.value,
            })
        } else {
            showErrorBanner(true);
        }
    }

    const validateTitle = (event: any) => {
        event.preventDefault();
        post.title = event.target.value

        setPost(post);

        if (post.title) {
            showErrorBanner(false);
            return;
        }

        showErrorBanner(true);
    }

    const validateContent = (event: any) => {
        event.preventDefault();
        post.content = event.target.value

        setPost(post);

        if (post.content) {
            showErrorBanner(false);
            return;
        }

        showErrorBanner(true);
    }

    const navigate = (url: string) => {
        Router.push(url);
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="bg-red-600" id="invalid-form" hidden={!errorBanner}>
                <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex w-0 flex-1 items-center">
                            <span className="flex rounded-lg bg-red-800 p-2">
                                <ExclamationTriangleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </span>
                            <p className="ml-3 truncate font-medium text-white">
                                <span className="md:hidden">Error!</span>
                                <span className="hidden md:inline">Please add valid details!</span>
                            </p>
                        </div>
                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                            <button
                                onClick={() => showErrorBanner(false)}
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
            <div className="bg-green-600" id="sucess-form" hidden={!sucessBanner}>
                <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex w-0 flex-1 items-center">
                            <span className="flex rounded-lg bg-green-800 p-2">
                                <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </span>
                            <p className="ml-3 truncate font-medium text-white">
                                <span className="md:hidden">Success!</span>
                                <span className="hidden md:inline">Blog posted sucessfully!</span>
                            </p>
                        </div>
                        <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                            <button
                                onClick={() => navigate('/home')}
                                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
                            >
                                Go to home
                            </button>
                        </div>
                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                            <button
                                onClick={() => showSucessBanner(false)}
                                type="button"
                                className="-mr-1 flex rounded-md p-2 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
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
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Post</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div>
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Post</h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form onSubmit={createPost}>
                                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                        Title
                                                    </label>
                                                    <div>
                                                        <label htmlFor="title" className="sr-only">
                                                            Title
                                                        </label>
                                                        <input onChange={validateTitle}
                                                            id="title"
                                                            name="title"
                                                            type="text"
                                                            required
                                                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="First blog"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="Content" className="block text-sm font-medium text-gray-700">
                                                    Content
                                                </label>
                                                <div className="mt-1">
                                                    <textarea onChange={validateContent}
                                                        id="content"
                                                        name="content"
                                                        required
                                                        rows={3}
                                                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="lorem ipsum....."
                                                    />
                                                </div>
                                            </div>

                                            {/* <div>
                                                <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                                    <div className="space-y-1 text-center">
                                                        <svg
                                                            className="mx-auto h-12 w-12 text-gray-400"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            viewBox="0 0 48 48"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                            >
                                                                <span>Upload a file</span>
                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                            </label>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NewPost;
