'use client'

import Dashboard from "./_components/Dashboard"
import AllLayout from "@/app/allayout"
// import { useAlertStore } from '@/stores/Alert'
// import { useRouter } from 'next/navigation';
// import { CheckSession } from "@/request/signin";


export default function RootLayout({
    children,
    pageProps
  }: Readonly<{
    children: React.ReactNode,
    pageProps: any
  }>) {

    return (
      <AllLayout props={{showcopyright:false}}>
        <Dashboard {...pageProps}>
          {children}
        </Dashboard>
      </AllLayout>
    );
  }
  