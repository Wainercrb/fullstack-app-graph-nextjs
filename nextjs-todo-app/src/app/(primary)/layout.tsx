import ApolloProvider from "@/context/apollo-server";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang='en'>
      <body className={inter.className}>
        <ApolloProvider>
          <main className='w-screen h-screen'>{children}</main>
        </ApolloProvider>
      </body>
    </html>
  );
}
