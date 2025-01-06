# Files Explorer like Windows Explorer

A simple files explorer application with:
- **Backend**: Elysia for handling APIs.
- **Frontend**: Vue 3 for the user interface.

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (installed globally)

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/genstail24/files-explorer.git
2. Navigate into the project directory:
   ```bash
   cd files-explorer
3. Install dependencies for both backend and frontend:
   ```bash
   bun install
4. Copy .env.example in backend and frontend to .env:
   ```bash
   cp backend/.env.example backend/.env && cp frontend/.env.example frontend/.env
5. Set up the database credentials in the backend/.env file:
   ```bash
   DATABASE_URL="mysql://root:@localhost:3306/file_explorer"
6. Run prisma generate, migrate, and seed in 1 command for the first time (TESTING PURPOSE ONLY!):
   ```bash
   bun run setup-db
7. Run the start dev command:
   ```bash
   bun run dev

### NOTES
- **Backend** runs at http://localhost:3000
- **Frontend** runs at http://localhost:5174