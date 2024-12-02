import './App.css';
import AdminPanel from './components/admin/AdminPanel';
import ButtonScrollUp from './components/ButtonScrollUp/ButtonScrollUp';
// import MainPage from './components/mainPage/mainPage';
import StartPage from './components/startPage/StartPage';
import { GlobalProvider } from './globalContext/PriceContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const basename = '/granit'; 
  return (
    <GlobalProvider>
      <Router basename={basename}>
        <Routes>
          {/* <Route path="/" element={<MainPage />} /> */}
          <Route path="/" element={<StartPage />} />
          <Route path="/prices" element={<AdminPanel />} />
        </Routes>
      <ButtonScrollUp />
      </Router>
    </GlobalProvider>
  );
}

export default App;
