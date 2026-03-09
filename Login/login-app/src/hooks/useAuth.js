import React, { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContextProvider'

/**
 * userAuth 커스텀 훅
 * - userContext(LoginContext) 를 공통으로 쉽게 호출
 * - Provider 밖에서 호출 시 예외 강제 발생 및 에러 메시지 출력
 * @returns
 */
const useAuth = () => {
  const context = useContext(LoginContext)
  if(!context) {
    throw new Error('Provider 로 지정받은 컴포넌트에서만 사용할 수 있습니다.')
  }
  return context
}

export default useAuth