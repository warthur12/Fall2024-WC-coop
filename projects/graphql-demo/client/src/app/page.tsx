'use client';

import Image from "next/image";
import React, { useState, useEffect } from "react";

import { Button, Card } from "antd";

import Banner from "@/components/Banner";
import UserCard from "@/components/UserCard";

import { getUsers } from "@/util/auth";

export default function Home() {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    async function apiCall() {
      const response = await getUsers();
      setUsers(response);
    }
    apiCall();
  }, []);

  return (
    <main>
      <div className="flex flex-row m-2 h-96">
        { users?.getUsers ?
          users?.getUsers.map((user: { username: string, description: string }) => (
            <UserCard key={user.username} user={user} loading={false}></UserCard>
          )) : <UserCard user={{user: "", description: ""}} loading={true}></UserCard>
        }
      </div>
      <Banner content1="test1" content2="test2" content3="test3"></Banner>
      <Banner content1="test1" content2="test2" content3="test3"></Banner>
      <Banner content1="test1" content2="test2" content3="test3"></Banner>
    </main>
  );
}
