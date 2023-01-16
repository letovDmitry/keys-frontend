import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Input } from 'antd'
import { Api } from '../api/api'
import { Link } from 'react-router-dom'
import { SettingOutlined, UserOutlined, CloseOutlined, PlusOutlined, CheckOutlined, HistoryOutlined } from '@ant-design/icons'

function Main() {

    const [ products, setProducts ] = useState([])
    const [ isAdding, setIsAdding ] = useState(false)

    const [ sellerid, setSellerid ] = useState('')
    const [ sellerkey, setSellerkey ] = useState('')

    const [ isChangingSettings, setIsChangingSettings ] = useState(false)
    const [ name, setName ] = useState('')
    
    const [ isChangingName, setIsChangingName ] = useState([0, false])

    const [ newName, setNewName ] = useState('')

    useEffect(() => {
        Api.get('/seller/products').then(r => setProducts(r.data))
    }, [])

    const handleAddProduct = () => {
        Api.post('/seller/products', {product_title: name}, {withCredentials: true}).then(r => console.log(r.data))
        setName('')

        Api.get('/seller/products').then(r => setProducts(r.data))

    }

    const handleStartAdding = () => {
        setIsAdding(true)
    }

    const handleStopAdding = () => {
        setIsAdding(false)
    }

    const handleStartChangingSettings = () => {
        setIsChangingSettings(true)
    }

    const handleStopChangingSettings = () => {
        setIsChangingSettings(false)
    }

    const handleAddSeller = () => {
        handleStopChangingSettings()

        Api.post('/profile/settings', { seller_id: parseInt(sellerid), seller_key: sellerkey }).then(r => console.log(r.data))
    }
    return (
        <>
            <div>
                
                    <Row style={{marginBottom: 20}} gutter={16}>
                        <Col span={8}>
                        </Col>
                        <Col span={8}>

                            
                            { isAdding ? <><Input value={name} onChange={e => setName(e.target.value)} onPressEnter={handleAddProduct} placeholder="Введите наименование" />
                                <Button style={{ marginTop: 10, marginRight: 10 }} onClick={handleAddProduct} type="primary">Добавить</Button>
                                <Button type="primary" danger onClick={handleStopAdding}>Отмена</Button></> : <Button type="primary" block onClick={handleStartAdding}>Добавить</Button> }

                                
                                { isChangingSettings ? 
                                    <div>
                                        <p style={{ marginTop: 10}}>SellerID</p>
                                        <Input onChange={(e) => setSellerid(e.target.value)} value={sellerid} style={{ marginTop: 0, width: 200 }} />
                                        <p style={{ marginTop: 10 }}>SellerKey</p>
                                        <Input onChange={(e) => setSellerkey(e.target.value)} value={sellerkey} style={{ marginTop: 0, width: 200 }} />
                                    </div> 
                                    
                                    : <></> }
                        </Col>
                        <Col span={8}>
                            <Button style={{ marginRight: 10 }}><Link to="/profile"><UserOutlined /></Link></Button>
                            { isChangingSettings ? 
                            
                                <>
                                    <Button onClick={handleStopChangingSettings} style={{ marginRight: 10 }} type="primary"><CloseOutlined /></Button>
                                    <Button onClick={handleAddSeller} type="primary"><PlusOutlined /></Button>
                                </>
                            
                            : <Button onClick={handleStartChangingSettings} type="primary"><SettingOutlined /></Button> }
                            <Button style={{ marginLeft: 10 }}><Link to="/seller/history">История</Link></Button>

                            
                        </Col> 
                    </Row>
                { products ? products.map(i => {
                    return (
                    <>
                    
                        <Row style={{marginBottom: 20}} gutter={8}>
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                                <Card
                                    style={{ width: '100%' }}
                                    title={ isChangingName[1] & isChangingName[0] === i.product_id ? <><Input onChange={(e) => setNewName(e.target.value)} value={newName} style={{ width: 150 }} /> <Button onClick={() => {
                                        Api.patch(`/seller/products/${i.product_id}`, { product_title: newName })
                                        window.location.reload();
                                    }}><CheckOutlined /></Button> </> : i.product_title}
                                    extra={
                                        <>
                                            <Link style={{ marginRight: 20 }} to={`/seller/products/${i.product_id}`}>Перейти</Link>
                                            { isChangingName[1] & isChangingName[0] === i.product_id ? <Button onClick={() => setIsChangingName([0, false])} style={{ marginRight: 10 }} danger>Отмена</Button> : <Button onClick={() => setIsChangingName([i.product_id, true])} style={{ marginRight: 10 }} danger>Изменить</Button>}
                                            
                                            <Button onClick={() => {
                                                Api.delete(`/seller/products/${i.product_id}`)
                                            }} danger>Удалить</Button>
                                        </>
                                
                                }
                                >
                                    <p>{`Количество подтипов: ${i.count_subtypes}`}</p>
                                </Card>
                            </Col>
                            <Col span={8}>


                            </Col> 
                        </Row>
                    
                    </>
                    )

                }) : <></> }
                
            </div>
        </>
    )
}

export default Main
