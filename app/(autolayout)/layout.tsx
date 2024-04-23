'use client'

import Dashboard from "./_components/Dashboard"
import AllLayout from "@/app/allayout"
import { useAlertStore } from '@/stores/Alert'
import { useRouter } from 'next/navigation';
import { CheckSession } from "@/request/signin";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const router = useRouter()
    const pushAlert = useAlertStore(state => state.setMsgAndColorAndOpen)
    CheckSession()
    .then(data => {
      if(data)
        console.log('session get')
      else {
        pushAlert('您未登录，请先登录','info')
        router.replace('/signin')
      }
    })
    .catch(err => console.error(err))
    return (
      <AllLayout props={{showcopyright:false}}>
        <Dashboard>
          {children}
        </Dashboard>
      </AllLayout>
    );
  }
  