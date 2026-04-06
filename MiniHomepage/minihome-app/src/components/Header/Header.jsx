import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Header = () => {

  const { isLogin, logout, hasRole } = useAuth()

  return (
    <header>
        <h1>미니홈피</h1>
        <div className="util">
        <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/profile">프로필</Link></li>
            <li><Link to="/guestbook">방명록</Link></li>
            { 
              isLogin 
              ?
              <>
                { hasRole('ROLE_ADMIN') && <li><Link to="/room">방 꾸미기</Link></li> }
                <li><Link to="/user">프로필 수정</Link></li>
                <li><button className='btn' onClick={ () => logout() }>로그아웃</button></li>
              </>
              :
              <>
                <li><Link to="/login">로그인</Link></li>
                <li><Link to="/join">회원가입</Link></li>
              </>
            }            
        </ul>
      </div>
    </header>
  )
}

export default Header