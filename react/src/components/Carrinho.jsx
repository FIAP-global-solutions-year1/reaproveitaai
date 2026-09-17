import { useState } from 'react'
import '../css/carrinho.css'

const ITENS_INICIAIS = [
  {
    id: 1,
    nome: 'Cesta de Frutas',
    descricao: 'Frutas selecionadas',
    preco: 24.90,
    quantidade: 1,
    imagem: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=300&q=80',
    alt: 'Cesta de frutas',
  },
  {
    id: 2,
    nome: 'Salada Fresca',
    descricao: 'Ingredientes selecionados',
    preco: 18.50,
    quantidade: 2,
    imagem: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80',
    alt: 'Salada',
  },
]

const ENTREGA = 5.00

function Carrinho({ onNavegar }) {
  const [itens, setItens] = useState(ITENS_INICIAIS)

  function incrementar(id) {
    setItens(prev =>
      prev.map(item => item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item)
    )
  }

  function decrementar(id) {
    setItens(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantidade: Math.max(1, item.quantidade - 1) } : item
      )
    )
  }

  function remover(id) {
    setItens(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
  const total = subtotal + ENTREGA

  const fmt = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <main className="container pagina-carrinho">

      <div className="page-title">
        <div>
          <p className="breadcrumb">Início / Carrinho</p>
          <h1>Meu carrinho</h1>
        </div>
        <span className="items-count">
          {itens.reduce((acc, i) => acc + i.quantidade, 0)} produto{itens.reduce((acc, i) => acc + i.quantidade, 0) !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="cart-layout">

        {/* Lista de produtos */}
        <section className="cart-products">

          <div className="cart-header">
            <span>Produto</span>
            <span>Quantidade</span>
            <span>Total</span>
          </div>

          {itens.length === 0 ? (
            <p style={{ padding: '24px 0', color: '#999' }}>Seu carrinho está vazio.</p>
          ) : (
            itens.map(item => (
              <article className="product" key={item.id}>

                <div className="product-info">
                  <div className="product-image">
                    <img src={item.imagem} alt={item.alt} />
                  </div>
                  <div>
                    <h3>{item.nome}</h3>
                    <p>{item.descricao}</p>
                    <span className="product-price">{fmt(item.preco)}</span>
                    <button className="remove" type="button" onClick={() => remover(item.id)}>
                      <i className="fa-regular fa-trash-can"></i>
                      Remover
                    </button>
                  </div>
                </div>

                <div className="quantity">
                  <button type="button" onClick={() => decrementar(item.id)}>-</button>
                  <span>{item.quantidade}</span>
                  <button type="button" onClick={() => incrementar(item.id)}>+</button>
                </div>

                <strong className="product-total">{fmt(item.preco * item.quantidade)}</strong>

              </article>
            ))
          )}

          <button
            type="button"
            className="continue-shopping"
            onClick={() => onNavegar('produtos')}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <i className="fa-solid fa-arrow-left"></i>
            Continuar comprando
          </button>

        </section>

        {/* Resumo do pedido */}
        <aside className="order-summary">

          <h2>Resumo do pedido</h2>

          <div className="summary-line">
            <span>Subtotal</span>
            <strong>{fmt(subtotal)}</strong>
          </div>

          <div className="summary-line">
            <span>Entrega</span>
            <strong>{fmt(ENTREGA)}</strong>
          </div>

          <div className="coupon">
            <label htmlFor="coupon">Cupom de desconto</label>
            <div className="coupon-input">
              <input type="text" id="coupon" placeholder="Digite seu cupom" />
              <button type="button">Aplicar</button>
            </div>
          </div>

          <div className="divider"></div>

          <div className="total">
            <span>Total</span>
            <strong>{fmt(total)}</strong>
          </div>

          <button className="checkout" type="button">
            Finalizar compra
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          <div className="secure">
            <i className="fa-solid fa-shield-halved"></i>
            <div>
              <strong>Compra segura</strong>
              <p>Seus dados estão protegidos.</p>
            </div>
          </div>

        </aside>

      </div>

    </main>
  )
}

export default Carrinho
