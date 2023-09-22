import React from 'react'

type Props = {
    params: {id: string}
}

export default function Detail({params}: Props) {
  return (
    <div>Detail ID: {params.id}</div>
  )
}