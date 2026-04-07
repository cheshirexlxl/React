import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Header = () => {

  const { isLogin, logout, hasRole } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 py-4">
        <div className='container flex items-center justify-between'>
          <Link to="/" className="text-xl font-semibold text-gray-800 tracking-tight">
            MINI HOMPY
          </Link>
          <div className="util">
            <ul className='flex gap-2'>
                <li><NavLink to="/" end>홈</NavLink></li>
                <li><NavLink to="/profile">프로필</NavLink></li>
                <li><NavLink to="/guestbook">방명록</NavLink></li>
                { 
                  isLogin 
                  ?
                  <>
                    { hasRole('ROLE_ADMIN') && <li><NavLink to="/room">방 꾸미기</NavLink></li> }
                    <li><NavLink to="/user">프로필 수정</NavLink></li>
                    <li><Link onClick={ () => logout() }>로그아웃</Link></li>
                  </>
                  :
                  <>
                    <li><NavLink to="/login">로그인</NavLink></li>                    
                  </>
                }            
            </ul>
          </div>          
        </div>
    </header>
  )
}

export default Header