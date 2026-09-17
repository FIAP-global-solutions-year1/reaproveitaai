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
  const [itensCarrinho, setItensCarrinho] = useState([])
  const qtdCarrinho = itensCarrinho.reduce((total, item) => total + item.quantidade, 0)

  function navegar(novaTela) {
    setTela(novaTela)
    window.scrollTo(0, 0)
  }

  function adicionarAoCarrinho(produto) {
    setItensCarrinho(prev => {
      if (prev.some(item => item.id === produto.id)) {
        return prev.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
      }

      // O catálogo exibe preços em reais ou "Grátis"; o carrinho calcula com números.
      const preco = produto.preco === 'Grátis'
        ? 0
        : Number(produto.preco.replace('R$', '').trim().replace('.', '').replace(',', '.'))

      return [...prev, {
        ...produto,
        preco,
        quantidade: 1,
        imagem: produto.img,
        alt: produto.nome,
        descricao: produto.loja,
      }]
    })
  }

  function atualizarQuantidade(id, quantidade) {
    setItensCarrinho(prev => prev.map(item =>
      item.id === id ? { ...item, quantidade: Math.max(1, quantidade) } : item
    ))
  }

  function removerDoCarrinho(id) {
    setItensCarrinho(prev => prev.filter(item => item.id !== id))
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
        <Produtos onAdicionarAoCarrinho={adicionarAoCarrinho} />
      )}

      {tela === 'carrinho' && (
        <Carrinho
          itens={itensCarrinho}
          onAtualizarQuantidade={atualizarQuantidade}
          onRemover={removerDoCarrinho}
          onNavegar={navegar}
        />
      )}

      {tela === 'faleconosco' && (
        <FaleConosco />
      )}

      <Footer />

    </div>
  )
}

export default App
