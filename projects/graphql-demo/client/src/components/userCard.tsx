'use client';

import React from 'react';
import styled from 'styled-components';
import { Button, Card } from 'antd';

function UserCard(props: any) {
    console.log(props);
    const cardLoaded = (
        <div key={props.user.username} className='basis-1/3 p-2 h-full w-full'>
            <Card className="bg-orange w-full h-full" size="default" onClick={() => window.location.replace(`/pages/users?user=${props.user.username}`)} title={props.user.username} hoverable={true} loading={false}>
                {props.user.description}
            </Card>
        </div>
    );
    const cardLoading = (
        <Card key={1} title={"loading"} className="basis-1/3 m-2 bg-orange" size="default" hoverable={true} loading={true}></Card>
    )
    return props.loading ? cardLoading : cardLoaded;
}

export default UserCard;