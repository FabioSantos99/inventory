import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Users from "./pages/Users";

import './styles/global.css';

function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota pública */}
          <Route path='/login' element={<Login />} />

          {/* Rota protegida - qualquer usuário autenticado */}
          <Route path='/' element= {
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
          />

          {/* Rota protegida - apenas admin */}

          <Route path="/users" element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
          />

          {/* Qualquer rota desconhecida vai para o login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
