import './App.css';
import AdminPanel from './components/admin/AdminPanel';
import MainPage from './components/mainPage/mainPage';
import { GlobalProvider } from './globalContext/PriceContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const basename = '/granit'; 
  return (
    <GlobalProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/prices" element={<AdminPanel />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}


export default App;
