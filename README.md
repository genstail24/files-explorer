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
4. Set up the database credentials in the backend/.env file:
   ```bash
   DATABASE_URL="mysql://root:@localhost:3306/file_explorer"
5. Run the database migration:
   ```bash
   bun run migrate
6. Run the database seeder:
   ```bash
   bun run seed
7. Run the start dev command:
   ```bash
   bun run dev

### NOTES
- **Backend** runs at http://localhost:3000
- **Frontend** runs at http://localhost:5174