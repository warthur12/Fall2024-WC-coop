'use client';

import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Empty, Image } from 'antd';

class Banner extends Component<{content1: string, content2: string, content3: string}> {
    render(): React.ReactNode {
        if (this.props.content1) {
            return (
                <div className="my-2 w-full h-44">
                    <div className="h-full w-full p-4">
                        <div className="flex h-full w-full">
                            <div className="flex flex-row items-center w-full">
                                <div className="flex basis-1/4 h-full items-center rounded-l-lg bg-orange">
                                    <div className="w-full text-center">
                                        <p>{this.props.content1 ? this.props.content1 : "Loading..."}</p>
                                    </div>
                                </div>
                                <div className="flex basis-1/2 h-full items-center bg-white">
                                    <div className="w-full text-center">
                                        <p>{this.props.content2 ? this.props.content2 : "Loading..."}</p>
                                    </div>
                                </div>
                                <div className="flex basis-1/4 h-full items-center rounded-r-lg bg-orange">
                                    <div className="w-full h-full flex justify-center items-center">
                                        <img src={this.props.content3} className='max-h-full'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <Empty description={"Loading..."}></Empty>
        )
    }
}

export default Banner;