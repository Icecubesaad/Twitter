import { Inter } from "next/font/google";
import "./globals.css";
import AppState from "@/context/AppState";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twitter Clone",
  description: "twitter clone",
};

export default function RootLayout({ children }) {
  return (
    <AppState>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </AppState>
  );
}
