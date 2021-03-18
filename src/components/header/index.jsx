import styles from "./style.module.scss";
import logo from "../../assets/logo.png";
export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_logo}>
        <img src={logo} alt='logo' />
      </div>
      <div className={styles.header_title}>
        <h1 className={styles.header_title_text}>Product List by Vanik Vardanyan</h1>
      </div>
    </div>
  );
};
