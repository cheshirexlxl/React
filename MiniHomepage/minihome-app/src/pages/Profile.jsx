import React, { useRef, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/common/Layout'
import { Mail, Calendar, Cake } from 'lucide-react'
import useOwner from '../hooks/useOwner'
import { ICONS } from '../components/Guestbook/guestbookIcons'

// 더미 데이터
const DUMMY_GUESTBOOK = [
    { id: 1, nickname: '봄바람', icon: '🌸', content: '홈피 너무 귀엽다~ 자주 놀러올게요! 고양이도 너무 귀엽고 ㅠㅠ', date: '04.03' },
    { id: 2, nickname: '별빛소나타', icon: '⭐', content: '고냥이 너무 귀여워요 ㅠㅠ 이름이 뭐예요?', date: '04.02' },
    { id: 3, nickname: '초코라떼', icon: '🐹', content: '오랜만이에요! 잘 지내고 있죠? 다음에 같이 카페 가요~', date: '04.01' },
]
const DUMMY_STATS = { today: 12, weekly: 84, monthly: 312, total: 3284 }
const DUMMY_CHART = [
    { day: '월', count: 8 },
    { day: '화', count: 15 },
    { day: '수', count: 6 },
    { day: '목', count: 20 },
    { day: '금', count: 11 },
    { day: '토', count: 18 },
    { day: '일', count: 40 },
]
const MAX_COUNT = Math.max(...DUMMY_CHART.map(d => d.count))

const Profile = () => {
    const { username } = useParams()
    const { owner } = useOwner()

    // 방명록 인라인 폼 상태
    const formRef = useRef(null)
    const popupRef = useRef(null)
    const [iconOpen, setIconOpen] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState(ICONS[0])

    useEffect(() => {
        const handleOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) setIconOpen(false)
        }
        if (iconOpen) document.addEventListener('mousedown', handleOutside)
        return () => document.removeEventListener('mousedown', handleOutside)
    }, [iconOpen])

    const handleGuestbookSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const nickname = form.nickname.value.trim()
        const password = form.password.value.trim()
        const content = form.content.value.trim()
        if (!nickname || !password || !content) return
        // TODO: API 연동
        console.log({ nickname, password, content, icon: selectedIcon.key })
        formRef.current.reset()
    }

    const SelectedIconComponent = selectedIcon.component

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        const d = new Date(dateStr)
        return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
    }

    return (
        <Layout>            
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 items-start">
                {/* 왼쪽: 프로필 카드 */}
                <div className="flex flex-col gap-4">
                    {/* 프로필 정보 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        {/* 프로필 이미지 */}
                        <div className="flex justify-center mb-4">
                            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                                {owner?.profileImage
                                    ? <img src={owner.profileImage} alt="profile" className="w-full h-full object-cover" />
                                    : <span className="text-5xl">🐱</span>
                                }
                            </div>
                        </div>
                        {/* 이름 / 소개 */}
                        <div className="text-center mb-5">
                            <h2 className="text-lg font-bold text-gray-900">{owner?.nickname ?? username}</h2>
                            {owner?.bio && <p className="text-sm text-gray-500 mt-1 leading-relaxed">{owner.bio}</p>}
                        </div>
                        {/* 상세 정보 */}
                        <div className="flex flex-col gap-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
                            {owner?.email && (
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-gray-400 flex-shrink-0" />
                                    <span>{owner.email}</span>
                                </div>
                            )}
                            {owner?.createdAt && (
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                                    <span>{formatDate(owner.createdAt)} 가입</span>
                                </div>
                            )}
                            {owner?.birthDate && (
                                <div className="flex items-center gap-2">
                                    <Cake size={14} className="text-gray-400 flex-shrink-0" />
                                    <span>{formatDate(owner.birthDate)}</span>
                                </div>
                            )}
                        </div>
                        {/* 방문자 수 */}
                        <div className="grid grid-cols-2 gap-2 mt-5 border-t border-gray-100 pt-4">
                            <div className="text-center">
                                <p className="text-xl font-bold text-gray-900">{DUMMY_STATS.today}</p>
                                <p className="text-xs text-gray-400 mt-0.5">오늘 방문</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-gray-900">{DUMMY_STATS.total.toLocaleString()}</p>
                                <p className="text-xs text-gray-400 mt-0.5">전체 방문</p>
                            </div>
                        </div>
                    </div>

                    {/* TODAY'S MOOD */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
                        <p className="text-xs font-semibold text-gray-400 tracking-widest mb-3">TODAY'S MOOD</p>
                        <div className="text-4xl mb-2">😊</div>
                        <p className="text-sm text-gray-500">"오늘도 좋은 하루"</p>
                    </div>
                </div>

                {/* 오른쪽 */}
                <div className="flex flex-col gap-6 min-w-0">
                    {/* 방명록 미리보기 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">방명록</h3>
                                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full font-medium">3 new</span>
                            </div>
                            <Link to={`/${username}/guestbook`} className="text-xs text-gray-500 border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                                전체보기
                            </Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            {DUMMY_GUESTBOOK.map(item => (
                                <div key={item.id} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-base flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-sm font-semibold text-gray-800">{item.nickname}</span>
                                            <span className="text-xs text-gray-400">{item.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 인라인 방명록 입력 폼 */}
                        <form ref={formRef} onSubmit={handleGuestbookSubmit} className="mt-4 p-4 bg-gray-100 rounded-xl space-y-2">
                            <textarea
                                name="content"
                                placeholder="방명록을 남겨주세요 :)"
                                maxLength={300}
                                rows={2}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none bg-white"
                            />
                            <div className="flex items-center gap-2">
                                {/* 아이콘 선택 */}
                                <div className="relative" ref={popupRef}>
                                    <button
                                        type="button"
                                        onClick={() => setIconOpen(prev => !prev)}
                                        className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 text-primary-dark hover:bg-primary-dark hover:text-white transition-colors flex-shrink-0"
                                    >
                                        <SelectedIconComponent size={18} />
                                    </button>
                                    {iconOpen && (
                                        <div className="absolute bottom-full left-0 mb-1 z-10 bg-white border border-gray-200 rounded-xl shadow-lg p-2 grid grid-cols-4 gap-1 w-40">
                                            {ICONS.map(({ key, component: Icon }) => (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => { setSelectedIcon({ key, component: Icon }); setIconOpen(false) }}
                                                    className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${selectedIcon.key === key ? 'bg-gray-100 ring-2 ring-primary' : ''}`}
                                                >
                                                    <Icon size={16} />
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
                                    className="flex-2 min-w-0 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="비밀번호"
                                    maxLength={20}
                                    required
                                    className="flex-1 min-w-0 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
                                >
                                    남기기
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* 방문 통계 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4">방문 통계</h3>
                        <div className="grid grid-cols-4 gap-3 mb-6">
                            {[
                                { label: '오늘', value: DUMMY_STATS.today },
                                { label: '이번 주', value: DUMMY_STATS.weekly },
                                { label: '이번 달', value: DUMMY_STATS.monthly },
                                { label: '전체', value: DUMMY_STATS.total.toLocaleString() },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <p className="text-xl font-bold text-gray-900">{value}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                                </div>
                            ))}
                        </div>
                        {/* 막대 차트 */}
                        <p className="text-xs text-gray-400 mb-3">최근 7일</p>
                        <div className="flex items-end gap-2 h-20">
                            {DUMMY_CHART.map(({ day, count }) => (
                                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                                    <div
                                        className="w-full rounded-t-sm bg-indigo-200"
                                        style={{ height: `${(count / MAX_COUNT) * 64}px` }}
                                    />
                                    <span className="text-xs text-gray-400">{day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>            
        </Layout>
    )
}

export default Profile
