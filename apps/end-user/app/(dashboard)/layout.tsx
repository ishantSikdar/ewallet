import AppBar from "../../components/AppBar"
import NavBar from "../../components/NavBar"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-screen">
    <AppBar />
    <div className="flex pt-16 h-full">
      <div className="w-60 shadow-md h-full">
        <NavBar />
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  </div>
}