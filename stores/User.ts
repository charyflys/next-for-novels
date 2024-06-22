import {create} from 'zustand'
export const useUserStore = create<User_Store>((set) => ({
    User: {} as User_Profile & { id: string },
    updateUser: (newUser: User_Profile & { id: string }) => set({User: newUser})
}))

type User_Store = {
    User: User_Profile & { id: string }
    updateUser: (newUser: User_Profile & { id: string }) => void
}
