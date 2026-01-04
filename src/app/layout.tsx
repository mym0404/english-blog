import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const myFont = localFont({
  src: "./../../public/fonts/PretendardVariable.ttf",
});

export const metadata: Metadata = {
  title: "나의 영어여행",
  description: "나만의 작은 영어 학습 블로그",
  openGraph: {
    images: "https://english.mjstudio.net/images/ogimage.png",
    title: "나의 영어여행",
    description: "나만의 작은 영어 학습 블로그",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={myFont.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          theme={{
            defaultTheme: "dark",
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
