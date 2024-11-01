"use client"
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          {children}
          <ToastContainer position="bottom-right" theme="colored"/>
        </SessionProvider>
      </body>
    </html>
  );
}
