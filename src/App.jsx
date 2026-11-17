import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import LoginRoute from './routes/Login'
import ProdutosRoute from './routes/Produtos'
import CarrinhoRoute from './routes/Carrinho'
import ServicosRoute from './routes/Servicos'
import ReservasRoute from './routes/Reservas'

const CHAVE_NOTIFICACOES = 'reaproveitaai:notificacoes'
const LIMITE_NOTIFICACOES = 20
const CHAVE_RESERVAS = 'reaproveitaai:reservas'

function carregarReservas() {
  try {
    const salvas = JSON.parse(localStorage.getItem(CHAVE_RESERVAS))
    if (Array.isArray(salvas)) return salvas
  } catch {
    // Armazenamento bloqueado ou conteúdo inválido: começa sem reservas.
  }

  return []
}

function gerarCodigoVoucher() {
  return `ECO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

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
  const [reservas, setReservas] = useState(carregarReservas)
  const qtdCarrinho = itensCarrinho.reduce((total, item) => total + item.quantidade, 0)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_NOTIFICACOES, JSON.stringify(notificacoes))
    } catch {
      // Sem espaço ou acesso negado: as notificações seguem apenas em memória.
    }
  }, [notificacoes])

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_RESERVAS, JSON.stringify(reservas))
    } catch {
      // Sem espaço ou acesso negado: as reservas seguem apenas em memória.
    }
  }, [reservas])

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

  function finalizarCompra() {
    if (itensCarrinho.length === 0) return false

    const total = itensCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
    const reserva = {
      id: crypto.randomUUID(),
      codigo: gerarCodigoVoucher(),
      data: Date.now(),
      itens: itensCarrinho.map(item => ({
        id: item.id,
        nome: item.nome,
        loja: item.descricao,
        imagem: item.imagem,
        alt: item.alt,
        preco: item.preco,
        quantidade: item.quantidade,
      })),
      total,
    }

    setReservas(prev => [reserva, ...prev])
    setItensCarrinho([])
    notificar({
      tipo: 'reserva',
      titulo: 'Reserva confirmada',
      descricao: `Voucher ${reserva.codigo} gerado. Apresente o código na retirada.`,
    })

    return true
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
                onFinalizar={finalizarCompra}
              />
            </AppLayout>
          }
        />

        <Route
          path="/reservas"
          element={
            <AppLayout
              qtdCarrinho={qtdCarrinho}
              notificacoes={notificacoes}
              onMarcarLida={marcarNotificacaoLida}
              onMarcarTodasLidas={marcarTodasLidas}
              onLimparNotificacoes={limparNotificacoes}
            >
              <ReservasRoute reservas={reservas} />
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
