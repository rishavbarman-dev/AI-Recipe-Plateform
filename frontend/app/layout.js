import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const  inter = Inter({ subsets: ["latin"]});

export const metadata = {
  title: "Served - AI Recipe Platform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: "simple" }}>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={`${inter.className}`}
        >
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="py-8 px-4 border-t">
            <div className="max-w-6xl mx-auto flex justify-center">
              <p className="text-stone-500 text-sm">

              Made with ❤️ by Served
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
