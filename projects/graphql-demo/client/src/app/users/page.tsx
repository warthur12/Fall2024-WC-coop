'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'

import Banner from "@/components/Banner";
import { getUsers, parseUser } from "@/util/auth";

export default function Home() {
    const content: ReadonlyURLSearchParams = useSearchParams();

    const [user, setUser] = useState<any>([]);
    useEffect(() => {
        async function apiCall() {
            let response = await getUsers();
            response = parseUser(content.get('user') || "", response)
            setUser(response);
        }
        apiCall();
    }, []);

    return (
        <main>
            <Banner content1={user[0]} content2={user[1]} content3={user[2]}></Banner>
        </main>
    )
}