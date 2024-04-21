
import { supabase } from './supabaseClient'

export const saveToken = async (userId: any, token: string) => {
  const { data, error } = await supabase.from('magic_tokens').insert([
    {
      user_id: userId,
      token: token,
      expires_at: new Date(Date.now() + 3600000),
    }, // expires in 1 hour
  ])

  if (error) throw new Error(error.message)
  return data
}

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single()

  console.log(data)
  if (error) throw new Error(error.message)
  return data
}

export const getTokenData = async (token: string) => {
  const { data, error } = await supabase.from('magic_tokens').select('*').eq('token', token).single()

  if (error) throw new Error(error.message)
  if (new Date(data.expires_at) < new Date()) {
    throw new Error('Token expired')
  }
  return data
}

export const deleteUserToken = async (token: string) => {
  const { data, error } = await supabase.from('magic_tokens').delete().match({ token: token })

  if (error) throw new Error(error.message)
  return data
}