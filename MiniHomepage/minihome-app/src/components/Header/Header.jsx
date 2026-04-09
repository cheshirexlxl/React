import React from 'react'
import { Link, NavLink, useParams, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { House, LogOut, UserKey } from 'lucide-react'

const Header = () => {

  const { isLogin, logout, hasRole, userInfo } = useAuth()
  const { username } = useParams()
  const location = useLocation()

  const isJoinPage = location.pathname === '/join'

  // 현재 URL의 username 또는 로그인한 유저의 username 사용
  const owner = username || userInfo?.username || ''

  // 본인 페이지 여부: 로그인 상태 + URL의 username이 본인 username과 일치
  const isOwner = isLogin && userInfo?.username === username

  return (
    <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50">
        <div className='container flex items-center justify-between'>
          <Link to={`/${owner}`} className="text-xl font-semibold text-gray-800 tracking-tight">
            {!isJoinPage ? <><span className='text-2xl text-primary font-extrabold'>{username}</span> <span className='font-normal'>MINI HOMPY</span></> : <span>MINI HOMPY</span>}
          </Link>
          <div className="util">
            <ul className='flex gap-2'>
                <li><NavLink to={`/${owner}`} end>홈</NavLink></li>
                { !isJoinPage && <>
                <li><NavLink to={`/${owner}/profile`}>프로필</NavLink></li>
                <li><NavLink to={`/${owner}/guestbook`}>방명록</NavLink></li>
                { 
                  isOwner
                  ?
                  <>
                    { hasRole('ROLE_ADMIN') && <li><NavLink to={`/${owner}/room`}>방 꾸미기</NavLink></li> }
                    <li><NavLink to={`/${owner}/user`}>프로필 수정</NavLink></li>
                    <li><Link onClick={ () => logout() } className='point'><LogOut size={16} /> 로그아웃</Link></li>
                  </>
                  :
                  <>
                    { !isLogin && <li><NavLink to={`/${owner}/login`} className='point'><UserKey size={16} /> 로그인</NavLink></li> }
                    { isLogin && <li><NavLink to={`/${userInfo?.username}`} className='point'><House size={16} /> 내 미니홈피로 가기</NavLink></li> }
                  </>
                }
                </> }
            </ul>
          </div>          
        </div>
    </header>
  )
}

export default Header