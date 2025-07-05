import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Your Site Title',
  description: 'Your site description goes here.',
};
