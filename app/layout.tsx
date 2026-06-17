import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "선생님용 부가자료 다운로드 서비스 | YBM 북샘",
  description: "YBM 교재 부가자료를 이메일로 받아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}
