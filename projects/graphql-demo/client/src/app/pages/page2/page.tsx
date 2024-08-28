import Image from "next/image";
import React from "react";
import { Button } from "antd";

import Banner from "@/components/Banner";

export default function Home() {
    return (
        <main>
            <h2 className="text-center text-3xl">Welcome to Page 2</h2>
            <Banner content1="page2 content" content2="page2 content 2" content3="page2 content 3"></Banner>
        </main>
    )
}