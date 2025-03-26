import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Treinadores from './pages/Treinadores';
import Configuracao from './pages/Configuracao';
import Chat from './pages/Chat';
import Relatorio from './pages/Relatorio';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/treinadores" element={<Treinadores />} />
          <Route path="/configuracao" element={<Configuracao />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/relatorio" element={<Relatorio />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;