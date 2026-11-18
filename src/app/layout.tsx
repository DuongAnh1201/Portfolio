// The pages themselves are static HTML in /public (see next.config.ts).
// Next.js needs an app directory to build, so this root layout stays.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
