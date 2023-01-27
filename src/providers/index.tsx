'use client'

import { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { I18nProvider } from './I18nProvider'
import { ThemeProvider } from './ThemeProvider'

export const Providers: React.FC<
  PropsWithChildren<{
    locale: string
  }>
> = ({ children, locale }) => {
  return (
    <I18nProvider locale={locale}>
      <ThemeProvider>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            className: '!bg-gray-800 border !text-white !border-gray-700',
          }}
        />
      </ThemeProvider>
    </I18nProvider>
  )
}
