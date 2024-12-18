import { Roboto } from "next/font/google";
import "../style/main.scss";

// Import the Roboto font
const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Product Details",
  description: "This is Product Details Next App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
