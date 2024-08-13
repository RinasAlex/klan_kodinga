import React from 'react'
import { useSelector } from 'react-redux'

const Count = () => {

    const count = useSelector(state => state.value)

    return (
        <h2>{count}</h2>
    )
}

export default Count