import React from 'react'

function Signup() {
    return (
        <div>
            <h1>Signup</h1>
            <form>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" />
                </div>
                <button type="submit">Sign Up</button>
            </form >
        </div >
    )
}

export default Signup