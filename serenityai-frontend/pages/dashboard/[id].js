'use client'
import GaugeChart from '../../components/gaugechart';
import styles from '../../styles/Dashboard.module.css';
import VideoRecommendations from '../../components/videoRecommendation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios'

const dashboard = () => {
  const [dassReport, setDassReport] = useState(null);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const severityMessages = {
    Depression: {
      "Normal": "All set! You're doing well.",
      "Mild": "Take care of yourself and your time.",
      "Moderate": "Seek support from loved ones or a professional.",
      "Severe": "It's important to prioritize your mental health and seek professional help.",
      "Extremely Severe": "Immediate professional help is recommended. You're not alone in this."
    },
    Anxiety: {
      "Normal": "You're managing well. Keep it up!",
      "Mild": "Practice relaxation techniques to manage stress.",
      "Moderate": "Consider seeking support from a therapist or counselor.",
      "Severe": "It's important to address your anxiety. Seek professional help if needed.",
      "Extremely Severe": "Immediate professional help is recommended. You're not alone in this."
    },
    Stress: {
      "Normal": "You're handling stress effectively. Keep it up!",
      "Mild": "Practice stress-reduction techniques such as deep breathing or meditation.",
      "Moderate": "Consider seeking support from a therapist or counselor to manage stress.",
      "Severe": "It's important to address your stress levels. Seek professional help if needed.",
      "Extremely Severe": "Immediate professional help is recommended. You're not alone in this."
    }
  };

  function getMessages(depressionSeverity, anxietySeverity, stressSeverity) {
    const messages = {};

    // Mapping over each category
    for (const [category, severities] of Object.entries(severityMessages)) {
      // Determining the appropriate message based on severity
      let severity;
      switch (category) {
        case 'Depression':
          severity = depressionSeverity;
          break;
        case 'Anxiety':
          severity = anxietySeverity;
          break;
        case 'Stress':
          severity = stressSeverity;
          break;
        default:
          severity = 'Normal';
      }

      // Storing the message for the category
      messages[category] = severityMessages[category][severity];
    }

    setMessage(messages);
  }


  useEffect(() => {
    if (router.isReady) {
      const userId = router.query.id;
      console.log(userId);
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://serenityaii.onrender.com/dassReport/${userId}`);
          setDassReport(response.data);
          console.log(response.data);
          getMessages(response.data.depressionSeverity, response.data.anxietySeverity, response.data.stressSeverity);

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

        {
          dassReport && (
            <>
              <div className={styles.report}>
                {/* <h1>Gauge Chart Example</h1> */}
                <div className={styles.compartment}>
                  <GaugeChart value={dassReport.depressionScore} />
                  <h2>Depression Score</h2>
                  <h3 className={`${styles.severity}-${dassReport.depressionSeverity.toLowerCase()}`}>
                    Severity : {dassReport.depressionSeverity}
                  </h3>
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
              <div className={styles.below}>
                <h2 className={styles.belowh}>
                  What could be done?
                </h2>
                <div className={styles.summary}>
                  {console.log("Message state:", message)}
                  {message && Object.entries(message).map(([category, messageText]) => (
                    <p key={category}>{category}: {messageText}</p>
                  ))}
                </div>

              </div>
              <div className={styles.video}>
                <VideoRecommendations />
              </div>

            </>
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