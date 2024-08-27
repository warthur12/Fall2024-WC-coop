import Image from "next/image";
import React from "react";
import { Button, Card } from "antd";

export default async function Home() {
  const { data } = await fetch('http://localhost:4000/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
    query GetUsers {
      getUsers {
        id
        description
        password
        username
      }
    }
  `,
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json());

  let users = data?.getUsers;

  return (
    <main>
      <div className="flex flex-row my-2 h-96">
        {users?.map((user: { username: string, description: string }) => (
          <Card className="basis-1/3 m-2 bg-orange border-black" title={user.username} hoverable={true} >
            {user.description}
          </Card>
        ))}
      </div>
      <div className="my-2 w-full h-44">
        <div className="h-full w-full p-4 bg-white">
          <div className="flex h-full w-full  rounded bg-black">
            <div className="flex flex-row items-center w-full">
              <div className="flex basis-1/4 h-full items-center bg-orange">
                <div className="w-full text-center">
                  <p>test</p>
                </div>
              </div>
              <div className="flex basis-1/2 h-full items-center bg-black">
                <div className="w-full text-center">
                  <p>test</p>
                </div>
              </div>
              <div className="flex basis-1/4 h-full items-center bg-orange">
                <div className="w-full text-center">
                  <p>test</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 w-full h-44">
        <div className="h-full w-full p-4 bg-white">
          <div className="flex h-full w-full  rounded bg-black">
            <div className="flex flex-row items-center w-full">
              <div className="flex basis-1/4 h-full items-center bg-orange">
                <div className="w-full text-center">
                  <p>test</p>
                </div>
              </div>
              <div className="flex basis-1/2 h-full items-center bg-black">
                <div className="w-full text-center">
                  <p>test</p>
                </div>
              </div>
              <div className="flex basis-1/4 h-full items-center bg-orange">
                <div className="w-full text-center">
                  <p>test</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 w-full h-44">
        <div className="h-full w-full p-4 bg-white">
          <div className="flex h-full w-full  rounded bg-black">
            <div className="flex flex-row items-center w-full">
              <div className="flex basis-1/4 h-full items-center bg-orange">
                <div className="w-full text-center">
                  <p>test</p>
                </div>
              </div>
              <div className="flex basis-1/2 h-full items-center bg-black">
                <div className="w-full text-center">
                  <p>test</p>
                </div>
              </div>
              <div className="flex basis-1/4 h-full items-center bg-orange">
                <div className="w-full text-center">
                  <p>test</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
