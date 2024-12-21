import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header"

import "preline/preline";
import HomePage from "./components/HomePage";
import { IStaticMethods } from 'flyonui/flyonui';
import { useEffect } from "react";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  const location = useLocation();
  useEffect(() => {
    const loadFlyonui = async () => {
      await import('flyonui/flyonui');
      window.HSStaticMethods.autoInit();
    };
    loadFlyonui();
  }, [location.pathname]);
  return (
    <>
      <div className=" w-screen h-screen">
        <Header />
        <div className="main-content ml-3 mr-3 ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/transactions" element={<Transactions />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/expenses" element={<Expenses />} /> */}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>

        </div>
      </div>
    </>
  )
}

export default App
