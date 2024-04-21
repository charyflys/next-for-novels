import {create} from 'zustand'
export const useUserStore = create((set) => ({
    User: {} as User,
    updateUser: (newUser: User) => set({User: newUser})
}))

type User = {
    name: string
}