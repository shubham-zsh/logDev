'use client';

import { useState } from 'react';

export default function Dashboard() {
    const [contents, setContent] = useState('');
    const [logs, setLogs] = useState([]);

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
