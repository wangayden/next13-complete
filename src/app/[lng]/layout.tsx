import '@/app/globals.css'
import { i18nConfig } from '@/i18n'
import { Providers } from '@/providers'

export async function generateStaticParams() {
  return i18nConfig.locales.map((lng: string) => ({ lng }))
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  return (
    <html lang={lng}>
      <head />
      <body>
        <Providers locale={lng}>{children}</Providers>
      </body>
    </html>
  )
}
