import React from 'react'

type Props = {
    title: string,
    color: string,
    bgColor: string,
    border?: string,
    boxShadow?: boolean,
    outline?: boolean,
    fontSize?: number,
}

export default function ButtonCapsule({title , color, bgColor, border, boxShadow, outline, fontSize}: Props) {
  return (
    <div>
        <button style={{
            backgroundColor: bgColor,
            border: border ? border : 'none',
            borderRadius: '28px',
            boxShadow: boxShadow ? '0 0 10px rgba(0,0,0,0.1)' : 'none',
            width: '100%',
            padding: '8px',
            fontSize: fontSize,
            color: color,
            textAlign: 'center',
            textDecoration: 'none',
            outline: outline ? "" : 'none',
            cursor: 'pointer',
        }}>
            {title}
        </button>
    </div>
  )
}