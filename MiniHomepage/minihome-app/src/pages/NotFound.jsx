import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-2">페이지를 찾을 수 없습니다</p>
      <p className="text-sm text-gray-400 mb-8">존재하지 않는 주소이거나 삭제된 페이지입니다.</p>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
      >
        이전으로
      </button>
    </div>
  )
}

export default NotFound
