import type { SVGProps } from 'react'

type WorkIllustrationProps = SVGProps<SVGSVGElement> & {
  showBackground?: boolean
}

export function WorkIllustration({ className, showBackground = true, 'aria-hidden': ariaHidden, 'aria-label': ariaLabel, ...props }: WorkIllustrationProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 400" role="img" aria-label={ariaHidden ? undefined : ariaLabel ?? 'Person with loose hair working at a laptop'} aria-hidden={ariaHidden} className={className} {...props}>
      {showBackground && <rect width="480" height="400" rx="24" fill="#DDD6FB" />}
      <circle cx="64" cy="84" r="5" fill="#5B4BC4" /><circle cx="420" cy="70" r="9" fill="none" stroke="#5B4BC4" strokeWidth="2" /><circle cx="400" cy="140" r="4" fill="#F4C03E" /><circle cx="96" cy="150" r="8" fill="none" stroke="#5B4BC4" strokeWidth="2" />
      <rect x="148" y="160" width="184" height="160" rx="46" fill="#4A3AA8" />
      <path d="M196 118C190 64 240 52 268 74C290 90 292 126 280 148C310 178 318 232 290 272C268 244 262 216 258 192L214 192C204 160 198 140 196 118Z" fill="#3B1F5E" />
      <path d="M178 312l8-92c3-24 22-38 46-40h16c24 2 43 16 46 40l8 92z" fill="#7C5CE0" />
      <rect x="230" y="150" width="20" height="34" rx="8" fill="#F4C7A1" /><ellipse cx="240" cy="124" rx="31" ry="35" fill="#F4C7A1" />
      <path d="M204 116C206 82 246 68 274 98C252 86 224 92 204 116Z" fill="#3B1F5E" /><path d="M204 124C190 168 192 218 166 262C206 240 218 196 216 150Z" fill="#3B1F5E" />
      <path d="M200 220l14 38" stroke="#7C5CE0" strokeWidth="28" strokeLinecap="round" /><path d="M280 220l-14 38" stroke="#7C5CE0" strokeWidth="28" strokeLinecap="round" />
      <path d="M164 314l12-72h128l12 72z" fill="#fff" /><circle cx="240" cy="278" r="9" fill="#F4C03E" /><path d="M146 314h188l16 14H130z" fill="#3B1F5E" />
      <rect x="64" y="328" width="352" height="12" rx="6" fill="#4A3AA8" /><path d="M384 328v-44l-18-30" fill="none" stroke="#4A3AA8" strokeWidth="6" strokeLinecap="round" /><path d="M350 244l32-14 14 22z" fill="#F4C03E" />
      <rect x="84" y="296" width="28" height="32" rx="5" fill="#EC5F93" /><path d="M98 296c-14-10-14-26-6-34 8 6 10 18 6 34zM98 296c14-10 18-22 12-32-10 4-14 16-12 32z" fill="#4A3AA8" />
    </svg>
  )
}
