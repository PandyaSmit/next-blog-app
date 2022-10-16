import type { NextPage } from 'next'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Header from './header';
import { useState } from 'react';
import Router from 'next/router';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SignIn: NextPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [errorBanner, showErrorBanner] = useState({
    show: false,
    message: ''
  });

  const signIn = async (event: any) => {
    event.preventDefault();

    if (!user.email || !user.password) {
      showErrorBanner({
        show: true,
        message: 'Please add valid details'
      });
      return;
    }

    const formData = {
      email: event.target["email-address"].value,
      password: event.target["password"].value
    }

    setUser(formData);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }

    const response = await fetch('/api/auth/sign-in', options)

    if (response.ok) {
      navigate('/home');

      return;
    }

    const body = await response.json();

    if (body.error) {
      showErrorBanner({
        show: true,
        message: body.error
      });
    } else {
      showErrorBanner({
        show: true,
        message: 'Please try again'
      });
    }

  }

  const setFieldsValue = (fieldName: string, value: string) => {
    const userDetails = {
      ...user,
      [fieldName]: value
    };

    setUser(userDetails);
  }

  const navigate = (url: string) => {
    Router.push(url);
  }

  const resetError = () => {
    showErrorBanner({
      show: false,
      message: ''
    });
  }

  return (
    <>
      <Header></Header>
      <div className="bg-red-600" id="invalid-form" hidden={!errorBanner.show}>
        <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <span className="flex rounded-lg bg-red-800 p-2">
                <ExclamationTriangleIcon className="h-6 w-6 text-white" aria-hidden="true" />
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
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={signIn}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={(event) => {
                    const value = event.target.value
                    setFieldsValue('email', value)
                  }}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={(event) => {
                    const value = event.target.value
                    setFieldsValue('password', value)
                  }}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn;