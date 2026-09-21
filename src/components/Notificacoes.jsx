const ICONES = {
  reserva: 'fa-solid fa-circle-check',
  cancelada: 'fa-solid fa-circle-xmark',
}

const ICONE_PADRAO = 'fa-solid fa-bell'

function tempoRelativo(data) {
  const minutos = Math.floor((Date.now() - data) / 60000)

  if (minutos < 1) return 'agora'
  if (minutos < 60) return `há ${minutos} min`

  const horas = Math.floor(minutos / 60)
  if (horas < 24) return `há ${horas} h`

  return `há ${Math.floor(horas / 24)} d`
}

function Notificacoes({ notificacoes, onMarcarLida, onMarcarTodasLidas, onLimpar }) {
  const naoLidas = notificacoes.filter(n => !n.lida).length

  return (
    <div className="caixa-notificacao">

      <div className="topo-notificacao">
        <h4>Notificações</h4>
        {naoLidas > 0 && (
          <button type="button" className="acao-notificacao" onClick={onMarcarTodasLidas}>
            Marcar todas como lidas
          </button>
        )}
      </div>

      {notificacoes.length === 0 ? (
        <p className="notificacao-vazia">
          Nenhuma notificação por aqui. Reserve um produto para acompanhar o resgate.
        </p>
      ) : (
        <>
          <ul>
            {notificacoes.map(notificacao => (
              <li key={notificacao.id} className={notificacao.lida ? '' : 'nao-lida'}>
                <button
                  type="button"
                  className="item-notificacao"
                  onClick={() => onMarcarLida(notificacao.id)}
                >
                  <i className={ICONES[notificacao.tipo] ?? ICONE_PADRAO}></i>
                  <span className="texto-notificacao">
                    <strong>{notificacao.titulo}</strong>
                    <span className="descricao-notificacao">{notificacao.descricao}</span>
                    <span className="data-notificacao">{tempoRelativo(notificacao.data)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <button type="button" className="acao-notificacao limpar" onClick={onLimpar}>
            Limpar notificações
          </button>
        </>
      )}

    </div>
  )
}

export default Notificacoes
