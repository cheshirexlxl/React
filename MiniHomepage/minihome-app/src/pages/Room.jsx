import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/common/Layout'

const Room = () => {
  const { username } = useParams()

  return (
    <Layout>
      <h1>{username}의 방</h1>
    </Layout>
  )
}

export default Room