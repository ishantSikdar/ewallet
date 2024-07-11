import AppBar from "../../components/AppBar"
import NavBar from "../../components/NavBar"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <AppBar />
    <div className="flex">
      <div className="w-60 border-r-2 h-screen">
        <NavBar />
      </div>
      {children}
    </div>
  </>
}