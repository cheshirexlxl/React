import React, { useRef } from 'react'
import { PenLine } from 'lucide-react'

const GuestbookForm = ({ onCreate }) => {
  const formRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const nickname = form.nickname.value.trim()
    const password = form.password.value.trim()
    const content = form.content.value.trim()

    if (!nickname || !password || !content) return

    onCreate({ nickname, password, content })
    formRef.current.reset()
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          maxLength={20}
          required
          className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          maxLength={20}
          required
          className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div className="flex gap-3">
        <textarea
          name="content"
          placeholder="방명록을 남겨보세요"
          maxLength={300}
          rows={3}
          required
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <button
          type="submit"
          className="btn-outline-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 self-end"
        >
          <PenLine size={16} />
          작성
        </button>
      </div>
    </form>
  )
}

export default GuestbookForm