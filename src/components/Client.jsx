import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Button, Card, } from 'antd'
import { Api } from '../api/api';



function Client() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ product, setProduct ] = useState({})

    const { username } = useParams()

    useEffect(() => {
        document.body.style.backgroundColor = '#679ED2'
        Api.get(`/client/${username}?uniquecode=${searchParams.get('uniquecode')}`).then((r) => setProduct({ keys: r.data }))
    }, [])

    return (
        <div style={{ backgroundColor: '#679ED2', color: 'white' }}>
            
            <Card
                style={{ width: '100%', backgroundColor: '#408AD2', color: 'white' }}
                title={<p style={{ color: 'white' }}>Номер заказа: {product.keys ? product.keys[0].unique_inv: 0}, Уникальный код: {product.keys ? product.keys[0].unique_code: 0}</p>}

                extra={ <Button><a href='https://oplata.info/info/'>Оставить отзыв</a></Button> }
                                    
            >
                <Card
                    style={{ width: '100%', backgroundColor: '#04396C', color: 'white' }}
                    title={<p style={{ color: 'white' }}>Ключи</p>}
                                    
                >
                    { product.keys ? product.keys.map(i => <>
                    
                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <p style={{ fontSize: 15 }}>{`Дата: ${i.date_check}`}   •   Продукт: {`${i.category_name} • Подтип: ${i.subcategory_name}`}</p>
                        </div>
                        <p>Ключ: {i.content_key}</p>
                    </>) : <></> }
                
                </Card>
            </Card> 
            
        </div>
    )
}

export default Client
