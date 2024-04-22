import { create } from 'zustand'
export const useAlertStore = create<Alert>()((set) => ({
    msg: '',
    open: false,
    severity: 'info',
    Open: () => set({ open: true }),
    Close: () => set({ open: false }),
    setMsg: (newMsg) => set({ msg: newMsg}),
    setMsgAndColorAndOpen: (newMsg,newColor='success') => set({msg:newMsg,open:true,severity:newColor})
}))

type Alert = {
    msg: string,
    open: boolean,
    severity: 'success'|'info'|'warning'|'error'
    Open: () => void,
    Close: () => void,
    setMsg: (newMsg: string) => void,
    setMsgAndColorAndOpen: (newMsg:string,newColor?:'success'|'info'|'warning'|'error') => void
}