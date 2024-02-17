import Head from 'next/head';
import styles from "../styles/home.module.css"
import Lottie from 'react-lottie';
import anim from './anime.json';
import Chatbot from '../components/bot';

export default function Home() {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: anim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Serenity.ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.headerC}>
          <h1>
            <span className={styles.gradient}>Serenity.ai</span>
          </h1>
          <p className={styles.subtitle}>
            Transforming Health Conversations: Chat, Assess, and Discover with Serenity.ai
          </p>
        </div>
        <div className={styles.hero}>
          <div className={styles.animation_logo}>
            <Lottie
              options={defaultOptions}
              height={550}
              width={450}
            />
          </div>
          <div className={styles.botArea}>
            <Chatbot />
          </div>
        </div>
        <div className={styles.footer}>
          Disclaimer: Serenity.ai serves as a curator and summarizer, not the owner or responsible party for any answered data
        </div>
      </main>

      <style jsx>{`
        // main {
        //   padding: 5rem 0;
        //   flex: 1;
        //   display: flex;
        //   flex-direction: column;
        //   justify-content: center;
        //   align-items: center;
        // }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
          margin:0;
          padding:0;
        }
      `}</style>
    </div>
  )

}
