'use client';

import React, { useState, useEffect, useCallback, Component } from "react";


import Banner from "@/components/Banner";
import UserCard from "@/components/UserCard";

import { getAllUsers } from "@/util/auth";

export default function Home() {
  let [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    console.log("useEffect");
    const callAPI = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    }
    callAPI();
  }, []);

  return (
    <main>
      <div className="flex flex-row m-2 h-96">
        { users?.map((user: { username: string, description: string }) => (
          user ? <UserCard user={user} loading={false}></UserCard> : <UserCard user={user} loading={false}></UserCard>
        ))}
      </div>
      <Banner content1="test1" content2="test2" content3=""></Banner>
      <Banner content1="test1" content2="test2" content3=""></Banner>
      <Banner content1="test1" content2="test2" content3=""></Banner>
    </main>
  );
}