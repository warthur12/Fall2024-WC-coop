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
}: {
  children: React.ReactNode
}) {
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
          <body className="font-mono">{children}</body>
        </ConfigProvider>
      </AntdRegistry>
    </html>
  )
}
