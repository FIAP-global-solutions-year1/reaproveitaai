import { Link } from 'react-router-dom'
import './index.css'

const fmt = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const fmtData = (data) => new Date(data).toLocaleString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

function ReservasRoute({ reservas }) {
  const itensSalvos = reservas.reduce(
    (acc, reserva) => acc + reserva.itens.reduce((soma, item) => soma + item.quantidade, 0),
    0
  )
  const totalReservado = reservas.reduce((acc, reserva) => acc + reserva.total, 0)

  return (
    <main className="pagina-reservas">
      <div className="reservas-topo">
        <p className="reservas-breadcrumb">Início / Minhas reservas</p>
        <h1>Minhas reservas</h1>
      </div>

      <section className="reservas-resumo" aria-label="Resumo das reservas">
        <div className="resumo-card destaque">
          <i className="fa-solid fa-leaf"></i>
          <div>
            <strong>{itensSalvos}</strong>
            <span>{itensSalvos === 1 ? 'item salvo do desperdício' : 'itens salvos do desperdício'}</span>
          </div>
        </div>
        <div className="resumo-card">
          <i className="fa-solid fa-ticket"></i>
          <div>
            <strong>{reservas.length}</strong>
            <span>{reservas.length === 1 ? 'reserva feita' : 'reservas feitas'}</span>
          </div>
        </div>
        <div className="resumo-card">
          <i className="fa-solid fa-wallet"></i>
          <div>
            <strong>{fmt(totalReservado)}</strong>
            <span>total reservado</span>
          </div>
        </div>
      </section>

      {reservas.length === 0 ? (
        <section className="reservas-vazio">
          <p>Você ainda não tem reservas.</p>
          <Link to="/produtos" className="reservas-link">Ver produtos disponíveis</Link>
        </section>
      ) : (
        <section className="reservas-lista">
          {reservas.map(reserva => (
            <article className="reserva-card" key={reserva.id}>
              <header className="reserva-cabecalho">
                <div>
                  <span className="reserva-rotulo">Voucher</span>
                  <strong className="reserva-codigo">{reserva.codigo}</strong>
                </div>
                <time className="reserva-data" dateTime={new Date(reserva.data).toISOString()}>
                  {fmtData(reserva.data)}
                </time>
              </header>

              <ul className="reserva-itens">
                {reserva.itens.map(item => (
                  <li key={item.id}>
                    <img src={item.imagem} alt={item.alt} />
                    <div className="reserva-item-info">
                      <strong>{item.nome}</strong>
                      <span>{item.loja}</span>
                    </div>
                    <span className="reserva-item-qtd">
                      {item.quantidade} × {fmt(item.preco)}
                    </span>
                  </li>
                ))}
              </ul>

              <footer className="reserva-rodape">
                <span>Total da reserva</span>
                <strong>{fmt(reserva.total)}</strong>
              </footer>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default ReservasRoute
