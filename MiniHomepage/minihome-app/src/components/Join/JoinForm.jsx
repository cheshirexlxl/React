import React from 'react'

const JoinForm = ({ join }) => {

    const onJoin = (e) => {
        e.preventDefault()
        const form = e.target
        const username = form.username.value
        const password = form.password.value
        const nickname = form.nickname.value
        const email = form.email.value
        const role = form.role.value
        const data = { 
            username, password, nickname, email, role
        }
        join( data )
    }

    return (
        <div className="form">
            <h2 className="login-title">회원가입</h2>
            <form className="login-form" onSubmit={ (e) => onJoin(e) }>
                <div>
                    <label htmlFor="username">username</label>
                    <input type="text" 
                        id="username" 
                        placeholder='username'
                        name="username" 
                        autoComplete='username'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" 
                        id="password" 
                        placeholder='password'
                        name="password" 
                        autoComplete='password'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="nickname">nickname</label>
                    <input type="text" 
                        id="nickname" 
                        placeholder='nickname'
                        name="nickname" 
                        autoComplete='nickname'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="text" 
                        id="email" 
                        placeholder='email'
                        name="email" 
                        autoComplete='email'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role">계정 유형</label>
                    <select id="role" name="role" required>
                        <option value="ROLE_ADMIN">미니홈피 주인 (ROLE_ADMIN)</option>
                        <option value="ROLE_USER">일반 사용자 (ROLE_USER)</option>
                    </select>
                </div>
                <button type="submit" className="btn btn--form btn-login">
                    가입하기
                </button>
            </form>
        </div>
    )
}

export default JoinForm