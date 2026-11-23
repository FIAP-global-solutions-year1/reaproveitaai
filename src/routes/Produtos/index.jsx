import { useEffect, useState } from 'react'
import './index.css'
import PRODUTOS from '../../data/produtos.json'

const CATEGORIAS = ['Bebidas', 'Doces', 'Praticidade']

// Tira acento e deixa minúsculo, assim "pao" também acha "Pão de mel"
function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

const TEMPO_RESERVA = 7200

function formatarTempo(totalSegundos) {
  const horas = Math.floor(totalSegundos / 3600)
  const minutos = Math.floor((totalSegundos % 3600) / 60)
  const segundos = totalSegundos % 60
  const pad = n => String(n).padStart(2, '0')
  return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`
}

function horarioDeResgate(totalSegundos) {
  const limite = new Date(Date.now() + totalSegundos * 1000)
  return limite.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function CardProduto({ produto, onReservar }) {
  return (
    <div className="card">
      <div className="imagem">
        <img src={produto.img} alt={produto.nome} />
      </div>
      <div className="info">
        <h3>{produto.nome}</h3>
        <p className="preco">{produto.preco}</p>
        <p><i className="fa-solid fa-store"></i> {produto.loja}</p>
        <p><i className="fa-solid fa-location-dot"></i> {produto.distancia}</p>
        <div className="botoes-card">
          <button className="btn-reservar" type="button" onClick={() => onReservar(produto)}>
            Reservar
          </button>
        </div>
      </div>
    </div>
  )
}

function ProdutosRoute({ onAdicionarAoCarrinho, onNotificar }) {
  const [modalAberto, setModalAberto] = useState(false)
  const [tempo, setTempo] = useState(TEMPO_RESERVA)
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  // Filtra pela categoria e pela busca, e esconde a seção que ficar vazia
  const secoes = CATEGORIAS
    .filter(cat => categoria === 'Todas' || cat === categoria)
    .map(cat => ({
      nome: cat,
      produtos: PRODUTOS.filter(p => p.categoria === cat && normalizar(p.nome).includes(normalizar(busca))),
    }))
    .filter(secao => secao.produtos.length > 0)

  useEffect(() => {
    if (!modalAberto) return

    const intervalo = setInterval(() => {
      setTempo(t => {
        if (t <= 1) {
          clearInterval(intervalo)
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(intervalo)
  }, [modalAberto])

  function handleReservar(produto) {
    setTempo(TEMPO_RESERVA)
    setModalAberto(true)
    onAdicionarAoCarrinho(produto)
    onNotificar({
      tipo: 'reserva',
      titulo: 'Reserva confirmada',
      descricao: `${produto.nome} em ${produto.loja}. Retire até ${horarioDeResgate(TEMPO_RESERVA)}.`,
    })
  }

  function fecharModal() {
    setModalAberto(false)
    setTempo(TEMPO_RESERVA)
  }

  return (
    <>
      <div className="banner"></div>

      <div className="barra-de-filtro">
        <section id="menu-filtro">
          <input
            type="search"
            className="busca-produtos"
            placeholder="Buscar produto..."
            aria-label="Buscar produto pelo nome"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          <p>Filtro: &nbsp;</p>
          {['Todas', ...CATEGORIAS].map(cat => (
            <button
              key={cat}
              type="button"
              className={cat === categoria ? 'ativo' : ''}
              aria-pressed={cat === categoria}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </section>
      </div>

      <div className="secao-master">
        {secoes.map(({ nome, produtos }) => (
          <div className="secao" id={normalizar(nome)} key={nome}>
            <h2>{nome}</h2>
            <div className="cards">
              {produtos.map(p => <CardProduto key={p.id} produto={p} onReservar={handleReservar} />)}
            </div>
          </div>
        ))}

        {secoes.length === 0 && (
          <p className="sem-resultados">Nenhum produto encontrado para "{busca}".</p>
        )}
      </div>

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-conteudo" onClick={e => e.stopPropagation()}>
            <button className="modal-btn-fechar" type="button" onClick={fecharModal}>×</button>
            <div className="modal-icone-sucesso">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h3 className="modal-titulo">Reserva confirmada!</h3>
            <p className="modal-texto">Sua reserva foi feita com sucesso. A validade do voucher expira em:</p>
            <div className="modal-cronometro">{formatarTempo(tempo)}</div>
            <img className="modal-qrcode" src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=ReaproveitaAi" alt="QR Code da reserva" />
            <p className="modal-texto-voucher">Voucher válido até {horarioDeResgate(tempo)}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default ProdutosRoute
