import React, { useRef, useState, useEffect } from 'react'
import { PenLine, MessageSquareMore, ChevronDown, ChevronUp } from 'lucide-react'
import { ICONS } from './guestbookIcons'

const GuestbookForm = ({ onCreate }) => {
    const formRef = useRef(null)
    const popupRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState(ICONS[0])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        if (isOpen) document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [isOpen])

    const onSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const nickname = form.nickname.value.trim()
        const password = form.password.value.trim()
        const content = form.content.value.trim()

        if (!nickname || !password || !content) return

        onCreate({ nickname, password, content, icon: selectedIcon.key })
        formRef.current.reset()
    }

    const SelectedIconComponent = selectedIcon.component

    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-gray-900">방명록</h2>
                <div className="flex gap-2">
                    <button
                        type='button'
                        onClick={() => setShowForm(prev => !prev)}
                        className="btn-outline-primary px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 font-medium text-sm"
                    >
                        <MessageSquareMore size={18} />
                        방명록 작성
                        {showForm ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>
            </div>
            {showForm && <div className="bg-white rounded-2xl p-6 shadow-sm  mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">방명록을 남겨주세요 :)</h3>
                <form ref={formRef} onSubmit={onSubmit} className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="relative" ref={popupRef}>
                            <button
                                type="button"
                                onClick={() => setIsOpen(prev => !prev)}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-primary-dark hover:bg-primary-dark hover:border-primary-dark hover:text-white transition-colors"
                            >
                                <SelectedIconComponent size={22} />
                            </button>
                            {isOpen && (
                                <div className="absolute top-full left-0 mt-1 z-10 bg-white border border-gray-200 rounded-xl shadow-lg p-2 grid grid-cols-4 gap-1 w-40">
                                    {ICONS.map(({ key, component: Icon }) => (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => { setSelectedIcon({ key, component: Icon }); setIsOpen(false) }}
                                            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${selectedIcon.key === key ? 'bg-gray-100 ring-2 ring-primary' : ''}`}
                                        >
                                            <Icon size={18} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <input
                            type="text"
                            name="nickname"
                            placeholder="닉네임"
                            maxLength={20}
                            required
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            maxLength={20}
                            required
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                        />
                    </div>                
                    <textarea
                        name="content"
                        placeholder="방명록을 남겨보세요"
                        maxLength={300}
                        rows={3}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm resize-none"
                    />
                    <button
                        type="submit"
                        className="w-full btn-outline-primary px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-3"
                    >
                        <PenLine size={16} />
                        남기기
                    </button>               
                </form>
            </div>}
        </>
    )
}

export default GuestbookForm