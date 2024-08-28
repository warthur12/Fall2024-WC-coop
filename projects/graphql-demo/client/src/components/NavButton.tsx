'use client';

import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

function NavButton(props: any) {
    const link = `/${props.page}`;
    return (
        <div className="m-2 basis-1/4">
            <Button className="w-full" type="default" href={link}>{props.page.split("/")[1]}</Button>
        </div>
    );
}

export default NavButton;