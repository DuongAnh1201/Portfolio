import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
});

/** Runs before first paint so the saved / system theme shows without a flash. */
const themeScript = `(function(){try{var s=localStorage.getItem('theme');document.documentElement.dataset.theme=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
