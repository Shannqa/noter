import moreVert from "../../assets/more_vert_18dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
import styles from "./noteMenu.module.css";

function MenuIcon({ onClick }) {
  return <img src={moreVert} className={styles.menuIcon} onClick={onClick} />;
}

export default MenuIcon;
