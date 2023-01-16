import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Input } from 'antd'
import { Api } from '../api/api'


function History() {
    const [ history, setHistory ] = useState({})

    useEffect(() => {
        Api.get('/seller/history').then(r => setHistory(r.data.history))
    }, [])

    return (
        <>
            <Card
                title={<b>История</b>}
                extra={<Button onClick={() => window.history.back()}>Назад</Button>}
            >
                <Card
                    title="Продукты"
                >
                    { history?.products ? history.products.map(i => <Card style={{ marginBottom: 20 }} title={i.product_title}>{ i.subtypes ? i.subtypes.map(s => <Card style={{ marginBottom: 20 }} title={s.subtype_title}> {s.keys ? s.keys.map(k => <p>{k.key_content} • {k.date_check} • {k.email}</p>) : <></>} </Card>) : <></>}</Card>) : <></> }
                </Card>
            </Card>
        </>
    )
}

export default History
