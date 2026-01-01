import { profileQuery } from '@/utils/supaQueries'
import type { Profile } from '@/utils/supaQueries'
import type { Session, User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Profile>(null)

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (profile.value && profile.value.id === user.value.id) return

    const { data } = await profileQuery(user.value.id)
    profile.value = data || null
  }

  const setAuth = async (userSession: Session | null = null) => {
    if (!userSession) {
      user.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  return {
    user,
    profile,
    setAuth
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
