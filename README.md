# Portfolio v4

A portfolio project that uses Strapi as a CMS and a frontend powered by Node.js.

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

Ensure you have the following installed before proceeding:

- **Node.js** (tested on version 20.x.x)
- **npm** or another package manager (this guide uses [npm](https://www.npmjs.com/))
- **PostgreSQL** (for database management)
- **Decryption Token** (for data import, contact me if you need it)

### 1. Clone the Repository

To clone the repository, use the following command:

```bash
git clone https://github.com/NoahMelle/portfolio_v4.git
```

### 2. Set Up the Strapi CMS
1. Navigate to the Strapi directory:
```bash
cd cms
```
2. Install the required dependencies:
```bash
npm install
```
3. Copy the example environment file and rename it:
```bash
cp .env.example .env
```
4. Set up a new PostgreSQL database.
5. Update the `.env` file:
    - Replace secrets with your own secure values.
    - Input your PostgreSQL credentials in the `.env` file.
### 2.1. Import Data and Generate API Tokens
1. Import the data by running:
```bash
npm run strapi import -- --f ./data/latest_data_export
```
- Input the decryption token.
2. Start the Strapi application:
```bash
npm run develop
```
3. Open http://localhost:1337/ in your browser and log in.
4. Navigate to **Settings > API Tokens** and generate a new API token. **Copy the token** for the next steps.

### 3. Run the Main Project
1. Move to the main project directory:
```bash
cd ../main
```
2. Install the required dependencies:
```bash
npm install
```
3. Copy the environment example file:
```bash
cp .env.example .env
```
4. Paste the generated Strapi API token in the `.env` file:
```bash
STRAPI_TOKEN=<your_generated_api_token>
```
5. Start the application:
```bash
npm run dev
```