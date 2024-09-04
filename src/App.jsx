import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Weather from "./components/Weather";

const App = () => {
  return (
    <div className="app">
      <ToastContainer position="top-center" autoClose={1500} />
      <Weather />
    </div>
  );
};
export default App;
