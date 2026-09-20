import { useEffect, useRef, useState } from 'react'
import Notificacoes from './Notificacoes'

function Header({ onNavegar, qtdCarrinho, notificacoes, onMarcarLida, onMarcarTodasLidas, onLimparNotificacoes }) {
  const [notificacaoAberta, setNotificacaoAberta] = useState(false)
  const notificacaoRef = useRef(null)
  const naoLidas = notificacoes.filter(n => !n.lida).length

  // A caixa de notificações fecha ao clicar fora dela ou ao pressionar Esc
  useEffect(() => {
    if (!notificacaoAberta) return

    function fecharAoClicarFora(evento) {
      if (!notificacaoRef.current.contains(evento.target)) {
        setNotificacaoAberta(false)
      }
    }

    function fecharComEsc(evento) {
      if (evento.key === 'Escape') {
        setNotificacaoAberta(false)
      }
    }

    document.addEventListener('mousedown', fecharAoClicarFora)
    document.addEventListener('keydown', fecharComEsc)

    return () => {
      document.removeEventListener('mousedown', fecharAoClicarFora)
      document.removeEventListener('keydown', fecharComEsc)
    }
  }, [notificacaoAberta])

  return (
    <div className="barra-de-menu">

      {/* Logo → volta para Login/Home */}
      <div className="logo">
        <button
          type="button"
          onClick={() => onNavegar('login')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img src="/img/logo-reaproveitaai.png" alt="logo ReaproveitaAi" />
        </button>
      </div>

      {/* Menu principal */}
      <div className="menu-principal">
        <button
          type="button"
          onClick={() => onNavegar('produtos')}
          style={{ background: 'rgb(218, 237, 221)', border: 'none', cursor: 'pointer', textDecoration: 'none', color: 'rgb(14, 136, 7)', fontWeight: 500, fontSize: 16, padding: '12px 22px', borderRadius: 14, display: 'flex', transition: '0.3s' }}
        >
          Produtos
        </button>
        <button
          type="button"
          id="btn-faleconosco"
          onClick={() => onNavegar('faleconosco')}
          style={{ border: 'none', cursor: 'pointer', color: 'rgb(136, 127, 7)', background: 'rgba(255, 247, 175, 0.89)', fontWeight: 500, fontSize: 16, padding: '12px 22px', borderRadius: 14, display: 'flex', transition: '0.3s' }}
        >
          Fale Conosco
        </button>
      </div>

      {/* Ações: sino + carrinho */}
      <div className="acoes-topo">

        <div className="notificacao-wrapper" ref={notificacaoRef}>
          <button
            type="button"
            className="btn-notificacao"
            onClick={() => setNotificacaoAberta(prev => !prev)}
            aria-label={naoLidas > 0 ? `Notificações (${naoLidas} não lidas)` : 'Notificações'}
            aria-expanded={notificacaoAberta}
          >
            <i className="fa-solid fa-bell"></i>
            {naoLidas > 0 && <span className="badge-notificacao">{naoLidas}</span>}
          </button>

          {notificacaoAberta && (
            <Notificacoes
              notificacoes={notificacoes}
              onMarcarLida={onMarcarLida}
              onMarcarTodasLidas={onMarcarTodasLidas}
              onLimpar={onLimparNotificacoes}
            />
          )}
        </div>

        <button
          type="button"
          className="carrinho"
          onClick={() => onNavegar('carrinho')}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          &nbsp; Carrinho {qtdCarrinho > 0 ? `(${qtdCarrinho})` : ''}
        </button>

      </div>

    </div>
  )
}

export default Header
