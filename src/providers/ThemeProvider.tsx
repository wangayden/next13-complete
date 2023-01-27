import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </NextThemeProvider>
  )
}
