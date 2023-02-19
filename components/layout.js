import Navbar from './navbar';
import Head from './head';

export default function Layout({ children }) {
  return (
    <div>
      <Head/>
      <Navbar/>
      {children}
    </div>
  )
}
