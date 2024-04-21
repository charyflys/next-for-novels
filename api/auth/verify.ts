import jwt from 'jsonwebtoken'

import { getTokenData, deleteUserToken } from '../../lib/database'
import { jwtSecret } from '@/lib/env-values'
export async function GET(req: Request) {
  const token = req.url.split('=')[1]

  console.log(token) // Logs the token value
  const tokenData = await getTokenData(token)

  if (!tokenData) {
    return Response.json({ error: 'Invalid or expired token' })
  }

  const { email } = jwt.verify(token, jwtSecret)

  // Delete or invalidate the token
  await deleteUserToken(token)

  return Response.redirect('/dashboard') // Or wherever you want to redirect the user after login
}