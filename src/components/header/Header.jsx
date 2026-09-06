import { useContext } from "react";
import { AuthContext } from "../../App";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

function Header() {
  const { user } = useContext(AuthContext);

  if (user) {
    return <LoggedInNav />;
  } else {
    return <LoggedOutNav />;
  }
}

export default Header;
