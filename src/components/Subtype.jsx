import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function Subtype() {
    const [ keys, setKeys ] = useState([])

    const { id, sid } = useParams()

    return (
        <>
            {id + ' ' + sid}
        </>
    )
}

export default Subtype
