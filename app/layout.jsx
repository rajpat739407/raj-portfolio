import { Inter, Orbitron } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const metadata = {
  title: 'Raj Patel - 3D Developer Portfolio',
  description: 'Creative developer specializing in React, Three.js, and immersive web experiences',
  keywords: 'developer, three.js, react, portfolio, 3D, webgl',
  authors: [{ name: 'Raj Patel' }],
  openGraph: {
    title: 'Raj Patel - 3D Developer Portfolio',
    description: 'Creative developer specializing in React, Three.js, and immersive web experiences',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className="bg-black text-white antialiased">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}