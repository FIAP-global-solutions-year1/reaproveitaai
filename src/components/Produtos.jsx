import { useState, useEffect } from 'react'
import '../css/produtos.css'

// =========================
// DADOS DO CATÁLOGO
// =========================

const BEBIDAS = [
  {
    id: 'b1',
    nome: 'Chás Naturais',
    preco: 'R$ 3,99',
    loja: 'Mercado Fresh',
    distancia: '2 km',
    img: 'https://superandreazza.com.br/wp-content/uploads/2023/07/melhores-chas-para-o-dia-a-dia-super-andreazza.jpg',
  },
  {
    id: 'b2',
    nome: 'Leite Integral',
    preco: 'R$ 5,49',
    loja: 'Mercado OBA',
    distancia: '1 km',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuQ-S_vz8W84H3j5Rt4Kn_vLBqQRCanwMVG2PiBgMw&s',
  },
  {
    id: 'b3',
    nome: 'Iogurte',
    preco: 'R$ 7,99',
    loja: 'Fresh Market',
    distancia: '4 km',
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
  },
  {
    id: 'b4',
    nome: 'Suco de laranja',
    preco: 'R$ 5,99',
    loja: 'Mercado do seu Zé',
    distancia: '9 km',
    img: 'https://cdn.casaeculinaria.com/wp-content/uploads/2023/11/14090813/Suco-de-laranja-1.webp',
  },
]

const DOCES = [
  {
    id: 'd1',
    nome: 'Bolo Chocolate',
    preco: 'R$ 9,99',
    loja: 'Doceria Cacau',
    distancia: '3 km',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
  },
  {
    id: 'd2',
    nome: 'Morangos',
    preco: 'R$ 6,99',
    loja: 'Frutas Brasil',
    distancia: '2 km',
    img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6',
  },
  {
    id: 'd3',
    nome: 'Brigadeiro',
    preco: 'R$ 1,99',
    loja: 'DOCES Festa',
    distancia: '4 km',
    img: 'https://guiadacozinha.com.br/wp-content/uploads/2018/10/brigadeiro-tradicional.jpg',
  },
  {
    id: 'd4',
    nome: 'Pão de mel',
    preco: 'R$ 4,99',
    loja: 'Juquinha Pães',
    distancia: '9 km',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxEXNCXoYHfELg7clawvfBmNEbrvK3P5p1lQ&s',
  },
]

const PRATICIDADE = [
  {
    id: 'p1',
    nome: 'Pães Frescos',
    preco: 'Grátis',
    loja: 'Carrefour',
    distancia: '500 m',
    img: 'https://www.alimentosindustrializados.com.br/wp-content/uploads/2023/04/paes-2.jpg',
  },
  {
    id: 'p2',
    nome: 'Ovos',
    preco: 'R$ 11,99',
    loja: 'Pão de Açúcar',
    distancia: '4 km',
    img: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03',
  },
  {
    id: 'p3',
    nome: 'Tilápia',
    preco: 'R$ 25,99',
    loja: 'Peixaria Central',
    distancia: '5 km',
    img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
  },
  {
    id: 'p4',
    nome: 'Pêssego',
    preco: 'R$ 11,99',
    loja: 'Pão de Açúcar',
    distancia: '4 km',
    img: 'https://www.estadao.com.br/resizer/v2/YOZ5P2VAGBGGFPJSUOYBJ2LVHE.jpg?quality=80&auth=36506d161c7bf26d39914b163f54d190d0ad6d4846424436ed6230747264ab9b&width=1075&height=527&focal=958,531',
  },
  {
    id: 'p5',
    nome: 'Abacaxi',
    preco: 'R$ 8,99',
    loja: 'Seu Zé Atacadão',
    distancia: '4 km',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmaOmXDOxHvf2_1ZR9t9fFF7mm9lLqkCTNvQ&s',
  },
  {
    id: 'p6',
    nome: 'Batata-doce',
    preco: 'R$ 3,99',
    loja: 'Taha Food',
    distancia: '8 km',
    img: 'https://www.estadao.com.br/resizer/v2/D7UTDTHHIJGFNI7Z4LGHTQH3FI.jpeg?auth=b3e4c4f2c84ab4086e5d39592060f43a0e3a6c32ac2fd42a171da3d348332c7c',
  },
  {
    id: 'p7',
    nome: 'Cenoura',
    preco: 'R$ 1,99',
    loja: 'Atacadão Marinalva',
    distancia: '2.6 km',
    img: 'https://wickbold.com.br/wp-content/uploads/2016/05/Quais-sao-os-beneficios-da-cenoura.jpg',
  },
  {
    id: 'p8',
    nome: 'Sopa',
    preco: 'Grátis',
    loja: 'Atacadão Marinalva',
    distancia: '2.6 km',
    img: 'https://www.giallozafferano.com.br/images/264-26469/sopa-de-macarrao-batatas-e-ervilhas_1200x800.jpg',
  },
]

