import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnrollmentOnboardingModal } from "@/components/auth/EnrollmentOnboardingModal";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gtu-all-in-one.vercel.app"),
  title: {
    default: "GTU All In One | Gujarat Technological University Student Portal",
    template: "%s | GTU All In One",
  },
  description:
    "Official Gujarat Technological University (GTU) student companion: Live GTU exam result declaration alerts, official circulars, exam timetables, previous year question papers (PYQs), engineering study materials, PMMS portal, and SPI/CPI grade calculator.",
  keywords: [
    "GTU",
    "gtu",
    "GTU Portal",
    "Gujarat Technological University",
    "GTU Results",
    "GTU Result Alert",
    "result.gtu.ac.in",
    "gtu.ac.in",
    "GTU Circular",
    "GTU Circulars",
    "GTU Question Papers",
    "GTU PYQ",
    "GTU Papers",
    "GTU Old Papers",
    "GTU Syllabus",
    "GTU Study Material",
    "Darshan University GTU Material",
    "GTU PMMS",
    "GTU Midsem Calculator",
    "GTU SPI Calculator",
    "GTU CPI Calculator",
    "GTU 100 Activity Points",
    "GTU Exam Timetable",
    "GTU Engineering",
    "GTU BE",
    "GTU Diploma",
    "GTU ME",
    "GTU MBA",
    "GTU MCA",
    "GTU BPharm",
    "gtu student portal",
    "GTU All In One",
  ],
  authors: [
    { name: "Dhrumil Prajapati" },
    { name: "GTU All In One Team", url: "https://gtu-all-in-one.vercel.app" },
  ],
  creator: "Dhrumil Prajapati",
  publisher: "GTU All In One",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gtu-all-in-one.vercel.app",
    title: "GTU All In One | Gujarat Technological University Student Portal",
    description:
      "All-in-one student hub for GTU: live exam results, latest circulars, past question papers, syllabus, study notes, and SPI/CPI calculators.",
    siteName: "GTU All In One",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "GTU All In One Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GTU All In One | Gujarat Technological University Student Portal",
    description:
      "Live GTU exam results, circulars, previous year question papers (PYQs), and study notes.",
    images: ["/icons/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GTU All In One",
  },
  category: "education",
  classification: "Education, Gujarat Technological University Portal",
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://gtu-all-in-one.vercel.app/#website",
      "url": "https://gtu-all-in-one.vercel.app",
      "name": "GTU All In One",
      "alternateName": [
        "GTU",
        "GTU Portal",
        "Gujarat Technological University Student Companion",
        "GTU All-In-One",
        "GTU Hub"
      ],
      "description":
        "The unified student companion for Gujarat Technological University (GTU) with results, question papers, circulars, and study materials.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://gtu-all-in-one.vercel.app/papers?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://gtu-all-in-one.vercel.app/#organization",
      "name": "GTU All In One",
      "url": "https://gtu-all-in-one.vercel.app",
      "logo": "https://gtu-all-in-one.vercel.app/icons/icon-512.png",
      "sameAs": [
        "https://www.gtu.ac.in",
        "https://result.gtu.ac.in",
        "https://timetable.gtu.ac.in",
        "https://pmms.gtu.ac.in"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://gtu-all-in-one.vercel.app/#app",
      "name": "GTU All In One",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All, Android, iOS, Windows, macOS, Linux",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1580"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://gtu-all-in-one.vercel.app/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I check my GTU Exam Results online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can check your GTU exam results by entering your 12-digit enrollment number and exam session on result.gtu.ac.in or by setting up automated browser push alerts on GTU All In One."
          }
        },
        {
          "@type": "Question",
          "name": "Where can I download GTU Previous Year Question Papers (PYQs)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GTU All In One hosts previous year question papers for B.E., Diploma, M.E., MBA, MCA, and B.Pharm for Summer and Winter examination sessions from 2020 to 2026."
          }
        },
        {
          "@type": "Question",
          "name": "What is the official GTU percentage conversion formula from SPI / CPI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The official Gujarat Technological University formula to convert SPI or CPI into percentage is: Percentage (%) = (SPI / CPI - 0.5) * 10."
          }
        },
        {
          "@type": "Question",
          "name": "What are the passing marks for GTU 70-mark external exams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Students must secure a minimum of 23 marks out of 70 (33%) in the university external end-semester theory exam, and at least 12 marks out of 30 (40%) in the internal/midsem exam."
          }
        },
        {
          "@type": "Question",
          "name": "What is GTU PMMS and what documents must students submit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GTU PMMS tracks IDP/UDP capstone projects for 7th and 8th semester engineering students with PPR reports, DEC/BMC canvases, and PSAR patent reports."
          }
        },
        {
          "@type": "Question",
          "name": "How do GTU 100 Activity Points work for Bachelor of Engineering (B.E.)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Regular 4-year B.E. students must earn at least 100 Activity Points (75 for D2D students) through sports, NSS, technical hackathons, and certified MOOC courses."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7YNPG13LVH"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag("js", new Date());

              gtag("config", "G-7YNPG13LVH");
            `,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1299216159858580"
          crossOrigin="anonymous"
        />
        {/* Search Engine Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData),
          }}
        />
      </head>
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
