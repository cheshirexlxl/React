import React from 'react'
import Layout from '../components/common/Layout'
import useAuth from '../hooks/useAuth'

const Home = () => {

  const { isLogin } = useAuth()

  return (
    <Layout>
      <h1>Home</h1>
      <hr />
      <h2>메인 화면</h2>    
      <h3>
        로그인 여부 : { isLogin ? '로그인' : '로그아웃' }
      </h3>
    </Layout>
  )
}

export default Home