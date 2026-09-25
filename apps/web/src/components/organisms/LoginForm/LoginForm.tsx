import { useState, type FormEvent } from 'react'
import Button from '../../atoms/Button'
import Checkbox from '../../atoms/Checkbox'
import ArrowRightIcon from '../../atoms/icons/ArrowRightIcon'
import TextLink from '../../atoms/TextLink'
import FormField from '../../molecules/FormField'

export interface LoginFormValues {
  email: string
  senha: string
  lembrar: boolean
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [lembrar, setLembrar] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({ email, senha, lembrar })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField
        label="Email ou usuário"
        placeholder="usuario123"
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
      <div className="flex items-center justify-between">
        <Checkbox label="Lembrar-me" checked={lembrar} onChange={setLembrar} />
        <TextLink to="/esqueci-senha">Esqueci a senha</TextLink>
      </div>
      <Button type="submit" icon={<ArrowRightIcon />}>
        Login
      </Button>
    </form>
  )
}

export default LoginForm
