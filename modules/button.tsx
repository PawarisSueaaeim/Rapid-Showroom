import React from 'react'
import Button from '@mui/material/Button';

type Props = {
    vatiant?: "outlined" | "contained",
    title: string
}

export default function ButtonStyle({title,vatiant}: Props) {
  return (
    <Button variant={vatiant}>
        {title}
    </Button>
  )
}