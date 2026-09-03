import { Link } from 'react-router-dom';
import '../css/header.css'

const Header = ({ temAcoes }) => {
  return (
    <div className="barra-de-menu">
      <div className="logo">
        <Link to="/produtos">
          <img src="img/logo-reaproveitaai.png" alt="logo" />
        </Link>
      </div>

      <div className="menu-principal">
        <Link to="/produtos">Produtos</Link>
        <Link to="/faleconosco" id="btn-faleconosco">Fale Conosco</Link>
      </div>

      {temAcoes && (
        <div className="acoes-topo">
          <div className="notificacao-wrapper">
            <button id="btn-notificacao" className="btn-notificacao">
              <i className="fa-solid fa-bell"></i>
            </button>

            <div id="caixa-notificacao" className="caixa-notificacao escondido">
              <h4>Ofertas para você</h4>
              <ul id="lista-notificacao"></ul>
            </div>
          </div>

          <Link to="/carrinho" className="carrinho">
            <i className="fa-solid fa-cart-shopping"></i>
            &nbsp; Carrinho
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;