import React from 'react'
import useAuth from '../../hooks/useAuth'
import { LogIn, LogOut } from 'lucide-react';

const LoginForm = () => {

    const { login } = useAuth()

    const onLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const username = 'admin'
        const password = form.password.value
        login(username, password)
    }

    return (        
        <div className="container-member">
            <div className="form bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LogIn size={30} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인</h2>
                    <p className="text-gray-600 text-sm">
                        미니홈피 주인만 로그인할 수 있습니다
                    </p>
                </div>
                <form className='login-form' onSubmit={ (e) => onLogin(e) }>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                비밀번호
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                autoComplete='password' 
                                placeholder="비밀번호를 입력하세요" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                required 
                            />
                        </div>
                        <button
                            type='submit'
                            className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium"
                        >
                            <LogIn size={20} /> 로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>     

    )
}

export default LoginForm