import ActiveNotes from "../components/multiViews/ActiveNotes";
import Landing from "./Landing";
import { useContext } from "react";
import { AuthContext } from "../App";

function Home() {
  const { user } = useContext(AuthContext);
  if (user) {
    return <ActiveNotes />;
  }

  return <Landing />;
}

export default Home;
