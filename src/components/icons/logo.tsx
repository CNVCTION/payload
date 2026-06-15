import clsx from 'clsx'
import React from 'react'

export function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      aria-label="CardVault logo"
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('h-6 w-6', props.className)}
    >
      <rect fill="currentColor" height="22" rx="2" width="16" x="8" y="5" />
      <path d="M13 5v22M11 5h2v22h-2z" fill="white" />
      <rect fill="white" height="8" rx="1" width="10" x="11" y="8" />
      <path
        d="M14 12.5l1.5-1.5 1.5 1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <circle cx="16" cy="12.5" fill="currentColor" r="1" />
      <circle cx="12.5" cy="17" fill="white" r="1" />
      <circle cx="16" cy="17" fill="currentColor" r="1" />
      <circle cx="19.5" cy="17" fill="white" r="1" />
      <rect fill="currentColor" height="2" rx=".5" width="4" x="14" y="21" />
    </svg>
  )
}
