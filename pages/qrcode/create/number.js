import Head from 'next/head';
import styles from '../../../styles/qrcode-create.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../../components/layout';
import Download from '../../../components/download';
import https from 'https';

export default function PhoneNumberQRCode({ data }) {
  const [processedData, setData] = useState('');
  const [image, setImage] = useState(data);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generateCode = async() => {
    if (!processedData) {
      return;
    }

    const response = await fetch(`${process.env.apiUrl}/qr-codes/phone-number?phoneNumber=${processedData}`, {
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
            <div className={styles.header1}>Generate Phone Number QR Code</div>
            <div className={styles.description}>Phone Number:</div>
            <div>
              <input id="phone-number" className={styles.input} type="text" value={processedData} onChange={(e) => setData(e.target.value)}/>
            </div>
            <div className={styles.sample}>(Example: 0744165568)</div>
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
  const response = await fetch(`${process.env.apiUrl}/qr-codes/phone-number?phoneNumber=""`, {
    agent: new https.Agent({
      rejectUnauthorized: false,
    })
  });
  const data = Buffer.from(await response.arrayBuffer()).toString('base64');

  return {
    props: { data }
  };
}
