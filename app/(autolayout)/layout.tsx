'use client'

import { supabase } from "@/lib/supabaseMiddle/supabaseComponent";
import Dashboard from "./Dashboard"
import AllLayout from "@/app/allayout"
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    supabase.auth.getSession()
    .then(session => console.log('session get'))
    .catch(err => console.error(err))
    return (
      <AllLayout props={{showcopyright:false}}>
        <Dashboard>
          {children}
        </Dashboard>
      </AllLayout>
    );
  }
  