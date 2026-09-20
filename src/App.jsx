import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import Produtos from './components/Produtos'
import Carrinho from './components/Carrinho'
import FaleConosco from './components/FaleConosco'

const CHAVE_NOTIFICACOES = 'reaproveitaai:notificacoes'
const LIMITE_NOTIFICACOES = 20

function carregarNotificacoes() {
  try {
    const salvas = JSON.parse(localStorage.getItem(CHAVE_NOTIFICACOES))
    if (Array.isArray(salvas)) return salvas
  } catch {
    // Armazenamento bloqueado ou conteúdo inválido: começa sem histórico.
  }

  return []
}

// Telas disponíveis: 'login' | 'produtos' | 'carrinho' | 'faleconosco'
function App() {
  const [tela, setTela] = useState('login')
  const [itensCarrinho, setItensCarrinho] = useState([])
  const [notificacoes, setNotificacoes] = useState(carregarNotificacoes)
  const qtdCarrinho = itensCarrinho.reduce((total, item) => total + item.quantidade, 0)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_NOTIFICACOES, JSON.stringify(notificacoes))
    } catch {
      // Sem espaço ou acesso negado: as notificações seguem apenas em memória.
    }
  }, [notificacoes])

  function navegar(novaTela) {
    setTela(novaTela)
    window.scrollTo(0, 0)
  }

  function notificar({ tipo, titulo, descricao }) {
    setNotificacoes(prev => [
      { id: crypto.randomUUID(), tipo, titulo, descricao, data: Date.now(), lida: false },
      ...prev,
    ].slice(0, LIMITE_NOTIFICACOES))
  }

  function marcarNotificacaoLida(id) {
    setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n))
  }

  function marcarTodasLidas() {
    setNotificacoes(prev => prev.map(n => n.lida ? n : { ...n, lida: true }))
  }

  function limparNotificacoes() {
    setNotificacoes([])
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
    const item = itensCarrinho.find(i => i.id === id)

    setItensCarrinho(prev => prev.filter(i => i.id !== id))

    if (item) {
      notificar({
        tipo: 'cancelada',
        titulo: 'Reserva cancelada',
        descricao: `${item.nome} saiu do seu carrinho e voltou para ${item.descricao}.`,
      })
    }
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
          notificacoes={notificacoes}
          onMarcarLida={marcarNotificacaoLida}
          onMarcarTodasLidas={marcarTodasLidas}
          onLimparNotificacoes={limparNotificacoes}
        />
      )}

      {/* Renderização condicional das telas — SPA via useState */}
      {tela === 'login' && (
        <Login onNavegar={navegar} />
      )}

      {tela === 'produtos' && (
        <Produtos
          onAdicionarAoCarrinho={adicionarAoCarrinho}
          onNotificar={notificar}
        />
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
