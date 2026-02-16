import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    NavLink,
} from "react-router-dom";

import ImportContacts from "./pages/ImportContacts";
import Contacts from "./pages/Contacts";

function Layout({ children }) {
    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
            {/* Top Nav */}
            <header
                style={{
                    background: "#111827",
                    padding: "14px 24px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ fontWeight: 600 }}>Contact Manager</div>

                <nav style={{ display: "flex", gap: 16 }}>
                    <NavLink
                        to="/import"
                        style={({ isActive }) => ({
                            color: isActive ? "#60a5fa" : "white",
                            textDecoration: "none",
                            fontWeight: 500,
                        })}
                    >
                        Import
                    </NavLink>

                    <NavLink
                        to="/contacts"
                        style={({ isActive }) => ({
                            color: isActive ? "#60a5fa" : "white",
                            textDecoration: "none",
                            fontWeight: 500,
                        })}
                    >
                        Contacts
                    </NavLink>
                </nav>
            </header>

            {/* Page Content */}
            <main style={{ padding: "24px" }}>
                {children}
            </main>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/import" replace />} />
                    <Route path="/import" element={<ImportContacts />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="*" element={<Navigate to="/import" replace />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
