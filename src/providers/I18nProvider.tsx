import { i18n } from '@lingui/core'
import { I18nProvider as LinguiProvider } from '@lingui/react'
import * as plurals from 'make-plural/plurals'
import { PropsWithChildren, useEffect } from 'react'

export type LOCALES = keyof typeof plurals
export type TransType = (
  message: string,
  values?: Record<string, unknown>
) => JSX.Element

export const I18nProvider: React.FC<
  PropsWithChildren & {
    locale: string
  }
> = ({ children, locale }) => {
  useEffect(() => {
    if (!locale) return
    ;(async () => {
      i18n.loadLocaleData(locale, {
        plurals: plurals[locale as LOCALES],
      })
      const { messages } = await import(
        `@lingui/loader!./../../locale/${locale}.json?raw-lingui`
      )
      i18n.load(locale as string, messages)
      i18n.activate(locale as string)
    })().catch(console.error)
  }, [locale])

  return (
    <LinguiProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      {children}
    </LinguiProvider>
  )
}
