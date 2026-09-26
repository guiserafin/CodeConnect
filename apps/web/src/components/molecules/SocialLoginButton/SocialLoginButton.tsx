interface SocialLoginButtonProps {
  label: string
  iconSrc: string
  onClick: () => void
}

function SocialLoginButton({ label, iconSrc, onClick }: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-medium/40 px-4 py-2 text-xs text-offwhite transition hover:border-primary"
    >
      <img src={iconSrc} alt="" className="h-5 w-5" />
      {label}
    </button>
  )
}

export default SocialLoginButton
