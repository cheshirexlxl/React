import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/common/Layout'
import UserForm from '../components/User/UserForm'
import useAuth from '../hooks/useAuth'
import * as auth from '../apis/auth'
import * as Swal from '../apis/alert'

const User = () => {

  const navigate = useNavigate()
  const { userInfo, loginSetting, logout } = useAuth()
  const [formKey, setFormKey] = useState(0)

  // 회원 정보 수정
  const updateUser = async (form) => {
    try {
      const response = await auth.update(form)
      if( response.status === 200 ) {
        // 수정된 정보로 로그인 상태 갱신
        const infoResponse = await auth.info()
        loginSetting(infoResponse.data)
        setFormKey(prev => prev + 1) // UserForm 재마운트 → defaultValue 갱신
        Swal.alert('회원정보 수정 성공', '프로필이 업데이트되었습니다.', 'success')
      }
    } catch (error) {
      console.error('회원정보 수정 중 에러가 발생하였습니다.', error);
      Swal.alert('회원정보 수정 실패', '회원정보 수정에 실패하였습니다.', 'error')
    }
  }

  // 회원 탈퇴
  const deleteUser = async (username) => {
    Swal.confirm('회원탈퇴를 하시겠습니까?', '탈퇴 시 모든 정보가 삭제됩니다.', 'warning',
      async (result) => {
        if( !result.isConfirmed ) return
        try {
          const response = await auth.remove(username)
          if( response.status === 200 ) {
            Swal.alert('회원탈퇴 성공', '그동안 감사했습니다.', 'success',
              () => logout(true)
            )
          }
        } catch (error) {
          console.error('회원 탈퇴 처리 중 에러가 발생하였습니다.', error);
          Swal.alert('회원탈퇴 실패', '회원탈퇴에 실패하였습니다.', 'error')
        }
      }
    )
  }

  return (
    <Layout>
      <UserForm key={formKey} userInfo={userInfo} updateUser={updateUser} deleteUser={deleteUser} />
    </Layout>
  )
}

export default User