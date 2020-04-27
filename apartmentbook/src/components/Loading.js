import React from 'react'
import loadingGif from '../images/gif/loading-arrow.gif'

export default function Loading({
    title
}) {
    return (
        <div className="loading">
            <h4>{title}</h4>
            <img src={loadingGif} alt="loading..." />
        </div>
    )
}
