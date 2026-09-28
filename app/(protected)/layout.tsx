import Nav from "@/components/Nav";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex">
      <Nav />
      <main className="min-h-screen flex-1 overflow-y-auto px-4 pb-24 pt-20 sm:px-6 md:ml-56 md:px-8 md:pb-8 md:pt-8">
        {children}
      </main>
    </div>
  );
}
