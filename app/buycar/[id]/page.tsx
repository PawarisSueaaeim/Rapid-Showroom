import React from 'react'

type Props = {
    params: {id: string}
}

export default function Detail({params}: Props) {
  return (
    <div>Detail: car_ID = {params.id}</div>
  )
}