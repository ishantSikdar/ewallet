import AppBar from "../../components/AppBar"
import NavBar from "../../components/NavBar"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-screen min-w-[1000px]">
    <AppBar />
    <div className="flex pt-16 h-full">
      <div className="w-60 shadow-md">
        <NavBar />
      </div>  
      <div className="flex-grow h-full">
        {children}
      </div>
    </div>
  </div>
}