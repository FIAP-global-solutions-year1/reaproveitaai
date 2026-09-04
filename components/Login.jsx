import { useState } from 'react'
import '../css/login.css'
 
const Login = ({ setPaginaAtual }) => {
  const [aba, setAba] = useState('entrar')
 
  // controla o dropdown de tipo de usuário (Consumidor / Lojista / ONG)
  const [seletorAberto, setSeletorAberto] = useState(false)
  const [tipoUsuario, setTipoUsuario] = useState('usuario1')
 
  const rotulosTipoUsuario = {
    usuario1: 'Consumidor',
    usuario2: 'Lojista',
    usuario3: 'ONG',
  }
 
  const selecionarTipoUsuario = (tipo) => {
    setTipoUsuario(tipo)
    setSeletorAberto(false)
  }
 
  // ao logar/cadastrar, leva o usuário para a página de produtos
  const handleEntrar = (e) => {
    e.preventDefault()
    if (setPaginaAtual) setPaginaAtual('produtos')
  }
 
  const handleCadastrar = (e) => {
    e.preventDefault()
    if (setPaginaAtual) setPaginaAtual('produtos')
  }
 
  return (
    <>
      <header>
        <section id="logo-header">
          <img src="img/logo-reaproveitaai.png" alt="logo-reaproveita-ai" />
          <p>Vídeo de apresentação do nosso MVP:</p>
          <a href="https://youtu.be/A0_BuhK70x4" target="_blank" rel="noreferrer">
            Vídeo Pitch (Clique aqui)
          </a>
        </section>
      </header>
 
      <main>
        <div id="card-acesso">
          <section id="seletor-login">
            <button type="button" id="btn-entrar" onClick={() => setAba('entrar')}>
              <p className={aba === 'entrar' ? 'selecionado' : ''}>Entrar</p>
            </button>
            <button type="button" id="btn-cadastro" onClick={() => setAba('cadastro')}>
              <p className={aba === 'cadastro' ? 'selecionado' : ''}>Criar conta</p>
            </button>
          </section>
 
          <div id="campos-login-e-cadastro">
            {/* formulário de login */}
            <form
              id="campo-login"
              className={`card-alinhamento ${aba !== 'entrar' ? 'desativado' : ''}`}
              onSubmit={handleEntrar}
            >
              <p>E-mail</p>
              <input type="email" placeholder="seu@email.com" required />
              <p>Senha</p>
              <input type="password" placeholder="Sua senha" required />
              <br />
              <input type="submit" value="Entrar" id="btn-login-entrar" />
            </form>
 
            {/* formulário de cadastro */}
            <form
              id="campo-cadastro"
              className={`card-alinhamento ${aba !== 'cadastro' ? 'desativado' : ''}`}
              onSubmit={handleCadastrar}
            >
              <p>Tipo de cadastro</p>
              <div className="caixa-seletor">
                <button
                  type="button"
                  className="gatilho-seletor"
                  id="btn-tipo-usuario"
                  onClick={() => setSeletorAberto(!seletorAberto)}
                >
                  <p className="texto-seletor">{rotulosTipoUsuario[tipoUsuario]}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5C675D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="setinha-customizada"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
 
                <ul className={`opcoes-seletor ${seletorAberto ? 'ativo' : ''}`}>
                  <li
                    className="opcao-customizada"
                    data-value="usuario1"
                    onClick={() => selecionarTipoUsuario('usuario1')}
                  >
                    Consumidor
                  </li>
                  <li
                    className="opcao-customizada"
                    data-value="usuario2"
                    onClick={() => selecionarTipoUsuario('usuario2')}
                  >
                    Lojista
                  </li>
                  <li
                    className="opcao-customizada"
                    data-value="usuario3"
                    onClick={() => selecionarTipoUsuario('usuario3')}
                  >
                    ONG
                  </li>
                </ul>
              </div>
 
              <p>Nome completo</p>
              <input type="text" placeholder="Seu nome" required />
 
              <p>E-mail</p>
              <input type="email" placeholder="seu@email.com" required />
 
              {tipoUsuario === 'usuario1' ? (
                <section id="section-cadastro-cpf" className="active">
                  <p>CPF</p>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    id="section-cadastro-cpf1"
                    required
                    minLength={14}
                    maxLength={14}
                    pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                    title="O CPF deve estar no formato 000.000.000-00"
                  />
                </section>
              ) : (
                <section id="section-cadastro-cnpj">
                  <p>CNPJ</p>
                  <input
                    type="text"
                    placeholder="00.000.000/0000-00"
                    id="section-cadastro-cnpj1"
                    required
                    minLength={18}
                    maxLength={18}
                    pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
                    title="O CNPJ deve estar no formato 00.000.000/0000-00"
                  />
                </section>
              )}
 
              <p>Senha</p>
              <input type="password" placeholder="Crie uma senha" required />
              <br />
              <input type="submit" value="Criar conta" id="btn-cadastro-criar" />
            </form>
          </div>
        </div>
      </main>
 
      <footer>
        <p>Todos os direitos reservados. © 2026 ReaproveitaAi</p>
      </footer>
    </>
  )
}
 
export default Login