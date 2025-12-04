import React from 'react'

function Login() {
    return (
        <div>
            <h1>Login</h1>
            <form>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" />
                </div>
                <button type="submit">Sign In</button>
            </form >
        </div >
    )
}

export default Login