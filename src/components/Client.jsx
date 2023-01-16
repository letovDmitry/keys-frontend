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
        Api.get(`/product/${username}/get?uniquecode=${searchParams.get('uniquecode')}`).then((r) => setProduct(r.data))
    }, [])

    return (
        <div style={{ backgroundColor: '#679ED2', color: 'white' }}>
            
            <Card
                style={{ width: '100%', backgroundColor: '#408AD2', color: 'white' }}
                title={<p style={{ color: 'white' }}>Номер заказа: {product.keys ? product.keys[0].unique_inv: 0}</p>}

                extra={ <Button><a href='https://oplata.info/info/'>Оставить отзыв</a></Button> }
                                    
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <p style={{ fontSize: 15 }}>{`Дата: ${product.keys ? product.keys[0].date_check : 0}`}   •   Продукт: {`${product.product_title} • Подтип: ${product.subtype_title}`} • {`Количество: ${product.keys ? product.keys.length : 0}`} • {`Email: ${product.keys ? product.keys[0].email : 0}`}</p>
                </div>
                <Card
                    style={{ width: '100%', backgroundColor: '#04396C', color: 'white' }}
                    title={<p style={{ color: 'white' }}>Ключи</p>}
                                    
                >
                    { product.keys ? product.keys.map(i => <p>{i.key_content}</p>) : <></> }
                
                </Card>
            </Card> 
            
        </div>
    )
}

export default Client
