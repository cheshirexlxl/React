import api from './api'

// 회원가입
export const join = (data) => api.post('/users', data)

// 로그인
export const login = (username, password) => {
    return api.post('/login', {username, password})
}

// 회원 정보
export const info = ()  => api.get('/users/profile')

// 회원 정보 수정
export const update = (data) => api.put('/users', data)

// 회원 탈퇴
export const remove = (username) => api.delete(`/users/${username}`)

// 프로필 이미지 업로드
export const uploadProfileImage = (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

// 방명록 목록 조회
export const getGuestbook = (ownerId, page, size = 10) =>
    api.get(`/guestbook/${ownerId}`, { params: { page, size } })

// 방명록 작성
export const createGuestbook = (data) => api.post('/guestbook', data)

// 방명록 삭제
export const deleteGuestbook = (id, password) =>
    api.delete(`/guestbook/${id}`, { data: { password } })