import React, { useState } from 'react'
import { Trash2 } from 'lucide-react'

const GuestbookItem = ({ item, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false)
  const [password, setPassword] = useState('')

  const handleDelete = () => {
    if (!password.trim()) return
    onDelete(item.id, password)
    setPassword('')
    setShowDelete(false)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-start gap-3">
        {/* 프로필 아이콘 */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-xl flex-shrink-0">
          🐱
        </div>
        {/* 내용 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-sm text-gray-900">{item.nickname}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
              <button
                type="button"
                className="text-gray-300 hover:text-red-400 transition-colors"
                onClick={() => setShowDelete(prev => !prev)}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{item.content}</p>
          {/* 삭제 비밀번호 입력 */}
          {showDelete && (
            <div className="flex gap-2 mt-2">
              <input
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDelete()}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
              <button
                type="button"
                onClick={() => { setShowDelete(false); setPassword('') }}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-500 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GuestbookItem