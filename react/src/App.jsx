import { useEffect } from 'react'
import './css/carrinho.css'

function App() {

  // Preserva a interação JS do sino de notificação
  // presente no header de produtos.html (js/produtos.js)
  useEffect(() => {
    const btnNotificacao = document.getElementById('btn-notificacao')
    const caixaNotificacao = document.getElementById('caixa-notificacao')
    const listaNotificacao = document.getElementById('lista-notificacao')

    if (listaNotificacao) {
      const ofertas = [
        { nome: 'Pães Frescos', preco: 'Grátis' },
        { nome: 'SOPA', preco: 'Grátis' },
        { nome: 'Cenoura', preco: 'R$ 1,99' },
      ]

      listaNotificacao.innerHTML = ofertas
        .map((item) => `<li>${item.nome} - ${item.preco}</li>`)
        .join('')
    }

    if (btnNotificacao && caixaNotificacao) {
      const handleClick = () => {
        caixaNotificacao.classList.toggle('escondido')
      }
      btnNotificacao.addEventListener('click', handleClick)
      return () => {
        btnNotificacao.removeEventListener('click', handleClick)
      }
    }
  }, [])

  return (
    <>
      {/* topo - copiado de produtos.html */}
      <div className="barra-de-menu">
        <div className="logo">
          <a href="produtos.html"><img src="img/logo-reaproveitaai.png" alt="logo" /></a>
        </div>

        <div className="menu-principal">
          <a href="produtos.html">Produtos</a>
          <a href="faleconosco.html" id="btn-faleconosco">Fale Conosco</a>
        </div>

        <div className="acoes-topo">
          <div className="notificacao-wrapper">
            <button id="btn-notificacao" className="btn-notificacao" type="button">
              <i className="fa-solid fa-bell"></i>
            </button>

            <div id="caixa-notificacao" className="caixa-notificacao escondido">
              <h4>Ofertas para você</h4>
              <ul id="lista-notificacao"></ul>
            </div>
          </div>
          <a className="carrinho" href="carrinho.html">
            <i className="fa-solid fa-cart-shopping"></i>
            &nbsp; Carrinho
          </a>
        </div>

      </div>


      {/* conteudo */}
      <main className="container">

        {/* titulo */}
        <div className="page-title">

          <div>
            <p className="breadcrumb">
              Início / Carrinho
            </p>

            <h1>Meu carrinho</h1>
          </div>

          <span className="items-count">
            3 produtos
          </span>

        </div>


        <div className="cart-layout">


          {/* produtos do carrinho */}
          <section className="cart-products">

            <div className="cart-header">
              <span>Produto</span>
              <span>Quantidade</span>
              <span>Total</span>
            </div>


            {/* Pprodutos 1 */}
            <article className="product">

              <div className="product-info">

                <div className="product-image">
                  <img src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=300&q=80"
                    alt="Cesta de frutas" />
                </div>

                <div>
                  <h3>Cesta de Frutas</h3>

                  <p>
                    Frutas selecionadas
                  </p>

                  <span className="product-price">
                    R$ 24,90
                  </span>

                  <button className="remove" type="button">
                    <i className="fa-regular fa-trash-can"></i>
                    Remover
                  </button>
                </div>

              </div>


              <div className="quantity">

                <button type="button">
                  −
                </button>

                <span>1</span>

                <button type="button">
                  +
                </button>

              </div>


              <strong className="product-total">
                R$ 24,90
              </strong>

            </article>


            {/* produtos 2 */}
            <article className="product">

              <div className="product-info">

                <div className="product-image">
                  <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80"
                    alt="Salada" />
                </div>

                <div>
                  <h3>Salada Fresca</h3>

                  <p>
                    Ingredientes selecionados
                  </p>

                  <span className="product-price">
                    R$ 18,50
                  </span>

                  <button className="remove" type="button">
                    <i className="fa-regular fa-trash-can"></i>
                    Remover
                  </button>
                </div>

              </div>


              <div className="quantity">

                <button type="button">
                  −
                </button>

                <span>2</span>

                <button type="button">
                  +
                </button>

              </div>


              <strong className="product-total">
                R$ 37,00
              </strong>

            </article>


            {/* VOLTAR*/}
            <a href="#" className="continue-shopping">
              <i className="fa-solid fa-arrow-left"></i>
              Continuar comprando
            </a>

          </section>



          {/* RESUMO */}
          <aside className="order-summary">

            <h2>Resumo do pedido</h2>


            <div className="summary-line">
              <span>Subtotal</span>
              <strong>R$ 61,90</strong>
            </div>


            <div className="summary-line">
              <span>Entrega</span>
              <strong>R$ 5,00</strong>
            </div>


            <div className="coupon">

              <label htmlFor="coupon">
                Cupom de desconto
              </label>

              <div className="coupon-input">

                <input
                  type="text"
                  id="coupon"
                  placeholder="Digite seu cupom" />

                <button type="button">
                  Aplicar
                </button>

              </div>

            </div>


            <div className="divider"></div>


            <div className="total">

              <span>Total</span>

              <strong>
                R$ 66,90
              </strong>

            </div>


            <button className="checkout" type="button">

              Finalizar compra

              <i className="fa-solid fa-arrow-right"></i>

            </button>


            <div className="secure">

              <i className="fa-solid fa-shield-halved"></i>

              <div>
                <strong>Compra segura</strong>

                <p>
                  Seus dados estão protegidos.
                </p>
              </div>

            </div>

          </aside>

        </div>

      </main>


      {/* rodape - copiado de produtos.html */}
      <footer>
        <p>Todos os direitos reservados. © 2026 ReaproveitaAi</p>
      </footer>
    </>
  )
}

export default App