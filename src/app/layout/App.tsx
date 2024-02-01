import { Outlet } from "react-router-dom";
import Header from "./Header";

function App() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;