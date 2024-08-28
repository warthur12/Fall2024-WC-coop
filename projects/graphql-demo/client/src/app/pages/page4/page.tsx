import Image from "next/image";
import React from "react";
import { Button } from "antd";

import Banner from "@/components/Banner";

export default function Home() {
    return (
        <main>
            <h2 className="text-center text-3xl">Welcome to Page 4</h2>
            <Banner content1="page4 content" content2="page4 content 2" content3="page4 content 3"></Banner>
        </main>
    )
}