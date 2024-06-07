import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { AllRoutes } from "./Routes/AllRoutes";

function App() {
  return (
    <>
      <Navbar />
      <AllRoutes />
    </>
  );
}

export default App;
