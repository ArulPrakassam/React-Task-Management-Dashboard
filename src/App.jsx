import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <main>
      <Header />
      <Dashboard />
      <ToastContainer position="top-center" />
      <Footer />
    </main>
  );
};

export default App;
