'use client';

import React from 'react';
import styled from 'styled-components';
import { Button, Card } from 'antd';

function UserCard(props: any) {
    const cardLoaded = (
        <div className='basis-1/3 p-2 h-full w-full'>
            <Card className="bg-orange w-full h-full" size="default" onClick={() => window.location.replace(`/users?user=${props.user.username}`)} title={props.user.username} hoverable={true} loading={props.loading}>
                {props.user.description}
            </Card>
        </div>
    );
    const cardLoading = (
        <Card className="basis-1/3 m-2 bg-orange" size="default" hoverable={true} loading={props.loading}></Card>
    )
    return props.loading ? cardLoading : cardLoaded;
}

export default UserCard;