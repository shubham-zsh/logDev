'use client';
import { useState } from "react";

export default function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleRegister() {

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) {
                throw new Error('request failed ' + res.status)
            }

            const data = await res.json()
            console.log(data)

        } catch (err) {
            console.log(err)
        }
    }

    return (<div>
        <h1>Register page</h1>

        <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleRegister}>Register </button>

    </div>)
}
