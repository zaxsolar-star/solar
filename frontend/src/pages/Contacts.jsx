import React, { useEffect, useState } from "react";
import { fetchContacts } from "../api";

const STATUSES = [
    "", "NEW", "QUEUED", "CALLING", "ANSWERED", "TRANSFERRED", "NO_ANSWER",
    "BUSY", "FAILED", "CALLBACK_REQUESTED", "DNC"
];

export default function Contacts() {
    const [status, setStatus] = useState("");
    const [q, setQ] = useState("");
    const [page, setPage] = useState(0);
    const [data, setData] = useState(null);
    const [err, setErr] = useState("");
    const [busy, setBusy] = useState(false);

    const load = async () => {
        setBusy(true);
        setErr("");
        try {
            const d = await fetchContacts({ status: status || undefined, q: q || undefined, page, size: 50 });
            setData(d);
        } catch (e) {
            setErr(e.message || "Failed to load");
        } finally {
            setBusy(false);
        }
    };

    useEffect(() => { load(); }, [status, page]); // eslint-disable-line

    return (
        <div style={{ maxWidth: 1100, margin: "24px auto", padding: 16 }}>
            <h2>Contacts</h2>

            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <select value={status} onChange={(e) => { setPage(0); setStatus(e.target.value); }}>
                    {STATUSES.map(s => (
                        <option key={s} value={s}>{s === "" ? "All statuses" : s}</option>
                    ))}
                </select>

                <input
                    placeholder="Search name or phone…"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    style={{ flex: 1 }}
                />
                <button onClick={() => { setPage(0); load(); }} disabled={busy}>
                    {busy ? "Loading..." : "Search"}
                </button>
            </div>

            {err && <div style={{ color: "crimson" }}>{err}</div>}

            {data && (
                <>
                    <div style={{ color: "#666", marginBottom: 8 }}>
                        Showing {data.numberOfElements} of {data.totalElements}
                    </div>

                    <div style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                            <tr style={{ background: "#fafafa" }}>
                                <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #eee" }}>Name</th>
                                <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #eee" }}>Phone</th>
                                <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #eee" }}>Location</th>
                                <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #eee" }}>Status</th>
                                <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #eee" }}>Attempts</th>
                                <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #eee" }}>Updated</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.content.map(c => (
                                <tr key={c.id}>
                                    <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>{c.name}</td>
                                    <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>{c.phoneE164}</td>
                                    <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>{c.locationText}</td>
                                    <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>{c.status}</td>
                                    <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>{c.attemptCount}</td>
                                    <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>{c.updatedAt}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <button disabled={data.first} onClick={() => setPage(p => Math.max(0, p - 1))}>Prev</button>
                        <button disabled={data.last} onClick={() => setPage(p => p + 1)}>Next</button>
                    </div>
                </>
            )}
        </div>
    );
}
