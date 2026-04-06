import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as auth from '../apis/auth'
import * as Swal from '../apis/alert'
import Cookies from 'js-cookie'

export const LoginContext = createContext()

const LoginContextProvider = ({ children }) => {


  const [isLoading, setIsLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [roles, setRoles] = useState(new Set())

  const navigate = useNavigate()

  // 권한 객체 리스트 파싱
  const parseRoles = (authList) => {
    if( !authList ) return new Set()
    return new Set(authList.map((obj) => obj.auth))
  }

  // 권한 확인
  const hasRole = (role) => roles.has(role)
  const hasAnyRole = (...roleList) => roleList.some((role) => roles.has(role))

  // 로그인 세팅
  const loginSetting = useCallback((userData) => {
    setIsLogin(true)
    setUserInfo(userData)
    setRoles( parseRoles(userData.authList) )
  }, [])

  // 로그아웃 세팅
  const logoutSetting = useCallback(() => {
    Cookies.remove('jwt')
    setIsLogin(false)
    setUserInfo(null)
    setRoles( new Set() )
  }, [])

  // 로그인
  const login = async (username, password) => {
    try {
        const response = await auth.login(username, password)
        const { data, headers } = response
        const authorization = headers.authorization
        const jwt = authorization.replace('Bearer ', '')

        // 쿠키에 💍JWT 저장
        Cookies.set('jwt', jwt, { expires: 5 }) // 5일 동안 유효

        // 로그인 상태 설정
        loginSetting(data)

        Swal.alert('로그인 성공', '메인 화면으로 이동합니다.', 'success',
            () => navigate('/')
        )
    } catch (error) {
        Swal.alert('로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.', 'error')
    }
  }

  // 자동 로그인
  const autoLogin = useCallback(async () => {
    const jwt = Cookies.get('jwt')

    if( !jwt ) {
        setIsLoading(false)
        return
    }

    try {
        const response = await auth.info()
        if( response.status == 200 && response.data !== 'UNATHORIZED' ) {
            loginSetting(response.data)
        }
    } catch (error) {
        console.error('자동 로그인 실패 : ', error);
        Cookies.remove('jwt')
    } finally {
        setIsLoading(false)
    }
  }, [loginSetting])

  // 로그아웃
  const logout = (force = false) => {
    if(force) {
      logoutSetting()
      navigate('/')
      return
    }

    Swal.confirm('로그아웃 하시겠습니까?', '로그아웃을 진행합니다.', 'warning',
      (result) => {
        if( result.isConfirmed ) {
          Swal.alert('로그아웃 성공', '로그아웃 되었습니다.', 'success')
          logoutSetting()
          navigate('/')
        }
      }
    )
  }
  

  // 마운트 시 자동 로그인
  useEffect(() => {
    autoLogin()
  }, [autoLogin])

  return (
    <LoginContext.Provider value={{ isLoading, isLogin, userInfo, roles, login, hasRole, hasAnyRole, logout }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider