import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RootRedirect = () => {
  const { isLoading, isLogin, userInfo } = useAuth()

  if (isLoading) return null

  if (isLogin && userInfo?.username) {
    return <Navigate to={`/${userInfo.username}`} replace />
  }

  return <Navigate to="/join" replace />
}

export default RootRedirect
