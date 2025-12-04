import React from 'react'
import { useState } from 'react'

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    return (
        <div>
            <h1>Login</h1>
            <form>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password} 
                        />
                </div>
                <button type="submit">Sign In</button>
            </form >
        </div >
    )
}

export default Login