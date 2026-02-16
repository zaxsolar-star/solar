const API_BASE = "http://localhost:8080";

export async function importContactsCsv(file) {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${API_BASE}/api/contacts/import`, {
        method: "POST",
        body: form,
    });
    if (!res.ok) throw new Error(`Import failed (${res.status})`);
    return res.json();
}

export async function fetchContacts({ status, q, page = 0, size = 50 }) {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (q) params.set("q", q);
    params.set("page", String(page));
    params.set("size", String(size));

    const res = await fetch(`${API_BASE}/api/contacts?${params.toString()}`);
    if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
    return res.json();
}
