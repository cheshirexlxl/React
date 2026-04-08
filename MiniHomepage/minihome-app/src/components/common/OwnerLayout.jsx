import React from 'react'
import { Outlet } from 'react-router-dom'
import useOwner from '../../hooks/useOwner'
import NotFound from '../../pages/NotFound'

// /:username/* 라우트의 공통 레이아웃
// owner가 없거나 ROLE_ADMIN이 아닌 경우 NotFound 표시
const OwnerLayout = () => {
  const { owner, notFound, loading } = useOwner()

  if (loading) return null

  if (notFound) return <NotFound />

  return <Outlet context={{ owner }} />
}

export default OwnerLayout
