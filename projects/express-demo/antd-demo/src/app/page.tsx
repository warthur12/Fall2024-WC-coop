import Image from "next/image";
import React from "react";
import { Button } from "antd";

export default function Home() {
  return (
    <main>
      <div className="flex flex-row my-2 h-96">
        <div className="flex flex-col basis-1/3 w-full h-full mx-2 rounded-md bg-orange">
          <div className="basis-3/4 w-full text-center">
            <h1 className="text-2xl">
              Header 1
            </h1>
            <div className="h-4 w-full bg-white" />
            <p>
              sample text
            </p>
          </div>
          <div className="basis-1/4">
            <Button className="h-full w-full border-2 border-white" type="default">Button</Button>
          </div>
        </div>
        <div className="flex flex-col basis-1/3 w-full h-full mx-2 rounded-md bg-orange">
          <div className="basis-3/4 w-full text-center">
            <h1 className="text-2xl">
              Header 2
            </h1>
            <div className="h-4 w-full bg-white" />
            <p>
              sample text
            </p>
          </div>
          <div className="basis-1/4">
            <Button className="h-full w-full border-2 border-white" type="default">Button</Button>
          </div>
        </div>
        <div className="flex flex-col basis-1/3 w-full h-full mx-2 rounded-md bg-orange">
          <div className="basis-3/4 w-full text-center">
            <h1 className="text-2xl">
              Header 3
            </h1>
            <div className="h-4 w-full bg-white" />
            <p>
              sample text
            </p>
          </div>
          <div className="basis-1/4">
            <Button className="h-full w-full border-2 border-white" type="default">Button</Button>
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
