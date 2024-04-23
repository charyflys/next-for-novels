'use client'

import { supabase } from "@/lib/supabaseComponent";
import Dashboard from "./Dashboard"
import AllLayout from "@/app/allayout"
import { useAlertStore } from '@/stores/Alert'
import { useRouter } from 'next/navigation';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const router = useRouter()
    const pushAlert = useAlertStore(state => state.setMsgAndColorAndOpen)
    supabase.auth.getSession()
    .then(session => {
      if(session.data.session)
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
  