'use client'

import { supabase } from "@/lib/supabaseMiddle/supabaseComponent";
import { Session} from '@supabase/auth-helpers-nextjs'
import Dashboard from "./Dashboard"
import AllLayout from "@/app/allayout"
import { useEffect, useState } from "react";
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    supabase.auth.getSession()
    .then(session => console.log(session))
    .catch(err => console.error(err))
    return (
      <AllLayout props={{showcopyright:false}}>
        <Dashboard>
          {children}
        </Dashboard>
      </AllLayout>
    );
  }
  