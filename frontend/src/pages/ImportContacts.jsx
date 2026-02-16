import React, { useState } from "react";
import { importContactsCsv } from "../api";

export default function ImportContacts() {
    const [file, setFile] = useState(null);
    const [busy, setBusy] = useState(false);
    const [result, setResult] = useState(null);
    const [err, setErr] = useState("");

    const onUpload = async () => {
        if (!file) return;
        setBusy(true);
        setErr("");
        setResult(null);
        try {
            const r = await importContactsCsv(file);
            setResult(r);
        } catch (e) {
            setErr(e.message || "Upload failed");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div style={{ maxWidth: 820, margin: "24px auto", padding: 16 }}>
            <h2>Import Contacts (CSV)</h2>
            <p style={{ color: "#666" }}>
                Required columns: <b>name</b>, <b>phone</b>, <b>location</b> (case-insensitive).
            </p>

            <input
                type="file"
                accept=".csv,text/csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <div style={{ marginTop: 12 }}>
                <button disabled={!file || busy} onClick={onUpload}>
                    {busy ? "Importing..." : "Import"}
                </button>
            </div>

            {err && (
                <div style={{ marginTop: 12, color: "crimson" }}>
                    {err}
                </div>
            )}

            {result && (
                <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
                    <h3>Import Result</h3>
                    <ul>
                        <li><b>Imported:</b> {result.imported}</li>
                        <li><b>Updated:</b> {result.updated}</li>
                        <li><b>Rejected:</b> {result.rejected}</li>
                    </ul>

                    {result.errors?.length > 0 && (
                        <>
                            <h4>Errors (first {result.errors.length})</h4>
                            <div style={{ maxHeight: 260, overflow: "auto", border: "1px solid #eee" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                    <tr>
                                        <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: 8 }}>Row</th>
                                        <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: 8 }}>Reason</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {result.errors.map((e, i) => (
                                        <tr key={i}>
                                            <td style={{ padding: 8, borderBottom: "1px solid #f3f3f3" }}>{e.rowNumber}</td>
                                            <td style={{ padding: 8, borderBottom: "1px solid #f3f3f3" }}>{e.reason}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
