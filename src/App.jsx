// import { useEffect, useState } from 'react';
import CurrencyConverter from "./components/convercyMain/convercy";
import Navigasi from "./components/navBar/Navigasi";
// import PecahanUang from "./components/listMataUang/PecahanUang";

function App() {
  return (
    <div>
      <Navigasi />
      <CurrencyConverter />
      {/* <PecahanUang /> */}
    </div>
  );
}

export default App;
