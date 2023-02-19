import Head from 'next/head';
import styles from '../../../styles/qrcode-create.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../../components/layout';
import Download from '../../../components/download';
import https from 'https';

export default function EmailQRCode({ data }) {
  const [image, setImage] = useState(data);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generateCode = async event => {
    event.preventDefault();
    const response = await fetch(`${process.env.apiUrl}/qr-codes/email`, {
      body: JSON.stringify({
        user: event.target.email.value,
        subject: event.target.subject.value,
        message: event.target.message.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
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
      props: {
        data
      }
    };
  }

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.generation}>
            <div className={styles.header1}>Generate Email QR Code</div>
            <form onSubmit={generateCode}>
              <label htmlFor="email" className={styles.label}>Email:</label>
              <input name="email" type="text" className={styles.input} autoComplete="off"/>
              <label htmlFor="subject" className={styles.label}>Subject:</label>
              <input name="subject" type="text" className={styles.input} autoComplete="off"/>
              <label className={styles.label}>Message:</label>
              <textarea rows="4" cols="50" className={styles.textarea} name="message" spellCheck="false" autoComplete="off"></textarea>
              <button className={styles.button} type="submit">
                <span className={styles.buttonText}>Generate</span>
              </button>
            </form>
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
  const response = await fetch(`${process.env.apiUrl}/qr-codes/email`, {
    body: JSON.stringify({
      user: "",
      subject: "",
      message: ""
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    agent: new https.Agent({
      rejectUnauthorized: false,
    })
  });

  const data = Buffer.from(await response.arrayBuffer()).toString('base64');

  return {
    props: {
      data
    }
  };
}
