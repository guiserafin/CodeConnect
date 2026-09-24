import ClipboardIcon from '../../components/atoms/icons/ClipboardIcon'
import AuthPrompt from '../../components/molecules/AuthPrompt'
import LoginForm, { type LoginFormValues } from '../../components/organisms/LoginForm'
import SocialLoginOptions, {
  type SocialProvider,
} from '../../components/organisms/SocialLoginOptions'
import AuthTemplate from '../../components/templates/AuthTemplate'

function handleSubmit(values: LoginFormValues) {
  console.info('login submit', values)
}

function handleSocialLogin(provider: SocialProvider) {
  console.info('social login', provider)
}

function LoginPage() {
  return (
    <AuthTemplate
      bannerSrc="/banner-login.png"
      bannerAlt="CodeConnect"
      title="Login"
      subtitle="Boas-vindas! Faça seu login."
    >
      <LoginForm onSubmit={handleSubmit} />
      <SocialLoginOptions onSocialLogin={handleSocialLogin} />
      <AuthPrompt
        question="Ainda não tem conta?"
        linkLabel="Crie seu cadastro!"
        to="/cadastro"
        icon={<ClipboardIcon />}
      />
    </AuthTemplate>
  )
}

export default LoginPage
