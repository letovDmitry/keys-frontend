import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Input, Popconfirm } from 'antd'
import { Api } from '../api/api'
import { Link } from 'react-router-dom'
import { SettingOutlined, UserOutlined, CloseOutlined, PlusOutlined, CheckOutlined, HistoryOutlined } from '@ant-design/icons'

function Main() {

    const [ products, setProducts ] = useState([])
    const [ isAdding, setIsAdding ] = useState(false)

    const [ sellerid, setSellerid ] = useState('')
    const [ sellerkey, setSellerkey ] = useState('')

    const [ isChangingSettings, setIsChangingSettings ] = useState(false)

    const [ nameRU, setNameRU ] = useState('')
    const [ nameENG, setNameENG ] = useState('')
    const [ itemId, setItemId ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ message, setMessage ] = useState('')
    
    const [ isChangingName, setIsChangingName ] = useState([0, false])

    const [ newName, setNewName ] = useState('')
    const [ newDescription, setNewDescription ] = useState('')
    const [ newMessage, setNewMessage ] = useState('')

    useEffect(() => {
        Api.get('/seller/category').then(r => setProducts(r.data))
    }, [])

    const handleAddProduct = () => {
        Api.post('/seller/category', {message, title_ru: nameRU, title_eng: nameENG, itemId: parseInt(itemId), description}, ).then(r => console.log(r.data))
        setNameRU('')
        setNameENG('')
        setItemId('')
        setDescription('')
        window.location.reload()
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

    const confirm = (id) => {
        Api.delete(`/seller/category/${id}`).then(() => {
            window.location.reload()
    })}
      
      const cancel = (e) => {};

    return (
        <>
            <div>
                
                    <Row style={{marginBottom: 20}} gutter={16}>
                        <Col span={8}>
                        </Col>
                        <Col span={8}>

                            
                            { isAdding ? 
                                <>
                                    <Input value={nameRU} onChange={e => setNameRU(e.target.value)} onPressEnter={handleAddProduct} style={{ marginBottom: 10 }} placeholder="?????????????? ???????????????????????? ???? ??????????????" />
                                    <Input value={nameENG} onChange={e => setNameENG(e.target.value)} onPressEnter={handleAddProduct} style={{ marginBottom: 10 }} placeholder="?????????????? ???????????????????????? ???? ????????????????????" />
                                    <Input value={description} onChange={e => setDescription(e.target.value)} onPressEnter={handleAddProduct} style={{ marginBottom: 10 }} placeholder="?????????????? ???????????????? ????????????" />
                                    <Input value={message} onChange={e => setMessage(e.target.value)} onPressEnter={handleAddProduct} style={{ marginBottom: 10 }} placeholder="?????????????? ??????????????????" />
                                    <Input value={itemId} onChange={e => setItemId(e.target.value)} onPressEnter={handleAddProduct} style={{ marginBottom: 10 }} placeholder="?????????????? id ????????????" />
                                    <Button style={{ marginTop: 10, marginRight: 10 }} onClick={handleAddProduct} type="primary">????????????????</Button>
                                    <Button type="primary" danger onClick={handleStopAdding}>????????????</Button></> : <Button type="primary" block onClick={handleStartAdding}>????????????????</Button> }

                                
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
                            
                            // : <Button onClick={handleStartChangingSettings} type="primary"><SettingOutlined /></Button> }
                            : <></> }
                            <Button style={{ marginLeft: 10 }}><Link to="/history">??????????????</Link></Button>

                            
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
                                    title={ isChangingName[1] & isChangingName[0] === i.id ? <><Input onChange={(e) => setNewName(e.target.value)} value={newName} style={{ width: 150 }} /> <Button onClick={() => {
                                        Api.patch(`/seller/category/${i.id}`, { title_ru: newName, description: newDescription, message: newMessage })
                                        window.location.reload();
                                    }}><CheckOutlined /></Button> </> : `${i.title_ru} - ${i.title_eng}`}
                                    extra={
                                        <>
                                            <Link style={{ marginRight: 20 }} to={`/${i.id}`}>??????????????</Link>
                                            { isChangingName[1] & isChangingName[0] === i.id ? <Button onClick={() => setIsChangingName([0, false])} style={{ marginRight: 10 }} danger>????????????</Button> : <Button onClick={() => setIsChangingName([i.id, true])} style={{ marginRight: 10 }} danger>????????????????</Button>}
                                            
                                            <Popconfirm
                                                title="??????????????"
                                                onConfirm={() => confirm(i.id)}
                                                onCancel={cancel}
                                                okText="????"
                                                cancelText="??????"
                                            ><Button danger>??????????????</Button></Popconfirm>
                                            
                                        </>
                                
                                }
                                >
                                    <p>{`???????????????????? ????????????????: ${i.count_subcategories}`}</p>
                                    <p>{isChangingName[1] & isChangingName[0] === i.id ? <Input onChange={(e) => setNewDescription(e.target.value)} value={newDescription} style={{ width: 150 }} /> : `????????????????: ${i.description}`}</p>
                                    <p>{isChangingName[1] & isChangingName[0] === i.id ? <Input onChange={(e) => setNewMessage(e.target.value)} value={newMessage} style={{ width: 150 }} /> : `??????????????????: ${i.message}`}</p>
                                    <p>{`????????: ${i.created_at.split('.')[0]}`}</p>
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
