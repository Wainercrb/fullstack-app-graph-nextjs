import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "To-Do App private layout",
  description: "Private Layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">{children}</body>
    </html>
  );
}
 