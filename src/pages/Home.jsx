import ActiveNotes from "../components/multiViews/ActiveNotes";
import Landing from "./Landing";
import { useContext } from "react";
import { AppContext } from "../App";

function Home() {
  const { user } = useContext(AppContext);
  if (user) {
    return <ActiveNotes />;
  }

  return <Landing />;
}

export default Home;
