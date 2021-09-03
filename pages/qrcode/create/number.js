import Head from 'next/head';
import styles from '../../../styles/qrcode-create.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../../components/layout';

export default function PhoneNumberQRCode({data}) {
  const [processedData, setData] = useState('');
  const [image, setImage] = useState(data.fileContents);
  const [successMessage, setSuccessMessage] = useState("");

  const generateCode = async() => {
    const response = await fetch('http://localhost:5000/PayloadQRCode/number?data=' + processedData);
    const data = await response.json();

    setImage(data.fileContents);
    setSuccessMessage("Successfully generated!");

    setTimeout(() => {
      setSuccessMessage("")
    }, 2000);

    return {
      props: {
        data
      }
    };
  }

  const downloadFile = async () => {
    let binaryString = window.atob(image);
    let length = binaryString.length;
    let bytes = new Uint8Array(length);

    for (var i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const url = window.URL.createObjectURL(
      new Blob([bytes.buffer, {type: 'image/png'}]),
    );

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `image.png`,
    );

    // Start download
    link.click();
  };

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.generation}>
            <div className={styles.header1}>Generate Phone Number QR Code</div>
            <div className={styles.description}>Pass phone number here:</div>
            <div>
              <input id="phone-number" className={styles.input} type="text" value={processedData} onChange={(e) => setData(e.target.value)}/>
            </div>
            <div className={styles.sample}>(Example: 0744165568)</div>
            <button className={styles.button} onClick={generateCode}>
              <span className={styles.buttonText}>Generate</span>
            </button>
            <div className={styles.success}>{successMessage}</div>
          </div>
          <div className={styles.imageContainer}>
            <Image src={"data:image/png;base64," + image} alt="image" width='310px' height="310px"></Image>
            <a className={styles.longButton} onClick={downloadFile}>
              <span className={styles.buttonText}>Download (.jpg)</span>
            </a>
          </div>
        </div>
      </main>
    </Layout>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  const response = await fetch('http://localhost:5000/PayloadQRCode/number?data=""');
  const data = await response.json();

  return {
    props: {
      data
    }
  };
}
