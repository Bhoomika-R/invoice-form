import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './createInvoice/pages/LoginPage';
import InvoiceForm from './components/InvoiceForm';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Home />} />
          <Route
            path="/invoice"
            element={
              <PrivateRoute>
                <InvoiceForm />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/invoice" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

