import Nav from "@/components/Nav";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Nav />
      <main className="min-h-screen flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
