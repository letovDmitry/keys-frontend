import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Col, Row, Button, Input } from 'antd'
import { Api } from '../api/api'
import { CheckOutlined, ClearOutlined, CloseOutlined } from '@ant-design/icons'
import { Radio } from 'antd';
const { TextArea } = Input;


function Keys() {
    const [ keys, setKeys ] = useState([])
    const [ newTitle,  setNewTitle ] = useState('')

    const [ howManyKeys, setHowManyKeys ] = useState('one')

    const [ isChangingKey, setIsChangingKey ] = useState([ 0, false ])

    const [ isAddingKeys, setIsAddingKeys ] = useState(false)

    const [ content, setContent ] = useState('')

    const { id, sid } = useParams()
    
    const options = [ 'one', 'many' ]
    console.log(content)
    
    useEffect(() => {
        console.log(sid, id)
        Api.get('/seller/category/' + id + '/subcategory/' + sid).then(r => {
            setKeys(r.data.products)
        })
    }, [])


    return (
        <>
            <Row style={{marginBottom: 20}} gutter={16}>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{ width: '100%' }}
                        >
                            <p>{`Количество ключей: ${keys ? keys.length : 0}`}</p>

                            <Radio.Group options={options} value={howManyKeys} onChange={e => setHowManyKeys(e.target.value) } optionType="button" />
                        </Card>
                        {

                            isAddingKeys ? 
                                <>
                                    <TextArea value={content} onChange={e => setContent(e.target.value)} style={{ marginTop: 10 }} placeholder="Введите ключи" autoSize />
                                    <Button onClick={() => setIsAddingKeys(false)} style={{ marginRight: 10, marginTop: 10 }}>x</Button>
                                    <Button onClick={() => {
                                        Api.post(`/seller/category/${id}/subcategory/${sid}/${howManyKeys}`, { content: content } )
                                        setContent('')
                                        window.location.reload()
                                    }}>+</Button>
                                </>
                                
                            :

                            <Button type="primary" onClick={() => setIsAddingKeys(true)} style={{ width: '100%', marginTop: 10 }}>Добавить</Button>

                        }
                    </Col>
                    <Col span={8}>
                        <Link to={`/${id}`}><Button>Назад</Button></Link>
                    </Col> 
                </Row>
                
                {/* { isAdding ? 

                    <>
                        <Row style={{marginBottom: 20}} gutter={16}>
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                                <Input value={name} onChange={e => setName(e.target.value)} onPressEnter={handleAddSubtype} placeholder="Введите наименование" />
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
                    } */}

                { keys ? keys.map(i => {
                    return (
                        <Row style={{marginBottom: 20}} gutter={16}>
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                                <Card
                                    style={{ width: '100%' }}
                                    title={ isChangingKey[1] && isChangingKey[0] === i.id ? <><Input onChange={e => setNewTitle(e.target.value) } value={newTitle} style={{ width: 200 }} placeholder='Название' /> <Button onClick={() => setIsChangingKey([0, false])}>x</Button> <Button onClick={() => {
                                        setIsChangingKey([0, false])
                                        Api.patch(`/seller/category/${id}/subcategory/${sid}/products/${i.id}`, { content: newTitle }).then(r => console.log(r.data))
                                        setNewTitle('')
                                        window.location.reload()
                                    }}>+</Button></> :`Ключ`}
                                    extra={<>
                                            <Button onClick={() => setIsChangingKey([ i.id, true ])} style={{ margin: 10 }}>Обновить</Button>
                                            <Button danger onClick={() => {
                                                Api.delete(`/seller/category/${id}/subcategory/${sid}/products/${i.id}`).then(() => {
                                                    window.location.reload()
                                                })
                                            }}>Удалить</Button>
                                        </>
                                    }
                                >
                                    {i.content.split('\n').map(k => <p>{k}</p>)}
                                    <p>{`Дата: ${i.created_at.split('.')[0]}`}</p>
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

export default Keys
