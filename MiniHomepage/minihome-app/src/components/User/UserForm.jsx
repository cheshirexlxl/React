import React, { useRef, useState } from 'react'
import { Save, Upload, Trash2, Asterisk } from 'lucide-react';
import * as Swal from '../../apis/alert';
import * as auth from '../../apis/auth';

const UserForm = ({ userInfo, updateUser, deleteUser }) => {

    const fileInputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
    const [profileImageUrl, setProfileImageUrl] = useState(userInfo?.profileImage || '')

    // 파일 선택 시 미리보기 + 업로드
    const onFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // 미리보기
        const objectUrl = URL.createObjectURL(file)
        setPreviewUrl(objectUrl)

        // 서버 업로드
        try {
            const response = await auth.uploadProfileImage(file)
            setUploadedImageUrl(response.data)  // 예: "/files/profile/uuid.jpg"
        } catch (error) {
            Swal.alert('업로드 실패', '이미지 업로드에 실패했습니다.', 'error')
            setPreviewUrl(null)
        }
    }

    const onUpdate = (e) => {
        e.preventDefault()
        const form = e.target
        const username = form.username.value
        const password = form.password.value
        const passwordConfirm = form.passwordConfirm.value
        const nickname = form.nickname.value
        const bio = form.bio.value
        const email = form.email.value
        const birthDate = form.birthDate.value
        const profileImage = uploadedImageUrl ?? profileImageUrl

        // 비밀번호 입력한 경우에만 일치 여부 검증
        if (password && password !== passwordConfirm) {
            Swal.alert('비밀번호 불일치', '비밀번호와 비밀번호 확인이 일치하지 않습니다.', 'error')
            return
        }

        // 비밀번호 미입력 시 null로 전송 → 백엔드에서 기존 비밀번호 유지
        updateUser( { username, password: password || null, nickname, bio, email, birthDate, profileImage } )
    }

    return (
        <div className='container-sm'>      
            <form className="login-form" onSubmit={ (e) => onUpdate(e) }>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">프로필 수정</h2>
                    <div className="flex gap-2">
                        <button
                            type='submit'
                            className="btn-outline-primary px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 font-medium text-sm"
                        >
                            <Save size={18} />
                            저장하기
                        </button>
                        <button
                            type='button'
                            className='btn-outline-dark px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 font-medium text-sm'
                            onClick={ () => deleteUser( userInfo.username ) }
                        >
                            회원 탈퇴
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                    <div className="space-y-6">
                        {/* 프로필 사진 */}
                        <div className="flex flex-col items-center pb-6 border-b border-gray-200">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-5xl mb-4">
                                {(previewUrl || userInfo.profileImage) ? (
                                <img
                                    src={previewUrl || userInfo.profileImage}
                                    alt="프로필"
                                    className="w-full h-full rounded-full object-cover"
                                />
                                ) : (
                                '🐱'
                                )}
                            </div>
                            {/* 숨겨진 파일 input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                className="hidden"
                                onChange={onFileChange}
                            />
                            <button 
                                type="button"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <Upload size={16} />
                                사진 변경
                            </button>
                            <p className="text-xs text-gray-500 mt-2">
                                이미지 파일을 선택하거나 URL을 직접 입력하세요
                            </p>
                        </div>

                        {/* 프로필 이미지 URL (옵션) */}
                        <div className="border-gray-200">
                            <label htmlFor='profileImage' className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                                프로필 이미지 URL (선택사항)
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    id='profileImage'
                                    name='profileImage'
                                    placeholder="이미지 URL을 입력하세요"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    value={profileImageUrl}
                                    onChange={(e) => setProfileImageUrl(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="hover:text-blue-500 transition-colors flex-shrink-0"
                                    onClick={() => {
                                        setProfileImageUrl('')
                                        setUploadedImageUrl(null)
                                        setPreviewUrl(null)
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                비워두면 기본 이모지가 표시됩니다
                            </p>
                        </div>

                        {/* 기본 정보 */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                                    아이디
                                </label>
                                <input type="text" 
                                    id="username"
                                    name="username"
                                    placeholder='username'
                                    autoComplete='username'
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-default"
                                    readOnly
                                    defaultValue={ userInfo?.username }
                                />
                            </div>

                            <div>
                                <label htmlFor="createdAt" className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                                    가입일
                                </label>
                                <input
                                    type="text"
                                    id="createdAt"
                                    name="createdAt"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-default"
                                    readOnly
                                    value={ userInfo?.createdAt ? new Date(userInfo.createdAt).toISOString().substring(0, 10) : '' }
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                                    비밀번호 (변경시에만 입력)
                                </label>
                                <input type="password" 
                                    id="password"
                                    name="password"
                                    placeholder='변경 시에만 입력하세요 (미입력 시 유지)'
                                    autoComplete='new-password'
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="passwordConfirm" className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                                    비밀번호 확인
                                </label>
                                <input type="password" 
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    placeholder='비밀번호를 한번 더 입력하세요'
                                    autoComplete='new-password'
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="nickname" className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                                    닉네임
                                    <Asterisk size={12} className="text-red-500" />
                                </label>
                                <input
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    placeholder="닉네임을 입력하세요"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    required
                                    defaultValue={ userInfo?.nickname }
                                />
                            </div>

                            <div>
                                <label htmlFor="bio" className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                                    한줄 소개
                                    <Asterisk size={12} className="text-red-500" />
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    placeholder='한줄 소개를 간략히 적어주세요'
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                                    rows={3}
                                    required
                                    defaultValue={ userInfo?.bio }
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                                    이메일
                                    <Asterisk size={12} className="text-red-500" />
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="예) test@example.com"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    required
                                    defaultValue={ userInfo?.email }
                                />
                            </div>

                            <div>
                                <label htmlFor="birthDate" className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                                    생일
                                    <Asterisk size={12} className="text-red-500" />
                                </label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    required
                                    defaultValue={ userInfo?.birthDate ? new Date(userInfo.birthDate).toISOString().substring(0, 10) : '' }
                                />
                            </div>                            
                        </div>
                        
                    </div>
                </div>
            </form>     

        </div>
    )
}

export default UserForm