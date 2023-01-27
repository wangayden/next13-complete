import { match as matchLocale } from '@formatjs/intl-localematcher'
import { i18n } from '@lingui/core'
import * as plurals from 'make-plural/plurals'
import Negotiator from 'negotiator'
import type { NextRequest } from 'next/server'
import { NextApiRequest } from 'next/types'
import { LOCALES } from './providers/I18nProvider'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { locales, sourceLocale } = require('../lingui.config.js')

export const matchLanguage = (languages: string[]) => {
  return matchLocale(languages, locales, sourceLocale)
}

export const getLocale = (req: NextRequest): string | undefined => {
  let locales: string[] = [sourceLocale]

  if (req.cookies.has('NEXT_LOCALE')) {
    locales = [req.cookies.get('NEXT_LOCALE')?.value as string]
  }

  if (!locales.length) {
    const negotiatorHeaders: Record<string, string> = {}
    req.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
    locales = new Negotiator({ headers: negotiatorHeaders }).languages()
  }

  return matchLanguage(locales)
}

export const loadLocaleData = async (req: NextApiRequest) => {
  let locales: string[] = [sourceLocale]
  if (req.cookies.NEXT_LOCALE) {
    locales = [req.cookies.NEXT_LOCALE]
  }

  if (!locales.length) {
    const negotiatorHeaders: Record<string, string> = {}
    Object.entries(req.headers).forEach(([key, value]) => {
      if (key && value)
        negotiatorHeaders[key] = Array.isArray(value) ? value[0] : value
    })
    locales = new Negotiator({ headers: negotiatorHeaders }).languages()
  }

  const locale = matchLanguage(locales)
  i18n.loadLocaleData(locale, {
    plurals: plurals[locale as LOCALES],
  })
  const { messages } = await import(
    `@lingui/loader!./../locale/${locale}.json?raw-lingui`
  )
  i18n.load(locale as string, messages)
  i18n.activate(locale as string)
  return i18n
}

export const i18nConfig = { locales, sourceLocale }
