import { wsLogin } from "@/request/ws";
import Ably from 'ably'
export const getAblyRealtime = async () => {
    const res = await wsLogin()
    const realtime = new Ably.Realtime({
        authUrl: '/api/auth',
        authMethod: 'POST',
        authParams: res,
    })
    return realtime
}

export const getAblyChannel = (realtime: Ably.Realtime, channelName: string) => {
    const channel = realtime.channels.get(channelName)
    
    return channel
}