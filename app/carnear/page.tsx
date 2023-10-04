import { Box } from '@mui/material'
import React from 'react'

type Props = {}

export default function Carnear({}: Props) {
  return (
    <Box display={"flex"} flexDirection={"column"}>
        <span className='fs-14px'>ใกล้เคียงกับ</span>
    </Box>
  )
}