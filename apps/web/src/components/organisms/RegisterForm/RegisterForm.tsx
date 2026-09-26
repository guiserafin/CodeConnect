import { useState, type FormEvent } from 'react'
import Button from '../../atoms/Button'
import Checkbox from '../../atoms/Checkbox'
import ArrowRightIcon from '../../atoms/icons/ArrowRightIcon'
import FormField from '../../molecules/FormField'

export interface RegisterFormValues {
  nome: string
  email: string
  senha: string
  lembrar: boolean
}

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void
}

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [lembrar, setLembrar] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({ nome, email, senha, lembrar })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField
        label="Nome"
        placeholder="Nome completo"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
        required
      />
      <FormField
        label="Email"
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <FormField
        label="Senha"
        type="password"
        placeholder="******"
        value={senha}
        onChange={(event) => setSenha(event.target.value)}
        required
      />
      <Checkbox label="Lembrar-me" checked={lembrar} onChange={setLembrar} />
      <Button type="submit" icon={<ArrowRightIcon />}>
        Cadastrar
      </Button>
    </form>
  )
}

export default RegisterForm
