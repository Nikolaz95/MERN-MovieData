import React from 'react'

//import css
import './Image.css';


const Image = ({ src, alt, variant = 'default', onClick, className = '', title, ...props }) => {
    return (
        <img src={src} alt={alt} onClick={onClick}
            title={title}
            className={`image-component ${variant} ${className}`}
            {...props} />
    )
}

export default Image