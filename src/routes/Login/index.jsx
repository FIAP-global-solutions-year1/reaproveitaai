import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './index.css'
import Footer from '../../components/layout/footer/Footer'

const TIPOS_USUARIO = ['Consumidor', 'Lojista', 'ONG']

const schemaLogin = yup.object({
  email: yup
    .string()
    .required('O e-mail é obrigatório.')
    .email('Digite um e-mail válido.'),
  senha: yup
    .string()
    .required('A senha é obrigatória.')
    .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
}).required()

function criarSchemaCadastro(tipoUsuario) {
  const exigeCpf = tipoUsuario === 'Consumidor'
  const exigeCnpj = tipoUsuario === 'Lojista' || tipoUsuario === 'ONG'

  return yup.object({
    nome: yup
      .string()
      .required('O nome completo é obrigatório.')
      .test('nome-sobrenome', 'Informe nome e sobrenome.', (valor) => {
        if (!valor) return true
        const partes = valor.trim().split(' ').filter((parte) => parte !== '')
        return partes.length >= 2 && partes[0].length >= 2 && partes[partes.length - 1].length >= 2
      }),
    email: yup
      .string()
      .required('O e-mail é obrigatório.')
      .email('Digite um e-mail válido.'),
    cpf: exigeCpf
      ? yup
          .string()
          .required('O CPF é obrigatório.')
          .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
            message: 'O CPF deve estar no formato 000.000.000-00.',
            excludeEmptyString: true,
          })
      : yup.string(),
    cnpj: exigeCnpj
      ? yup
          .string()
          .required('O CNPJ é obrigatório.')
          .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
            message: 'O CNPJ deve estar no formato 00.000.000/0000-00.',
            excludeEmptyString: true,
          })
      : yup.string(),
    senha: yup
      .string()
      .required('A senha é obrigatória.')
      .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  }).required()
}

