import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnrollmentOnboardingModal } from "@/components/auth/EnrollmentOnboardingModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GTU All In One | Question Papers, Results, Circulars & PMMS Portal",
  description: "All-in-one academic and utility platform for Gujarat Technological University (GTU) students: Previous Question Papers (PYQs), Result Alerts, Live Circulars feed, PMMS Hub, and Midsem SPI/CPI Grade Calculator.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <Providers>
          <Navbar />
          <EnrollmentOnboardingModal />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
