'use client';

import Image from "next/image";
import React, { useState, useEffect, useCallback, Component } from "react";

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
  });

  const getUserCards = () => {
    if (users?.getUsers) {
      return (
        [users?.getUsers]
      )
    }
    return [[( <UserCard user={{}} loading={true}></UserCard> )]];
  }

  return (
    <main>
      <div className="flex flex-row m-2 h-96">
        { getUserCards()[0].map((user: { username: string, description: string }) => (
          <UserCard key={user.username} user={user} loading={false}></UserCard>
        )) }
      </div>
      <Banner content1="test1" content2="test2" content3="test3"></Banner>
      <Banner content1="test1" content2="test2" content3="test3"></Banner>
      <Banner content1="test1" content2="test2" content3="test3"></Banner>
    </main>
  );
}

// export default class Home extends Component {
//   state = {
//     users: {getUsers: []}
//   }

//   setUsers = (users: {getUsers: []}) => {
//     this.state.users = users;
//   }
  
//   fillCards = async () => {
//     const response = await getUsers();
//     this.setUsers(response);

//     return (
//       this.state.users?.getUsers ?
//         this.state.users?.getUsers.map((user: { username: string, description: string }) => (
//           <UserCard key={user.username} user={user} loading={false}></UserCard>
//         )
//       ) : <UserCard user={{}} loading={true}></UserCard>
//     )
//   }

//   componentDidMount(): void {
//     this.fillCards();
//   }

//   render() {
//     return (
//       <main>
//         <div className="flex flex-row m-2 h-96">
//           { this.fillCards() }
//         </div>
//         <Banner content1="test1" content2="test2" content3="test3"></Banner>
//         <Banner content1="test1" content2="test2" content3="test3"></Banner>
//         <Banner content1="test1" content2="test2" content3="test3"></Banner>
//       </main>
//     );
//   }
// }
