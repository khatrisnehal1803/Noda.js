import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import './assets/styles/main.css';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App.jsx;
