import { useState } from 'react'
import '../css/login.css'

// Tipos de usuário disponíveis no cadastro
const TIPOS_USUARIO = ['Consumidor', 'Lojista', 'ONG']

function Login({ onNavegar }) {
  // Alterna entre 'entrar' e 'cadastro'
  const [abaAtiva, setAbaAtiva] = useState('entrar')

  // Campos do formulário de login
  const [loginEmail, setLoginEmail] = useState('')
  const [loginSenha, setLoginSenha] = useState('')

  // Campos do formulário de cadastro
  const [tipoUsuario, setTipoUsuario] = useState('Consumidor')
  const [seletorAberto, setSeletorAberto] = useState(false)
  const [cadNome, setCadNome] = useState('')
  const [cadEmail, setCadEmail] = useState('')
  const [cadCpf, setCadCpf] = useState('')
  const [cadCnpj, setCadCnpj] = useState('')
  const [cadSenha, setCadSenha] = useState('')

  // CPF visível apenas para Consumidor; CNPJ para Lojista e ONG
  const exibeCpf = tipoUsuario === 'Consumidor'
  const exibeCnpj = tipoUsuario === 'Lojista' || tipoUsuario === 'ONG'

  function handleLogin(e) {
    e.preventDefault()
    onNavegar('produtos')
  }

  function handleCadastro(e) {
    e.preventDefault()
    onNavegar('produtos')
  }

  function selecionarTipo(tipo) {
    setTipoUsuario(tipo)
    setSeletorAberto(false)
    // Limpa os campos de documento ao trocar tipo
    setCadCpf('')
    setCadCnpj('')
  }

  return (
    <>
      <header className="cabecalho-login">
        <section id="logo-header">
          <img src="/img/logo-reaproveitaai.png" alt="logo-reaproveita-ai" />
          <p>Vídeo de apresentação do nosso MVP:</p>
          <a href="https://youtu.be/A0_BuhK70x4" target="_blank" rel="noreferrer">
            Vídeo Pitch (Clique aqui)
          </a>
        </section>
      </header>

      <main className="pagina-login">
        <div id="card-acesso">

          {/* Seletor Entrar / Criar conta */}
          <section id="seletor-login">
            <button
              type="button"
              id="btn-entrar"
              onClick={() => setAbaAtiva('entrar')}
            >
              <p className={abaAtiva === 'entrar' ? 'selecionado' : ''}>Entrar</p>
            </button>
            <button
              type="button"
              id="btn-cadastro"
              onClick={() => setAbaAtiva('cadastro')}
            >
              <p className={abaAtiva === 'cadastro' ? 'selecionado' : ''}>Criar conta</p>
            </button>
          </section>

          <div id="campos-login-e-cadastro">

            {/* Formulário de Login */}
            {abaAtiva === 'entrar' && (
              <form id="campo-login" className="card-alinhamento" onSubmit={handleLogin}>
                <p>E-mail</p>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                />
                <p>Senha</p>
                <input
                  type="password"
                  placeholder="Sua senha"
                  required
                  value={loginSenha}
                  onChange={e => setLoginSenha(e.target.value)}
                />
                <br />
                <input type="submit" value="Entrar" id="btn-login-entrar" />
              </form>
            )}

            {/* Formulário de Cadastro */}
            {abaAtiva === 'cadastro' && (
              <form id="campo-cadastro" className="card-alinhamento" onSubmit={handleCadastro}>

                <p>Tipo de cadastro</p>

                {/* Seletor customizado de tipo de usuário */}
                <div className="caixa-seletor">
                  <button
                    type="button"
                    className="gatilho-seletor"
                    id="btn-tipo-usuario"
                    onClick={() => setSeletorAberto(prev => !prev)}
                  >
                    <p className="texto-seletor">{tipoUsuario}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C675D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="setinha-customizada">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {seletorAberto && (
                    <ul className="opcoes-seletor ativo">
                      {TIPOS_USUARIO.map(tipo => (
                        <li
                          key={tipo}
                          className="opcao-customizada"
                          onClick={() => selecionarTipo(tipo)}
                        >
                          {tipo}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <p>Nome completo</p>
                <input
                  type="text"
                  placeholder="Seu nome"
                  required
                  value={cadNome}
                  onChange={e => setCadNome(e.target.value)}
                />

                <p>E-mail</p>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={cadEmail}
                  onChange={e => setCadEmail(e.target.value)}
                />

                {/* Exibe CPF ou CNPJ conforme tipo selecionado */}
                {exibeCpf && (
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
                      value={cadCpf}
                      onChange={e => setCadCpf(e.target.value)}
                    />
                  </section>
                )}

                {exibeCnpj && (
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
                      value={cadCnpj}
                      onChange={e => setCadCnpj(e.target.value)}
                    />
                  </section>
                )}

                <p>Senha</p>
                <input
                  type="password"
                  placeholder="Crie uma senha"
                  required
                  value={cadSenha}
                  onChange={e => setCadSenha(e.target.value)}
                />
                <br />
                <input type="submit" value="Criar conta" id="btn-cadastro-criar" />

              </form>
            )}

          </div>
        </div>
      </main>
    </>
  )
}

export default Login
