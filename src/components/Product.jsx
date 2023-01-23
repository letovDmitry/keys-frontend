import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Col, Row, Button, Input } from 'antd'
import { Api } from '../api/api'
import { CheckOutlined, ClearOutlined, CloseOutlined } from '@ant-design/icons'



function Product() {
    const [ subtypes, setSubtypes ] = useState([])
    const [ isAdding, setIsAdding ] = useState(false)
    const [ isAddingKey, setIsAddingKey ] = useState([false, 0])
    const [ name, setName ] = useState('')
    const [ key, setKey ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ digiid, setDigiid ] = useState('')

    const [ isChangingName, setIsChangingName ] = useState([0, false])

    const [ newName, setNewName ] = useState('')

    const [ isChangingKey, setIsChangingKey ] = useState([0, false])

    const [ newKey, setNewKey ] = useState('')

    const { id } = useParams()
    
    useEffect(() => {
        Api.get('/seller/category/' + id).then(r => {
            setTitle(r.data.title)
            setSubtypes(r.data.subcategories)
        })
    }, [])

    const handleAddSubtype = () => {
        Api.post('/seller/category/' + id, {title: name, subitem_id: parseInt(digiid)}).then(r => console.log(r.data))
        setName('')

        window.location.reload()
    }

    const handleStartAdding = () => {
        setIsAdding(true)
    }

    const handleStopAdding = () => {
        setIsAdding(false)
    }

    return (
        <>
            <Row style={{marginBottom: 20}} gutter={16}>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{ width: '100%' }}
                            title={title}
                        >
                            <p>{`Количество подтипов: ${subtypes ? subtypes.length : 0}`}</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Link to="/"><Button>Назад</Button></Link>
                    </Col> 
                </Row>
                
                { isAdding ? 

                    <>
                        <Row style={{marginBottom: 20}} gutter={16}>
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                                <Input style={{ marginBottom: 10 }} value={name} onChange={e => setName(e.target.value)} onPressEnter={handleAddSubtype} placeholder="Введите наименование" />
                                <Input value={digiid} onChange={e => setDigiid(e.target.value)} onPressEnter={handleAddSubtype} placeholder="Введите DigiId" />
                                <Button style={{ marginTop: 10, marginRight: 10 }} onClick={handleAddSubtype} type="primary">Добавить</Button>
                                <Button type="primary" danger onClick={handleStopAdding}>Отмена</Button>
                                
                            </Col>
                            <Col span={8}>
                            </Col> 
                        </Row>
                    </>

                    : 
                    <Row style={{marginBottom: 20}} gutter={16}>
                        <Col span={8}>
                        </Col>
                        <Col span={8}>
                            <Button type="primary" block onClick={handleStartAdding}>Добавить</Button>
                        </Col>
                        <Col span={8}>
                        </Col> 
                    </Row>
                    }

                { subtypes ? subtypes.map(i => {
                    console.log(i)
                    return (
                        <Row style={{marginBottom: 20}} gutter={16}>
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                                <Card
                                    style={{ width: '100%' }}
                                    title={ isChangingName[1] & isChangingName[0] === i.subitem_id ? <><Input onChange={(e) => setNewName(e.target.value)} value={newName} style={{ width: 150 }} /> <Button onClick={() => {
                                        Api.patch(`seller/category/${id}/subcategory/${i.id}`, { title: newName })
                                        console.log(id)
                                        console.log(i.id)
                                        setIsChangingName([0, false])
                                        window.location.reload();

                                    }} ><CheckOutlined /></Button> </> : i.title}
                                    extra={
                                        <>
                                            { isChangingName[1] & isChangingName[0] === i.subitem_id ? 
                                                <Button onClick={() => {
                                                    setIsChangingName(false)
                                                }} danger style={{ marginRight: 10 }}>Отмена</Button>


                                            : 
                                            
                                                <Button onClick={() => {
                                                    setIsChangingName([i.subitem_id, true])
                                                }} danger style={{ marginRight: 10 }}>Изменить</Button>
                                            }

                                                <Button onClick={() => {
                                                    Api.delete(`/seller/category/${id}/subcategory/${i.id}`)
                                                    window.location.reload()
                                                }} danger style={{ marginRight: 10 }}>Удалить</Button>
                                            
                                            <Link to={`/${id}/keys/${i.id}`}>Перейти</Link>

                                            {/* <Button onClick={() => {
                                                Api.delete(`/seller/products/${id}/subtypes/${i.subitem_id}`)
                                            }} danger style={{ marginRight: 10 }}>Удалить</Button> */}
                                            {/* { isAddingKey[0] && (isAddingKey[1] === i.subitem_id) ? <><Input style={{ width: 170 }} value={key} onChange={(e) => setKey(e.target.value)} placeholder='Введите через пробел' /> <Button type='primary' style={{ marginTop: 10, marginBottom: 10 }} onClick={() => setIsAddingKey([false, isAddingKey[1]])} danger>Отмена</Button> <Button type='primary' onClick={() => handleAddKey(i.subitem_id)} style={{ marginTop: 10, marginBottom: 10 }}>Добавить</Button> </> : <Button type='primary' onClick={() => setIsAddingKey([true, i.subitem_id])} ghost>Добавить</Button> } */}
                                        </>
                                    }
                                >
                                    <b>Ключи: {i.count_products}</b>
                                    {/* { i.keys ? i.keys.map(k => <>
                                        { isChangingKey[1] & isChangingKey[0] === k.key_id ? 
                                            <>
                                                <Input value={newKey} onChange={(e) => setNewKey(e.target.value)} style={{ marginTop: 10 }} placeholder='Изменить ключ' />
                                                <Button onClick={() => {
                                                    Api.patch(`/seller/products/${id}/subtypes/${i.subitem_id}/keys/${k.key_id}`, { key: newKey })
                                                    window.location.reload();
                                                }} style={{ marginRight: 10, marginTop: 10 }} size='small'><CheckOutlined /></Button>
                                                <Button onClick={() => setIsChangingKey([0, false])} style={{ marginRight: 10, marginTop: 10 }} size='small'><CloseOutlined /></Button>
                                            </>
                                        :
                                            <>
                                                <p style={{ fontSize: 18 }}>• {k.key_content}</p>
                                                <Button onClick={() => setIsChangingKey([k.key_id, true])} style={{ marginRight: 10 }} size='small'>Изменить</Button>
                                            
                                            </>
                                        }
                                        <Button onClick={() => {
                                            Api.delete(`/seller/products/${id}/subtypes/${i.subitem_id}/keys/${k.key_id}`)
                                            window.location.reload();

                                        }} size='small' danger>Удалить</Button>
                                    
                                    </>) : <></> } */}
                                </Card>
                            </Col>
                            <Col span={8}>
                            </Col> 
                        </Row>
                    )


                }) : <></> }
        </>
    )
}

export default Product
