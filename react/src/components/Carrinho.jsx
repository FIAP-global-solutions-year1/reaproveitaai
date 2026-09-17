import '../css/carrinho.css'

const ENTREGA = 5.00

function Carrinho({ itens, onAtualizarQuantidade, onRemover, onNavegar }) {
  const subtotal = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
  const entrega = itens.length > 0 ? ENTREGA : 0
  const total = subtotal + entrega

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
                    <button className="remove" type="button" onClick={() => onRemover(item.id)}>
                      <i className="fa-regular fa-trash-can"></i>
                      Remover
                    </button>
                  </div>
                </div>

                <div className="quantity">
                  <button type="button" onClick={() => onAtualizarQuantidade(item.id, item.quantidade - 1)}>-</button>
                  <span>{item.quantidade}</span>
                  <button type="button" onClick={() => onAtualizarQuantidade(item.id, item.quantidade + 1)}>+</button>
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
            <strong>{fmt(entrega)}</strong>
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
