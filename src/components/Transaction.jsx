import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Input } from 'antd'
import { Api } from '../api/api'
import { useParams } from 'react-router-dom'


function Transaction() {
    const [ transaction, setTransaction ] = useState({})

    const { id } = useParams()

    useEffect(() => {
        Api.get('/seller/history/' + id).then(r => setTransaction(r.data.transaction))
    }, [])

    return (
        <>
            <Card
                title={<b>Транзакция</b>}
                extra={<Button onClick={() => window.history.back()}>Назад</Button>}
            >
                <Card
                    title="Продукты"
                >
                    { transaction ? <Card extra={`${transaction.date_check}`} style={{ marginBottom: 20 }} title={`${transaction.client_email}: ${transaction.category_name} - ${transaction.subcategory}`}>{transaction.content_key} - {transaction.amount_usd}$</Card> : <></> }
                </Card>
            </Card>
        </>
    )
}

export default Transaction
