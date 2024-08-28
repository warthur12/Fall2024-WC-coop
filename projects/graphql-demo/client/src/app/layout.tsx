import React from "react";
import { AntdRegistry } from '@ant-design/nextjs-registry';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Button, ConfigProvider, Space } from 'antd';
import "./globals.css";
import Link from "next/link";

import NavButton from "@/components/NavButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GraphQL-demo",
  description: "WBA GraphQL-demo",
};

export default function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang="en">
      <AntdRegistry>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverBorderColor: "orange",
                defaultHoverColor: "black"
              }
            }
          }}
        >
          <body className={inter.className}>
            <div>
              <Link href={"/"}>
                <h1 className="text-center font-bold text-6xl">
                  Home
                </h1>
              </Link>
            </div>
            <div className="flex flex-row">
              <NavButton page="pages/page1"></NavButton>
              <NavButton page="pages/page2"></NavButton>
              <NavButton page="pages/page3"></NavButton>
              <NavButton page="pages/page4"></NavButton>
            </div>
            {children}
          </body>
        </ConfigProvider>
      </AntdRegistry>
    </html>
  );
}
