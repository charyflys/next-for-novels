import AllLayout from "@/app/allayout"
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <AllLayout props={{showcopyright:true}}>
          {children}
      </AllLayout>
    );
  }
  