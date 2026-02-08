# Solar Project – Phase 1 Context

Goal:
Phase 1 is focused on CSV-based contact upload, storage, and status tracking.

Tech stack:
- Spring Boot
- Spring Data JPA
- Postgres
- Flyway
- React (Vite)
- Node calling agent will be built by another developer (out of scope for now)

Phase 1 scope:
- CSV upload UI (React)
- Backend CSV parsing and validation
- Store contacts: name, phone (E.164), location
- Deduplicate by phone
- Contact status lifecycle
- Contact list with search and filters
- No CRM sync yet
- No booking UI yet

Important constraints:
- Sri Lanka phone numbers supported
- Phone normalized to E.164
- Flyway used for DB schema
- JPA only (no DbDriver, no jOOQ)

Future:
- Node calling agent will read contacts
- Call status updates will modify contact status
- Scheduling and CRM sync in Phase 2+
