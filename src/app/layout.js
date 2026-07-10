import { Nunito_Sans, Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeAndLayoutProviders } from "../components/ThemeAndLayoutProviders";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "The Poodja | Premium Property Management",
  description: "Premium property management services in Bali.",
  icons: {
    icon: "/logo.png?v=1",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} ${cormorantGaramond.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeAndLayoutProviders>{children}</ThemeAndLayoutProviders>
      </body>
    </html>
  );
}
