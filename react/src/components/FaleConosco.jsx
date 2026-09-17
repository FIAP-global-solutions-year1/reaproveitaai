import { useState } from 'react'
import '../css/faleconosco.css'

const MAX_MENSAGEM = 500

function FaleConosco() {
  // Campos controlados do formulário
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [assunto, setAssunto] = useState('')
  const [mensagem, setMensagem] = useState('')

  // Mensagem de feedback após envio
  const [enviado, setEnviado] = useState(false)

  // Valida nome completo: mínimo 2 palavras, cada uma com ≥ 2 letras
  function nomeValido(valor) {
    const partes = valor.trim().split(' ').filter(p => p !== '')
    return (
      partes.length >= 2 &&
      partes[0].length >= 2 &&
      partes[1].length >= 2
    )
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!nomeValido(nome)) {
      alert('Por favor, insira seu nome e sobrenome (mínimo 2 letras cada).')
      return
    }

    if (mensagem.length > MAX_MENSAGEM) {
      alert('A mensagem pode ter no máximo 500 caracteres.')
      return
    }

    alert(`Mensagem enviada com sucesso, ${nome}! Nossa equipe retornará o contato em breve.`)

    // Limpa o formulário
    setNome('')
    setEmail('')
    setAssunto('')
    setMensagem('')
    setEnviado(true)
  }

  return (
    <main className="pagina-contato">
      <section className="card-contato">

        <h1>Fale conosco</h1>

        <p className="descricao">Entre em contato com nossa equipe.</p>

        <form id="formContato" className="formulario-contato" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Nome"
            required
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <select
            required
            value={assunto}
            onChange={e => setAssunto(e.target.value)}
          >
            <option value="" disabled>Escolha o assunto...</option>
            <option value="Dúvida">Dúvida</option>
            <option value="Relatar Problema de Reserva">Relatar Problema de Reserva</option>
            <option value="Suporte Técnico">Suporte Técnico</option>
          </select>

          <textarea
            placeholder="Mensagem"
            required
            minLength={20}
            maxLength={MAX_MENSAGEM}
            value={mensagem}
            onChange={e => setMensagem(e.target.value)}
          />

          {/* Contador de caracteres reativo */}
          <p>
            <span
              id="contador"
              style={{ color: mensagem.length >= MAX_MENSAGEM ? 'red' : 'inherit' }}
            >
              {mensagem.length}
            </span>/{MAX_MENSAGEM} caracteres
          </p>

          <button type="submit" id="btnEnviar">
            Enviar mensagem
            <span className="material-symbols-outlined">send</span>
          </button>

        </form>

      </section>
    </main>
  )
}

export default FaleConosco
