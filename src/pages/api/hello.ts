// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { loadLocaleData } from '@/i18n'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const i18n = await loadLocaleData(req)
  res.status(200).json({ name: /*i18n*/ i18n._('Hello World') })
}
