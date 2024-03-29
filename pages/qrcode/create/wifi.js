import Head from 'next/head';
import styles from '../../../styles/qrcode-create.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../../components/layout';
import Download from '../../../components/download';
import https from 'https';

export default function WifiQRCode({ data }) {
  const [image, setImage] = useState(data);
  const [successMessage, setSuccessMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const generateCode = async event => {
    event.preventDefault();
    const response = await fetch(`${process.env.apiUrl}/qr-codes/wi-fi`, {
      body: JSON.stringify({
        ssid: event.target.ssid.value,
        password: event.target.password.value,
        authenticationMode: parseInt(event.target.authenticationMode.value),
        isHiddenSsid: checked
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
      props: { data }
    };
  }

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.generation}>
            <div className={styles.header1}>Generate Wi-Fi QR Code</div>
            <form onSubmit={generateCode}>
              <label htmlFor="ssid" className={styles.label}>Network Name:</label>
              <input id="ssid" name="ssid" type="text" className={styles.input} autoComplete="off"/>
              <div className={styles.checkboxWrapper}>
                <input type="checkbox" id="isHiddenSsid" name="isHiddenSsid" checked={checked}
                  onChange={(e) => setChecked(e.target.checked)} className={styles.checkboxReal}/>
                <label htmlFor="isHiddenSsid" className={styles.checkbox}>
                  <span className={styles.svgStyle}>
                    <svg width="18px" height="18px" viewBox="0 0 18 18" className={(checked ? styles.svg : '')}>
                      <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"
                      className={(checked ? styles.path : '')}></path>
                      <polyline points="1 9 7 14 15 4" className={(checked ? styles.polyline : '')}></polyline>
                    </svg>
                  </span>
                  <label htmlFor="isHiddenSsid" className={styles.labelRight}>Is Hidden</label>
                </label>
              </div>
              <label htmlFor="password" className={styles.label}>Password:</label>
              <input id="password" name="password" type="text" className={styles.input} autoComplete="off"/>
              <label className={styles.label}>Encryption:</label>
              <div className={styles.encryption}>
                <label className={styles.radLabel}>
                  <input type="radio" className={styles.radInput} name="authenticationMode" value="2" autoComplete="off"/>
                  <div className={styles.radDesign}></div>
                  <div className={styles.radText}>None</div>
                </label>
                <label className={styles.radLabel}>
                  <input type="radio" className={styles.radInput} name="authenticationMode" value="1" autoComplete="off"/>
                  <div className={styles.radDesign}></div>
                  <div className={styles.radText}>WPA/WPA2</div>
                </label>
                <label className={styles.radLabel}>
                  <input type="radio" className={styles.radInput} name="authenticationMode" value="0" autoComplete="off"/>
                  <div className={styles.radDesign}></div>
                  <div className={styles.radText}>WEP</div>
                </label>
              </div>
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
  const response = await fetch(`${process.env.apiUrl}/qr-codes/wi-fi`, {
    body: JSON.stringify({
      ssid: "",
      password: "",
      authenticationMode: 2,
      isHiddenSsid: false
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
    props: { data }
  };
}
