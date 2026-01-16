# Academic Formatting Compatibility Database

A structured registry of academic submission format policies. This application helps researchers determine which typesetting tools (LaTeX, Word, Typst, etc.) are supported, tolerated, or discouraged by various academic venues (conferences, journals, societies).

## Features

*   **Compatibility Matrix**: View venues and their policy status for different tools.
*   **Localization**: Full English and Japanese support (UI and content).
*   **Contribution**: Open contribution flow for adding/editing venues.
*   **Filtering**: Filter venues by language.

## Tech Stack

*   **Framework**: SvelteKit
*   **Database**: Drizzle ORM + LibSQL (Turso for production, SQLite for dev)
*   **Localization**: Paraglide.js
*   **Deployment**: Cloudflare Pages / Workers

## Setup

1.  **Install Dependencies**:
    ```bash
    bun install
    ```

2.  **Environment Variables**:
    Create a `.env` file for local development:
    ```env
    DATABASE_URL="file:local.db"
    ```

3.  **Run Development Server**:
    ```bash
    bun dev
    ```
    The application will automatically migrate and seed the local database on startup.

## Database

### Development
The development environment uses a local SQLite file (`local.db`). It is automatically seeded with sample data when you run `bun dev`.
To reset the local database:
```bash
rm local.db && bun dev
```

### Production (Turso)
To push schema changes to the production database:

1.  Create `.env.production` with your credentials:
    ```env
    DATABASE_URL="libsql://<YOUR-DB>.turso.io"
    DATABASE_AUTH_TOKEN="<YOUR-TOKEN>"
    ```

2.  Run the push command:
    ```bash
    bun run db:prod:push
    ```

## License

*   **Software**: [MIT License](LICENSE) © 2026 mkpoli
*   **Data**: [CC0 1.0 Universal](LICENSE-DATA) (Public Domain)