// Tempo total da reserva em segundos (2 horas)
const TEMPO_RESERVA = 7200

function formatarTempo(totalSegundos) {
  const horas = Math.floor(totalSegundos / 3600)
  const minutos = Math.floor((totalSegundos % 3600) / 60)
  const segundos = totalSegundos % 60
  const pad = n => String(n).padStart(2, '0')
  return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`
}

// =========================
// SUB-COMPONENTE: Card
// =========================

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

// =========================
// COMPONENTE PRINCIPAL
// =========================

function Produtos({ onAdicionarAoCarrinho }) {
  const [modalAberto, setModalAberto] = useState(false)
  const [tempo, setTempo] = useState(TEMPO_RESERVA)

  // Cronômetro regressivo — só roda enquanto o modal está aberto
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

    // Cleanup obrigatório: evita vazamento de memória
    return () => clearInterval(intervalo)
  }, [modalAberto])

  function handleReservar(produto) {
    setTempo(TEMPO_RESERVA)   // reinicia o cronômetro a cada reserva
    setModalAberto(true)
    onAdicionarAoCarrinho(produto)
  }

  function fecharModal() {
    setModalAberto(false)
    setTempo(TEMPO_RESERVA)
  }

  return (
    <>
      {/* Banner */}
      <div className="banner"></div>

      {/* Filtro de categorias (scroll interno da página) */}
      <div className="barra-de-filtro">
        <section id="menu-filtro">
          <p>Filtro: &nbsp;</p>
          <a href="#bebidas">Bebidas</a>
          <a href="#doces">Doces</a>
          <a href="#praticidade">Praticidade</a>
        </section>
      </div>

      {/* Seções de produtos */}
      <div className="secao-master">

        <div className="secao" id="bebidas">
          <h2>Bebidas</h2>
          <div className="cards">
            {BEBIDAS.map(p => <CardProduto key={p.id} produto={p} onReservar={handleReservar} />)}
          </div>
        </div>

        <div className="secao" id="doces">
          <h2>Doces</h2>
          <div className="cards">
            {DOCES.map(p => <CardProduto key={p.id} produto={p} onReservar={handleReservar} />)}
          </div>
        </div>

        <div className="secao" id="praticidade">
          <h2>Praticidade para seu Dia</h2>
          <div className="cards">
            {PRATICIDADE.map(p => <CardProduto key={p.id} produto={p} onReservar={handleReservar} />)}
          </div>
        </div>

      </div>

      {/* Modal de Reserva — controlado por modalAberto */}
      {modalAberto && (
        <div
          className="modal-overlay"
          onClick={e => { if (e.target === e.currentTarget) fecharModal() }}
        >
          <div className="modal-conteudo">
            <button
              type="button"
              className="modal-btn-fechar"
              aria-label="Fechar"
              onClick={fecharModal}
            >
              &times;
            </button>
            <div className="modal-icone-sucesso">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h2 className="modal-titulo">Produto Reservado com Sucesso!</h2>
            <p className="modal-texto">
              Dirija-se ao estabelecimento para resgatar seu item. Tempo restante para o resgate:
            </p>
            <div className="modal-cronometro">
              {formatarTempo(tempo)}
            </div>
            <img
              className="modal-qrcode"
              src="img/qrcode-voucher.png"
              alt="QR Code do Voucher de Reserva"
            />
            <p className="modal-texto-voucher">Apresente este QR Code no estabelecimento</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Produtos
