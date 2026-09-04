// src/App.jsx
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Produtos } from './components/Produtos';
import { Carrinho } from './components/Carrinho';
import { FaleConosco } from './components/FaleConosco';
import './App.css';

export function App() {
  const [paginaAtual, setPaginaAtual] = useState('login');

  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'login':
        return <Login setPaginaAtual={setPaginaAtual} />;
      case 'produtos':
        return <Produtos />;
      case 'carrinho':
        return <Carrinho />;
      case 'faleconosco':
        return <FaleConosco />;
      default:
        return <Login setPaginaAtual={setPaginaAtual} />;
    }
  };

  return (
    <div className="app-container">
      {paginaAtual !== 'login' && <Navbar setPaginaAtual={setPaginaAtual} />}

      {renderizarPagina()}
    </div>
  );
}

export default App;