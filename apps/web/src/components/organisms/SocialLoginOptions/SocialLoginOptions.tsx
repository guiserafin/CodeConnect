import Divider from '../../atoms/Divider'
import SocialLoginButton from '../../molecules/SocialLoginButton'

export type SocialProvider = 'github' | 'google'

interface SocialLoginOptionsProps {
  onSocialLogin: (provider: SocialProvider) => void
}

function SocialLoginOptions({ onSocialLogin }: SocialLoginOptionsProps) {
  return (
    <div className="flex flex-col gap-4">
      <Divider>ou entre com outras contas</Divider>
      <div className="flex gap-4">
        <SocialLoginButton
          label="Github"
          iconSrc="/Github.png"
          onClick={() => onSocialLogin('github')}
        />
        <SocialLoginButton
          label="Gmail"
          iconSrc="/Google.png"
          onClick={() => onSocialLogin('google')}
        />
      </div>
    </div>
  )
}

export default SocialLoginOptions
