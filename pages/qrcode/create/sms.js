import Head from 'next/head';
import styles from '../../../styles/qrcode-create.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../../components/layout';
import Download from '../../../components/download';
import https from 'https';

export default function SMSQRCode({ data }) {
  const [processedData, setData] = useState('');
  const [smsText, setSmsText] = useState("Sample text");
  const [image, setImage] = useState(data);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generateCode = async() => {
    if (!processedData && !smsText) {
      return;
    }

    const response = await fetch(`${process.env.apiUrl}/qr-codes/sms?phoneNumber=${processedData}&smsText=${smsText}`, {
      agent: new https.Agent({
        rejectUnauthorized: false,
      })
    });

    const errorCode = response.ok ? false : response.statusCode;

    if (errorCode == false) {
     data = Buffer.from(await response.arrayBuffer()).toString('base64');

      setImage(data);
      setSuccessMessage("Successfully generated!");
    }

    if (errorCode == 500) {
      setErrorMessage("Cannot retrieve data from server. Please try later.");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 2000);

    return {
      props: { data }
    };
  }

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.generation}>
            <div className={styles.header1}>Generate SMS QR Code</div>
            <div className={styles.description}>Phone Number:</div>
            <div>
              <input id="phone-number" className={styles.input} type="text" value={processedData} onChange={(e) => setData(e.target.value)}/>
            </div>
            <div className={styles.sample}>(Example: 0744165568)</div>
            <div className={styles.description}>Text:</div>
            <textarea rows="4" cols="50" className={styles.textarea} value={smsText} onChange={(e) => setSmsText(e.target.value)} spellCheck="false">
            </textarea>
            <button className={styles.button} onClick={generateCode}>
              <span className={styles.buttonText}>Generate</span>
            </button>
            <div className={styles.message}>
              <span className={styles.success}>{successMessage}</span>
              <span className={styles.error}>{errorMessage}</span>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image src={"data:image/png;base64," + image} alt="image" width='310' height="310"></Image>
            <Download image={image} />
          </div>
        </div>
      </main>
    </Layout>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  const response = await fetch(`${process.env.apiUrl}/qr-codes/sms?phoneNumber=""`, {
    agent: new https.Agent({
      rejectUnauthorized: false,
    })
  });
  const data = Buffer.from(await response.arrayBuffer()).toString('base64');

  return {
    props: { data }
  };
}
