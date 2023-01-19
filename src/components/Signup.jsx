import React, { useState } from 'react'
import { Card, Col, Row, Button, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Api } from '../api/api'


function Signup() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [seller_id, setSeller_id] = useState('')
    const [seller_key, setSeller_key] = useState('')

    const navigate = useNavigate()

    const handleSignup = () => {
        Api.post('/auth/sign-up', { firstname: firstName, lastname: lastName, seller_id: parseInt(seller_id), seller_key, username: login, password }).then(r => {
            navigate('/signin')
            window.location.reload();
        }).catch(e => console.error(e))
    }

    return (
        <>
            <Row style={{marginBottom: 20}} gutter={16}>
                <Col span={8}>
                </Col>
                <Col span={8}>
                    <Card
                        style={{ width: '100%' }}
                        title={'Регистрация'}
                        extra={<Link to={`/`}>Вход</Link>}
                    >
                            <Input value={login} onChange={e => setLogin(e.target.value)} style={{ marginBottom: 10 }} placeholder='Логин' />
                            <Input.Password value={password} onChange={e => setPassword(e.target.value)} style={{ marginBottom: 30 }} placeholder='Пароль' />
                            <Input value={firstName} onChange={e => setFirstName(e.target.value)} style={{ marginBottom: 10 }} placeholder='Имя' />
                            <Input value={lastName} onChange={e => setLastName(e.target.value)} style={{ marginBottom: 10 }} placeholder='Фамилия' />
                            <Input value={seller_id} onChange={e => setSeller_id(e.target.value)} style={{ marginBottom: 10 }} placeholder='seller_id' />
                            <Input value={seller_key} onChange={e => setSeller_key(e.target.value)} style={{ marginBottom: 10 }} placeholder='seller_key' />

                            <Button onClick={handleSignup} style={{ marginTop: 10, marginLeft: '36%' }} type='primary'>Зарегистрироваться</Button>
                    </Card>
                </Col>
                <Col span={8}>
                </Col> 
            </Row>
        </>
    )
}

export default Signup
