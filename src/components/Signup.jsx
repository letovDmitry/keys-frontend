import React, { useState } from 'react'
import { Card, Col, Row, Button, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Api } from '../api/api'


function Signup() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSignup = () => {
        Api.post('/auth/sign-up', { username: login, password }).then(r => {
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
                            <Input.Password value={password} onChange={e => setPassword(e.target.value)} placeholder='Пароль' />

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
