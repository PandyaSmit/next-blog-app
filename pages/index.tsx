import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import Header from './header'

const Home: NextPage = () => {
  const navigate = (url: string) => {
    Router.push(url);
  }
  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <Head>
          <title>Blog</title>
          <meta name="description" content="A simple blog app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to Blog
          </h1>

          <div className={styles.grid}>
            <a onClick={() => { navigate('/sign-in') }} className={styles.card}>
              <h2>Sign In &rarr;</h2>
              <p>Sign in with an existing account</p>
            </a>

            <a onClick={() => { navigate('/sign-up') }} className={styles.card}>
              <h2>Sign Up &rarr;</h2>
              <p>Create a new account</p>
            </a>
          </div>
        </main>

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
      </div>
    </>
  )
}

export default Home
