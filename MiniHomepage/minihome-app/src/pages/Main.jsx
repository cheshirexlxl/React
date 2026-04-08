import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/common/Layout'

const Main = () => {
  const { username } = useParams()

  return (
    <Layout>
      <h1>{username}의 미니홈피</h1>
    </Layout>
  )
}

export default Main