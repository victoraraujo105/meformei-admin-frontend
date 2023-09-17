import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes.jsx';
import { AuthProvider } from './config/Auth.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;