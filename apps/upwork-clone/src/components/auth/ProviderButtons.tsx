/* Bordered pill buttons for third-party sign-in providers. */

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3.01h3.87c2.26-2.09 3.56-5.17 3.56-8.83z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3.01c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1 0-4.55V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.1C6.22 6.88 8.87 4.77 12 4.77z"
      />
    </svg>
  )
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" fill="#1f1f1f" className="h-5 w-5" aria-hidden="true">
      <path d="M16.7 12.9c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1.9-4 2.4-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.7-3.9zM14.3 5.6c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.5z" />
    </svg>
  )
}

const buttonClass =
  'flex w-full items-center justify-center gap-3 rounded-full border border-[#9aaa97] py-3 text-[15px] font-semibold text-[#1f1f1f] transition-colors hover:border-[#1f1f1f] hover:bg-[#f7faf7]'

export function GoogleButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className={buttonClass}>
      <GoogleMark />
      Continue with Google
    </button>
  )
}

export function AppleButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className={buttonClass}>
      <AppleMark />
      Continue with Apple
    </button>
  )
}
