import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transaction from "./components/Transaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
