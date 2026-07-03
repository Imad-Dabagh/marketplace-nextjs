import TopBar from "@/components/navbar/TopBar";
import Footer from "@/components/layout/Footer";

export default function MainLayout({
  children,
  authModal,
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {authModal}
    </>
  );
}
