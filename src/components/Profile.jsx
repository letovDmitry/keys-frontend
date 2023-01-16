import { Card, Button } from 'antd'
import React, { useEffect, useState } from 'react'

import { Api } from '../api/api'

function Profile() {
    const [ profile, setProfile ] = useState({})

    useEffect(() => {

        Api.get('/profile').then(r => setProfile(r.data))

    }, [])

    return (
        <>
            <Card 
                extra={<Button onClick={() => window.history.back()}>Назад</Button>}
                title="Профиль">
                <p>Имя пользователя: {profile.username}</p>
                <p>Seller ID: {profile.seller_id}</p>
                <p>Seller Key: {profile.seller_key}</p>
            </Card>
        </>
    )
}

export default Profile
