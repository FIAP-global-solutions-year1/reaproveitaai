import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Notificacoes from '../../ui/notificacoes/Notificacoes'
import './Header.css'

function Header({ qtdCarrinho, notificacoes, onMarcarLida, onMarcarTodasLidas, onLimparNotificacoes }) {
  const [notificacaoAberta, setNotificacaoAberta] = useState(false)
  const notificacaoRef = useRef(null)
  const navigate = useNavigate()
  const naoLidas = notificacoes.filter(n => !n.lida).length

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
      <div className="logo">
        <button
          type="button"
          onClick={() => navigate('/login')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img src="img/logo-reaproveitaai.png" alt="logo ReaproveitaAi" />
        </button>
      </div>

      <div className="menu-principal">
        <NavLink
          to="/produtos"
          style={({ isActive }) => ({
            background: isActive ? 'rgb(218, 237, 221)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'rgb(14, 136, 7)',
            fontWeight: 500,
            fontSize: 16,
            padding: '12px 22px',
            borderRadius: 14,
            display: 'flex',
            transition: '0.3s',
          })}
        >
          Produtos
        </NavLink>
        <NavLink
          to="/faleconosco"
          id="btn-faleconosco"
          style={({ isActive }) => ({
            border: 'none',
            cursor: 'pointer',
            color: 'rgb(136, 127, 7)',
            background: isActive ? 'rgba(255, 247, 175, 0.89)' : 'transparent',
            fontWeight: 500,
            fontSize: 16,
            padding: '12px 22px',
            borderRadius: 14,
            display: 'flex',
            transition: '0.3s',
            textDecoration: 'none',
          })}
        >
          Fale Conosco
        </NavLink>
      </div>

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
          onClick={() => navigate('/carrinho')}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          &nbsp; Carrinho {qtdCarrinho > 0 ? `(${qtdCarrinho})` : ''}
        </button>
      </div>
    </div>
  )
}

export default Header
