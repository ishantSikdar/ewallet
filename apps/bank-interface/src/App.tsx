
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transaction from "./components/Transaction";

function App() {
  console.log(process.env);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
