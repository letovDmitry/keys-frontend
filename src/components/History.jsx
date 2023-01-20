import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Input } from 'antd'
import { Api } from '../api/api'
import { Link } from 'react-router-dom'


function History() {
    const [ history, setHistory ] = useState({})

    useEffect(() => {
        Api.get('/seller/history').then(r => setHistory(r.data))
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
                    { history?.transactions ? history.transactions.map(i => <Card extra={`${i.date_check}`} style={{ marginBottom: 20 }} title={<Link to={`/seller/history/transaction/${i.id}`}>${i.category_name} - ${i.subcategory_name}</Link>}>{i.content_key} - {i.amount_usd}$</Card>) : <></> }
                </Card>
            </Card>
        </>
    )
}

export default History
