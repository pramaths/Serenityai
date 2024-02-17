'use client'
import GaugeChart from '../../components/gaugechart';
import styles from '../../styles/Dashboard.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios'

const dashboard = () => {
  const [dassReport, setDassReport] = useState(null);
  const router = useRouter();


  useEffect(() => {
    if (router.isReady) {
      const userId = router.query.id;
      console.log(userId);
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/dassReport/${userId}`);
          setDassReport(response.data);
          console.log(response.data);
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
  
      fetchData();
    }
    

    // Clean-up function if needed
    return () => {
      // Any clean-up code
    };
  }, [router.isReady]);


  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>
          Welcome to <span className={styles.gradient}>Serenity.ai!</span>
        </h1>

        <p className={styles.description}>
          Here's your <code>DASS21 report</code>
        </p>

        {/* <div className={styles.grid}>
      
          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

        </div> */}

        {
          dassReport && (
            <div className={styles.report}>
              {/* <h1>Gauge Chart Example</h1> */}
              <div className={styles.compartment}>
                <GaugeChart value={dassReport.depressionScore} />
                <h2>Depression Score</h2>
                <h3>Severity : {dassReport.depressionSeverity}</h3>
              </div>
              <div className={styles.compartment}>
                <GaugeChart value={dassReport.anxietyScore} />
                <h2>Anxiety Score</h2>
                <h3>Severity : {dassReport.anxietySeverity}</h3>
              </div>
              <div className={styles.compartment}>
                <GaugeChart value={dassReport.stressScore} />
                <h2>Stress Score</h2>
                <h3>Severity : {dassReport.stressSeverity}</h3>
              </div>

            </div>
          )
        }
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
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
        }
      `}</style>
    </div>
  );
}

export default dashboard;