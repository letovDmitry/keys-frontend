import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Input } from 'antd'
import { Api } from '../api/api'
import { useParams } from 'react-router-dom'


function Transaction() {
    const [ transaction, setTransaction ] = useState({})
    const [ isChangingKey, setIsChangingKey ] = useState(false)
    const [ newKey, setNewKey ] = useState('')

    const { id } = useParams()

    useEffect(() => {
        Api.get('/seller/history/' + id).then(r => setTransaction(r.data.transaction))
    }, [])

    const handleChangeKey = () => {
        Api.patch('/seller/history/' + id, {content_key: newKey}).then(r => window.location.reload())
    }

    return (
        <>
            <Card
                title={<b>Транзакция</b>}
                extra={<Button onClick={() => window.history.back()}>Назад</Button>}
            >
                <Card
                    title="Продукты"
                >
                    { transaction ? <Card extra={`${transaction.date_check}`} style={{ marginBottom: 20 }} title={`${transaction.client_email}: ${transaction.category_name} - ${transaction.subcategory_name}`}>{ isChangingKey ? <><Input value={newKey} onChange={e => setNewKey(e.target.value)} style={{ marginBottom: 10, width: 500 }} placeholder='Ключ' /><Button danger onClick={() => setIsChangingKey(false)} style={{ marginLeft: 10 }} type="primary">Отмена</Button></>  : transaction.content_key} <Button onClick={() => isChangingKey ? handleChangeKey() : setIsChangingKey(true)} style={{ marginLeft: 10, marginRight: 10 }} type="primary">Изменить</Button>  - {transaction.amount}р </Card> : <></> }
                </Card>
            </Card>
        </>
    )
}

export default Transaction
