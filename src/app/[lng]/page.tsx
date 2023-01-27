'use client'

import { i18nConfig } from '@/i18n'
import { useLingui } from '@lingui/react'
import { Inter } from '@next/font/google'
import { setCookie } from 'cookies-next'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const LanguageSwitcher: React.FC = () => {
  const { locales } = i18nConfig
  const pathName = usePathname()

  const handleLocaleChange = useCallback((locale: string) => {
    setCookie('NEXT_LOCALE', locale)
  }, [])

  const redirectedPathName = useCallback(
    (locale: string) => {
      if (!pathName) return '/'
      const segments = pathName.split('/')
      segments[1] = locale
      return segments.join('/')
    },
    [pathName]
  )
  return (
    <div className="flex gap-2">
      {locales.map((locale: string) => (
        <Link
          key={locale}
          href={`${redirectedPathName(locale)}`}
          onClick={() => handleLocaleChange(locale)}
          className="px-2 rounded-sm hover:bg-slate-200 dark:hover:bg-slate-500"
        >
          {locale}
        </Link>
      ))}
    </div>
  )
}

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  return (
    <div className="flex gap-2">
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? '🌙' : '🌞'}
      </button>
    </div>
  )
}

export default function Home() {
  const { i18n } = useLingui()

  const [apiI18n, setApiI18n] = useState()

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/hello')
      const json = await res.json()
      setApiI18n(json)
    })()
  }, [])

  return (
    <main className={inter.className}>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-2">
          <h2 className="text-2xl font-bold">NEXT</h2>
          <div className="flex gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-screen max-w-md gap-4 mx-auto">
          <h1 className="text-6xl font-bold">
            {/*i18n*/ i18n._('Hello World')}
          </h1>
          <p className="text-center">
            Over the past few months, the Next.js team has been working to
            integrate Next.js with React Server Components and React 18
            features. These new features are now available to try in the new app
            directory.
          </p>
          {JSON.stringify(apiI18n)}
        </div>
      </div>
    </main>
  )
}
