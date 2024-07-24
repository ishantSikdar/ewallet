import dynamic from "next/dynamic";
import NavBar from "../../components/NavBar";

const MobileNavBar = dynamic(() => import("../../components/MobileNavbar"), {
  ssr: false,
});

const DynamicAppBar = dynamic(() => import("../../components/AppBar"), {
  ssr: false,
});

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen">
    <DynamicAppBar />
    <div className="flex pt-16 h-full flex-row-reverse md:flex-row">
      <div className="hidden md:flex h-full">
        <NavBar />
      </div>
      <div className="flex-grow h-full border-l-2">
        {children}
      </div>
      <MobileNavBar />
    </div>
  </div>
}