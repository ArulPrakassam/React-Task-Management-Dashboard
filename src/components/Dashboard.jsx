import List from "./List";
import Filters from "./Filters";
import Loading from "./Loading";
import "../styles/dashboard.css";

import DeletePopup from "./DeletePopup";
import { useGlobalContext } from "../context";

const Dashboard = () => {
  const { loading, confirmDelete } = useGlobalContext();

  return (
    <section className="container">
      <div className="user-greetings">
        <div className="greetings-text">
          <h1>Hi, Arul</h1>
        </div>
      </div>
      <Filters />
      <div className="tasks-container">{loading ? <Loading /> : <List />}</div>
      {confirmDelete.status && <DeletePopup />}
    </section>
  );
};

export default Dashboard;
