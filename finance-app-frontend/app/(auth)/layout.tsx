export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <div className="min-h-screen w-screen bg-gradient-to-br from-zinc-950 to-blue-950 flex items-center justify-center">
      {children}
    </div>
  );
}
