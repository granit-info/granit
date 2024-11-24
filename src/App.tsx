import './App.css';
import AdminPanel from './components/admin/AdminPanel';
import CalcStella from './components/calcStella/CalcStella';
import { GlobalProvider } from './globalContext/PriceContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const basename = '/granit'; 
  return (
    <GlobalProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<CalcStella />} />
          <Route path="/prices" element={<AdminPanel />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
