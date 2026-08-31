
import { AuthProvider } from './context/AuthContext';
import Inventory from './pages/Inventory';

import './styles/global.css';

function App() {
  return(
   
    <AuthProvider>
      <Inventory></Inventory>
    </AuthProvider>

  )
}

export default App
