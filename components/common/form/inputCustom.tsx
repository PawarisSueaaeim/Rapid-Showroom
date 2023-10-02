import React from 'react'
import "@/style/components/common/input.css";

type Props = {
  id: string,
  type: string,
  placeholder?: string
}

export default function InputCustom({id, type, placeholder}: Props) {
  return (
    <div>
      <input id={id} type={type} placeholder={placeholder}/>
    </div>
  )
}