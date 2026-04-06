import React from 'react'
import useAuth from '../../hooks/useAuth'

const LoginForm = () => {

    const { login } = useAuth()

    const onLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const username = form.username.value
        const password = form.password.value
        login(username, password)
    }

    return (
        <div className='form'>
            <h2>로그인</h2>
            <form className='login-form' onSubmit={ (e) => onLogin(e) }>
                <div>
                    <label htmlFor="username">아이디</label>
                    <input type="text" id="username" name="username" placeholder='username' autoComplete='username' required />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" name="password" placeholder='password' autoComplete='password' required />
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    )
}

export default LoginForm