import React from 'react'
import { ButtonPleumDesign } from '../button'
import { ColorSet } from '@/constants'
import { Box } from '@mui/material'
import classes from '@/style/components/common/card/cardAccept.module.css';

type Props = {}

export default function CardAccept({}: Props) {
  return (
    <Box className={classes.container}>
      <ButtonPleumDesign
          title={"ยอมรับราคา"}
          backgroundBtnColor={ColorSet.btnWhite}
          backgroundBtnHoverColor={ColorSet.btnWhiteHover}
          textBtnColor={ColorSet.textBlack}
        />
        <ButtonPleumDesign
          title={"ไม่ยอมรับราคา"}
          backgroundBtnColor={ColorSet.btnGray}
          backgroundBtnHoverColor={ColorSet.btnGrayHover}
          textBtnColor={ColorSet.textBlack}
        />
    </Box>
  )
}