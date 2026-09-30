import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import LoginRoute from './routes/Login'
import ProdutosRoute from './routes/Produtos'
import CarrinhoRoute from './routes/Carrinho'
import ServicosRoute from './routes/Servicos'

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

function AppLayout({ children, qtdCarrinho, notificacoes, onMarcarLida, onMarcarTodasLidas, onLimparNotificacoes }) {
  return (
    <>
      <Header
        qtdCarrinho={qtdCarrinho}
        notificacoes={notificacoes}
        onMarcarLida={onMarcarLida}
        onMarcarTodasLidas={onMarcarTodasLidas}
        onLimparNotificacoes={onLimparNotificacoes}
      />
      {children}
      <Footer />
    </>
  )
}

function App() {
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

  return (
    <div id="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginRoute />} />

        <Route
          path="/produtos"
          element={
            <AppLayout
              qtdCarrinho={qtdCarrinho}
              notificacoes={notificacoes}
              onMarcarLida={marcarNotificacaoLida}
              onMarcarTodasLidas={marcarTodasLidas}
              onLimparNotificacoes={limparNotificacoes}
            >
              <ProdutosRoute
                onAdicionarAoCarrinho={adicionarAoCarrinho}
                onNotificar={notificar}
              />
            </AppLayout>
          }
        />

        <Route
          path="/carrinho"
          element={
            <AppLayout
              qtdCarrinho={qtdCarrinho}
              notificacoes={notificacoes}
              onMarcarLida={marcarNotificacaoLida}
              onMarcarTodasLidas={marcarTodasLidas}
              onLimparNotificacoes={limparNotificacoes}
            >
              <CarrinhoRoute
                itens={itensCarrinho}
                onAtualizarQuantidade={atualizarQuantidade}
                onRemover={removerDoCarrinho}
              />
            </AppLayout>
          }
        />

        <Route
          path="/faleconosco"
          element={
            <AppLayout
              qtdCarrinho={qtdCarrinho}
              notificacoes={notificacoes}
              onMarcarLida={marcarNotificacaoLida}
              onMarcarTodasLidas={marcarTodasLidas}
              onLimparNotificacoes={limparNotificacoes}
            >
              <ServicosRoute />
            </AppLayout>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App
