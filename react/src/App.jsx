import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import Produtos from './components/Produtos'
import Carrinho from './components/Carrinho'
import FaleConosco from './components/FaleConosco'

// Telas disponíveis: 'login' | 'produtos' | 'carrinho' | 'faleconosco'
function App() {
  const [tela, setTela] = useState('login')
  const [qtdCarrinho, setQtdCarrinho] = useState(0)

  function navegar(novaTela) {
    setTela(novaTela)
    window.scrollTo(0, 0)
  }

  function incrementarCarrinho() {
    setQtdCarrinho(prev => prev + 1)
  }

  // O Header é exibido em todas as telas exceto Login (que tem layout próprio)
  const mostrarHeader = tela !== 'login'

  return (
    <div id="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {mostrarHeader && (
        <Header
          telaAtual={tela}
          onNavegar={navegar}
          qtdCarrinho={qtdCarrinho}
        />
      )}

      {/* Renderização condicional das telas — SPA via useState */}
      {tela === 'login' && (
        <Login onNavegar={navegar} />
      )}

      {tela === 'produtos' && (
        <Produtos onIncrementarCarrinho={incrementarCarrinho} />
      )}

      {tela === 'carrinho' && (
        <Carrinho onNavegar={navegar} />
      )}

      {tela === 'faleconosco' && (
        <FaleConosco />
      )}

      <Footer />

    </div>
  )
}

export default App
