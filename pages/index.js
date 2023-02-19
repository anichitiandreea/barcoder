import Head from 'next/head';
import styles from '../styles/qrcode.module.css';
import Layout from '../components/layout';
import React, { useEffect, useState } from "react";
import Router from 'next/router';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { pathname } = Router;

    if (pathname == '/') {
      Router.push('/qrcode/create');
    }
    else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return <div></div>
  }

  return (
    <Layout>
      <main className={styles.container}></main>
    </Layout>
  )
}
