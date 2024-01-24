import { Box } from '@mui/material'
import React from 'react'
import classes from './rent.module.css'
import { Search, SearchForrent } from '@/components/modules'

type Props = {}

export default function Rent({}: Props) {
  return (
    <Box className={classes.container}>
        <Box className={classes.title_page}>
            <span className='text-22px'>For Rent</span>
        </Box>
        <SearchForrent/>
    </Box>
  )
}