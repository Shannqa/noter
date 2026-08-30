import MainMenu from "../mainMenu/MainMenu";
import styles from "./header.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../App";
import RightSide from "./RightSide";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

function Header() {
  const { user } = useContext(AuthContext);

  // console.log("Header user:", user);

  if (user) {
    return <LoggedInNav />;
  } else {
    return <LoggedOutNav />;
  }

  // return (
  //   <div className={styles.headerContainer}>
  //     <div className={styles.header}>
  //       <MainMenu />
  //       <div className={styles.home}>
  //         <Link to={"/"} className={styles.sitename}>
  //           Noter
  //         </Link>
  //         <RightSide user={user} />
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Header;
