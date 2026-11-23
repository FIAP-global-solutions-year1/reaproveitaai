import { useState } from 'react'
import './Endereco.css'

const ENDERECO_VAZIO = { rua: '', numero: '', bairro: '', cidade: '' }

// Quando o CEP fica com 8 números, busca no ViaCEP e preenche rua, bairro e cidade
function Endereco() {
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState(ENDERECO_VAZIO)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  async function buscarCep(numeros) {
    setCarregando(true)
    setErro('')

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${numeros}/json/`)
      const dados = await resposta.json()

      if (dados.erro) {
        setEndereco(ENDERECO_VAZIO)
        setErro('CEP não encontrado.')
        return
      }

      setEndereco(atual => ({
        ...atual,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: `${dados.localidade} - ${dados.uf}`,
      }))
    } catch {
      setErro('Não foi possível buscar o CEP. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  function handleCep(e) {
    const numeros = e.target.value.replace(/\D/g, '').slice(0, 8)
    setCep(numeros.length > 5 ? `${numeros.slice(0, 5)}-${numeros.slice(5)}` : numeros)

    if (numeros.length === 8) buscarCep(numeros)
  }

  function handleCampo(e) {
    setEndereco(atual => ({ ...atual, [e.target.name]: e.target.value }))
  }

  return (
    <fieldset className="endereco">
      <legend>Endereço de entrega</legend>

      <label htmlFor="cep">CEP</label>
      <input
        id="cep"
        inputMode="numeric"
        placeholder="00000-000"
        value={cep}
        onChange={handleCep}
      />
      {carregando && <p className="endereco-msg">Buscando endereço...</p>}
      {erro && <p className="endereco-msg erro">{erro}</p>}

      <label htmlFor="rua">Rua</label>
      <input id="rua" name="rua" value={endereco.rua} onChange={handleCampo} />

      <div className="endereco-linha">
        <div>
          <label htmlFor="numero">Número</label>
          <input id="numero" name="numero" value={endereco.numero} onChange={handleCampo} />
        </div>
        <div>
          <label htmlFor="bairro">Bairro</label>
          <input id="bairro" name="bairro" value={endereco.bairro} onChange={handleCampo} />
        </div>
      </div>

      <label htmlFor="cidade">Cidade</label>
      <input id="cidade" name="cidade" value={endereco.cidade} onChange={handleCampo} />
    </fieldset>
  )
}

export default Endereco
