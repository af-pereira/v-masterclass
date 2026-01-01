import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'
import type { PostgrestError, AuthError } from '@supabase/supabase-js'

const authStore = useAuthStore()

export const login = async (formData: LoginForm): Promise<AuthError | boolean> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  if (error) return error

  await authStore.setAuth(data.session)

  return true
}

export const register = async (
  formData: RegisterForm
): Promise<AuthError | PostgrestError | boolean> => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password
  })

  if (error) return error

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: `${formData.firstName} ${formData.lastName}`
    })

    if (error) return error
  }

  await authStore.setAuth(data.session)

  return true
}
