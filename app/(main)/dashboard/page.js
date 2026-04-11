'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {

    const [contents, setContent] = useState('');
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs()
    }, []);

    async function fetchLogs() {

        try {
            const res = await fetch('/api/logs');

            if (!res) {
                return Response.json({ msg: "failed to fetch" })
            }
            console.log(res);

            const data = res.json();
            console.log(data);
            setLogs(data.logs)
        } catch (err) {
            console.error("error", err);
        }
    }

    return (
        <div>
            <h1>Dashboard Page</h1>

            <div>
                <input type="text" placeholder="log" value={contents} onChange={(e) => setContent(e.target.value)} />
            </div>



            <div>
                {logs.map((log) => {
                    return <p key={log.id}>{log.content}</p>;
                })}
            </div>
        </div>
    );
}
