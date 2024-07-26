import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.main}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
