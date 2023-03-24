import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {getSession, signIn, signOut} from 'next-auth/client';

export default function Home({ session }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Next Twitter Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Next.js Twitter Login
          </h1>
          <p className={styles.description}>
            { session ? 'Welcome ' + session.user.name : '' }
          </p>

          <a className="twitter-follow-button"
             href="https://twitter.com/NASA"
             data-size="large">
            Follow @TwitterDev</a>
          <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>

          <p className={styles.description}>
            {!session && <>
              Not signed in <br/>
              <button className={styles.button} onClick={() => signIn()}>Sign in</button>
            </>}
            {session && <>
              Signed in as {session.user.email} <br/>
              <button className={styles.button} onClick={() => signOut()}>Sign out</button>
            </>}
          </p>
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}