import Head from 'next/head';
import styles from '../../styles/qrcode.module.css';
import Layout from '../../components/layout';
import Link from 'next/link';

export default function QRCode() {
  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.gridTable}>
          <Link href='/qrcode/create/website' className={styles.gridRow}>

            <div className={styles.innerRow}>
              <div className={styles.title}>
                Website URL QR Code
              </div>
              <div className={styles.description}>When scanned, redirects user to a website</div>
            </div>

          </Link>
          <Link href='/qrcode/create/number' className={styles.gridRow}>

            <div className={styles.innerRow}>
              <div className={styles.title}>
                Phone Number QR Code
              </div>
              <div className={styles.description}>When scanned, displays the option to call to that number</div>
            </div>

          </Link>
          <Link href='/qrcode/create/sms' className={styles.gridRow}>

            <div className={styles.innerRow}>
              <div className={styles.title}>
                SMS QR Code
              </div>
              <div className={styles.description}>When scanned, displays the message to send to a user</div>
            </div>

          </Link>
          <Link href='/qrcode/create/wifi' className={styles.gridRow}>

            <div className={styles.innerRow}>
              <div className={styles.title}>
                Wi-Fi QR Code
              </div>
              <div className={styles.description}>When scanned, connects to a Wi-Fi network</div>
            </div>

          </Link>
          <Link href='/qrcode/create/email' className={styles.gridRow}>

            <div className={styles.innerRow}>
              <div className={styles.title}>
                Email QR Code
              </div>
              <div className={styles.description}>When scanned, sends email to a user</div>
            </div>

          </Link>
        </div>
      </main>
    </Layout>
  );
}
