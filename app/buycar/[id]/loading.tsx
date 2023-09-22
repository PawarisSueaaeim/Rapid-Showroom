import { Box } from '@mui/material'
import React from 'react'

type Props = {}

export default function Loading({}: Props) {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>Loading...</Box>
  )
}