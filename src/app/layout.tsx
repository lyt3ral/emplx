import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import Header from "@/components/client/Header";

import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Emplx",
  description: "Employee Management System",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <main className="flex min-h-screen justify-center bg-slate-300 p-1 md:p-8">
            <div className="container mx-auto rounded border border-black bg-white">
              <Header />

              {children}
            </div>
          </main>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
