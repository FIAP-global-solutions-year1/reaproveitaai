import { useState } from 'react'

const OFERTAS = [
  { nome: 'Pães Frescos', preco: 'Grátis' },
  { nome: 'SOPA', preco: 'Grátis' },
  { nome: 'Cenoura', preco: 'R$ 1,99' },
]

function Header({ telaAtual, onNavegar, qtdCarrinho }) {
  const [notificacaoAberta, setNotificacaoAberta] = useState(false)

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

        <div className="notificacao-wrapper">
          <button
            type="button"
            className="btn-notificacao"
            onClick={() => setNotificacaoAberta(prev => !prev)}
            aria-label="Notificações"
          >
            <i className="fa-solid fa-bell"></i>
          </button>

          {notificacaoAberta && (
            <div className="caixa-notificacao">
              <h4>Ofertas para você</h4>
              <ul>
                {OFERTAS.map((item, idx) => (
                  <li key={idx}>{item.nome} - {item.preco}</li>
                ))}
              </ul>
            </div>
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
