import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CraftingPage from './pages/CraftingPage';
import { modules } from './data/modules';
import MatrixCalculatorPage from './pages/MatrixCalculatorPage';
import RefiningHomePage from './pages/RefiningHomePage';
import MainLayout from './layout/MainLayout';

const repoName = '/nwcalculator/';

function App() {
  return (
    <BrowserRouter basename={repoName}>
      <Routes>
        <Route 
          element={<MainLayout />}
        >
          <Route index element={<HomePage />} />
          
          {modules.map((module) => (
            <Route 
              key={module.id}
              path={module.id} 
              element={<CraftingPage module={module} />} 
            />
          ))}
          
          <Route path="/refinos" element={<RefiningHomePage />} />
          <Route path="/matrizes" element={<MatrixCalculatorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;