import Sidebar from '@/components/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{ fontFamily: 'Lobster, cursive' }}
      className="w-full h-screen flex"
    >
      <Sidebar />

      {children}
    </div>
  );
}
