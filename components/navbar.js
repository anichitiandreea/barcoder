import styles from '../styles/navbar.module.css'
import ActiveLink from './link'

export default function Navbar() {
  return (
    <div className={styles.nav}>
      <div className={styles.innerNav}>
        <a className={styles.link}>Login</a>
        <a className={styles.link}>Sign up</a>
      </div>
      <div className={styles.submenu}>
        <ActiveLink activeClassName={styles.active} href="/qrcode/create">
          <a className={styles.link}>QR Code</a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href="/barcode">
          <a className={styles.link}>Barcode</a>
        </ActiveLink>
      </div>
    </div>
  )
}
