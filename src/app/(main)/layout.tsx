import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="animated-gradient absolute inset-0 -z-10" />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
