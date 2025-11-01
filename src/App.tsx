// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import CraftingPage from './pages/CraftingPage'; // <-- A página genérica
import { modules } from './data/modules'; // <-- Nosso índice de módulos

const repoName = '/nwcalculator/';

function App() {
  return (
   <BrowserRouter basename={repoName}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          
          {/* Mapeia os módulos para criar as rotas dinamicamente! */}
          {modules.map((module) => (
            <Route 
              key={module.id}
              path={module.id} 
              element={<CraftingPage module={module} />} 
            />
          ))}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;