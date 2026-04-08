import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/common/Layout'

const Profile = () => {
  const { username } = useParams()

  return (
    <Layout>
      <h1>{username}의 프로필</h1>
    </Layout>
  )
}

export default Profile