function LoginRoute() {
  const [abaAtiva, setAbaAtiva] = useState('entrar')
  const [tipoUsuario, setTipoUsuario] = useState('Consumidor')
  const [seletorAberto, setSeletorAberto] = useState(false)
  const [usuarioCadastrado, setUsuarioCadastrado] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [loginSucesso, setLoginSucesso] = useState(false)

  const exibeCpf = tipoUsuario === 'Consumidor'
  const exibeCnpj = tipoUsuario === 'Lojista' || tipoUsuario === 'ONG'

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    setValue: setValueLogin,
  } = useForm({
    resolver: yupResolver(schemaLogin),
  })

  const {
    register: registerCadastro,
    handleSubmit: handleSubmitCadastro,
    formState: { errors: errorsCadastro },
    setValue: setValueCadastro,
  } = useForm({
    resolver: yupResolver(criarSchemaCadastro(tipoUsuario)),
  })

  function trocarAba(novaAba) {
    setAbaAtiva(novaAba)
    setFeedback(null)
    setLoginSucesso(false)
  }

  function selecionarTipo(tipo) {
    setTipoUsuario(tipo)
    setSeletorAberto(false)
    if (tipo === 'Consumidor') {
      setValueCadastro('cnpj', '')
    } else {
      setValueCadastro('cpf', '')
    }
  }

  function onSubmitCadastro(dados) {
    const novoUsuario = {
      tipo: tipoUsuario,
      nome: dados.nome.trim(),
      email: dados.email.trim(),
      cpf: exibeCpf ? dados.cpf : '',
      cnpj: exibeCnpj ? dados.cnpj : '',
      senha: dados.senha,
    }

    setUsuarioCadastrado(novoUsuario)
    setValueCadastro('nome', '')
    setValueCadastro('email', '')
    setValueCadastro('cpf', '')
    setValueCadastro('cnpj', '')
    setValueCadastro('senha', '')
    setValueLogin('email', novoUsuario.email)
    setValueLogin('senha', '')
    setLoginSucesso(false)
    setAbaAtiva('entrar')
    setFeedback({
      tipo: 'sucesso',
      texto: `Conta de ${novoUsuario.tipo} criada com sucesso para ${novoUsuario.nome}! Faça seu login abaixo.`,
    })
  }

  function onSubmitLogin(dados) {
    if (!usuarioCadastrado) {
      setLoginSucesso(false)
      setFeedback({
        tipo: 'erro',
        texto: 'Nenhum usuário cadastrado em memória. Crie uma conta antes de entrar.',
      })
      return
    }

    if (
      dados.email.trim() === usuarioCadastrado.email &&
      dados.senha === usuarioCadastrado.senha
    ) {
      setLoginSucesso(true)
      setFeedback({
        tipo: 'sucesso',
        texto: `Login realizado com sucesso! Bem-vindo(a), ${usuarioCadastrado.nome} (${usuarioCadastrado.tipo}).`,
      })
    } else {
      setLoginSucesso(false)
      setFeedback({
        tipo: 'erro',
        texto: 'E-mail ou senha incorretos. Verifique suas credenciais.',
      })
    }
  }

  return (
    <>
      <header className="cabecalho-login">
        <section id="logo-header">
          <img src="img/logo-reaproveitaai.png" alt="logo-reaproveita-ai" />
          <p>Vídeo de apresentação do nosso MVP:</p>
          <a href="https://youtu.be/v1AB85YM7iI" target="_blank" rel="noreferrer">
            Vídeo Pitch (Clique aqui)
          </a>
        </section>
      </header>

      <main className="pagina-login">
        <div id="card-acesso">
          <section id="seletor-login">
            <button
              type="button"
              id="btn-entrar"
              onClick={() => trocarAba('entrar')}
            >
              <p className={abaAtiva === 'entrar' ? 'selecionado' : ''}>Entrar</p>
            </button>
            <button
              type="button"
              id="btn-cadastro"
              onClick={() => trocarAba('cadastro')}
            >
              <p className={abaAtiva === 'cadastro' ? 'selecionado' : ''}>Criar conta</p>
            </button>
          </section>

          <div id="campos-login-e-cadastro">
            {feedback && (
              <div
                className={
                  feedback.tipo === 'sucesso'
                    ? 'msg-feedback msg-feedback-sucesso'
                    : 'msg-feedback msg-feedback-erro'
                }
              >
                <p>{feedback.texto}</p>
                {loginSucesso && (
                  <Link to="/produtos" className="link-acesso-produtos">
                    Ir para Produtos
                  </Link>
                )}
              </div>
            )}

            {abaAtiva === 'entrar' && (
              <form
                id="campo-login"
                className="card-alinhamento"
                onSubmit={handleSubmitLogin(onSubmitLogin)}
              >
                <p>E-mail</p>
                <input
                  type="text"
                  placeholder="seu@email.com"
                  {...registerLogin('email')}
                />
                <span className="msg-erro">{errorsLogin.email?.message}</span>

                <p>Senha</p>
                <input
                  type="password"
                  placeholder="Sua senha"
                  {...registerLogin('senha')}
                />
                <span className="msg-erro">{errorsLogin.senha?.message}</span>

                <br />
                <input type="submit" value="Entrar" id="btn-login-entrar" />
              </form>
            )}

            {abaAtiva === 'cadastro' && (
              <form
                id="campo-cadastro"
                className="card-alinhamento"
                onSubmit={handleSubmitCadastro(onSubmitCadastro)}
              >
                <p>Tipo de cadastro</p>

                <div className="caixa-seletor">
                  <button
                    type="button"
                    className="gatilho-seletor"
                    id="btn-tipo-usuario"
                    onClick={() => setSeletorAberto((prev) => !prev)}
                  >
                    <p className="texto-seletor">{tipoUsuario}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C675D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="setinha-customizada">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {seletorAberto && (
                    <ul className="opcoes-seletor ativo">
                      {TIPOS_USUARIO.map((tipo) => (
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
                  placeholder="Seu nome e sobrenome"
                  {...registerCadastro('nome')}
                />
                <span className="msg-erro">{errorsCadastro.nome?.message}</span>

                <p>E-mail</p>
                <input
                  type="text"
                  placeholder="seu@email.com"
                  {...registerCadastro('email')}
                />
                <span className="msg-erro">{errorsCadastro.email?.message}</span>

                {exibeCpf && (
                  <section id="section-cadastro-cpf" className="active">
                    <p>CPF</p>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      id="section-cadastro-cpf1"
                      {...registerCadastro('cpf')}
                    />
                    <span className="msg-erro">{errorsCadastro.cpf?.message}</span>
                  </section>
                )}

                {exibeCnpj && (
                  <section id="section-cadastro-cnpj">
                    <p>CNPJ</p>
                    <input
                      type="text"
                      placeholder="00.000.000/0000-00"
                      id="section-cadastro-cnpj1"
                      {...registerCadastro('cnpj')}
                    />
                    <span className="msg-erro">{errorsCadastro.cnpj?.message}</span>
                  </section>
                )}

                <p>Senha</p>
                <input
                  type="password"
                  placeholder="Crie uma senha (mín. 6 caracteres)"
                  {...registerCadastro('senha')}
                />
                <span className="msg-erro">{errorsCadastro.senha?.message}</span>

                <br />
                <input type="submit" value="Criar conta" id="btn-cadastro-criar" />
              </form>
            )}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default LoginRoute
