import Dashboard from "./Dashboard"
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <Dashboard>{children}</Dashboard>
    );
  }
  