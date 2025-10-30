// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import CantariaPage from './pages/CantariaPage';

const repoName = '/nwcalculator/';

function App() {
  return (
   <BrowserRouter basename={repoName}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cantaria" element={<CantariaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;