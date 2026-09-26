import LoginIcon from '../../components/atoms/icons/LoginIcon'
import AuthPrompt from '../../components/molecules/AuthPrompt'
import RegisterForm, { type RegisterFormValues } from '../../components/organisms/RegisterForm'
import SocialLoginOptions, {
  type SocialProvider,
} from '../../components/organisms/SocialLoginOptions'
import AuthTemplate from '../../components/templates/AuthTemplate'

function handleSubmit({ nome, email, lembrar }: RegisterFormValues) {
  console.info('register submit', { nome, email, lembrar })
}

function handleSocialLogin(provider: SocialProvider) {
  console.info('social login', provider)
}

function RegisterPage() {
  return (
    <AuthTemplate
      bannerSrc="/banner-login.png"
      bannerAlt="CodeConnect"
      title="Cadastro"
      subtitle="Olá! Preencha seus dados."
    >
      <RegisterForm onSubmit={handleSubmit} />
      <SocialLoginOptions onSocialLogin={handleSocialLogin} />
      <AuthPrompt
        question="Já tem conta?"
        linkLabel="Faça seu login!"
        to="/login"
        icon={<LoginIcon />}
      />
    </AuthTemplate>
  )
}

export default RegisterPage
