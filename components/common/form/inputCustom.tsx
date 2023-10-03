import React from 'react'
import classes from '@/style/components/common/form.module.css';

type Props = {
  id: string,
  type: string,
  placeholder?: string
}

export default function InputCustom({id, type, placeholder}: Props) {
  return (
    <div>
      <input className={classes.input_custom} id={id} type={type} placeholder={placeholder}/>
    </div>
  )
}