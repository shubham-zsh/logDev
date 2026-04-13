'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {

    const [content, setContent] = useState('');
    const [logs, setLogs] = useState([]);

    const router = useRouter();

    useEffect(() => {
        fetchLogs()
    }, []);

    async function fetchLogs() {

        try {
            const res = await fetch('/api/logs');

            if (res.redirected) {
                router.push('/login');
                return;
            }

            if (!res.ok) {
                return Response.json({ msg: "failed to fetch" })
            }
            console.log(res);

            const data = await res.json();
            console.log("fetch res data...", data);
            setLogs(data.logs)
        } catch (err) {
            console.error("error", err);
        }
    }

    async function handleSubmit() {

        try {
            const res = await fetch('/api/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (!res.ok) {
                throw new Error('Request failed ', res.status);
            }

            const data = await res.json();
            console.log("response data...", data);

            if (res.redirected) {
                router.push('/login')
            }

            fetchLogs();
            setContent('');

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <h1>Dashboard Page</h1>

            <div>
                <input type="text" placeholder="log" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>

            <button onClick={handleSubmit}>
                Submit
            </button>



            <div>
                {logs.map((log) => {
                    return <p key={log.id}>{log.content}</p>;
                })}
            </div>
        </div>
    );
}
