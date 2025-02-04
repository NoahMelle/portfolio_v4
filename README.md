# Portfolio v4

A portfolio project that uses Strapi as a CMS and a frontend powered by Node.js.

## Table of Contents
- [Portfolio v4](#portfolio-v4)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Set Up the Strapi CMS](#3-set-up-the-strapi-cms)
    - [3.1. Import Data and Generate API Tokens](#31-import-data-and-generate-api-tokens)
    - [4. Start the applications](#4-start-the-applications)
    - [5. Visit the site](#5-visit-the-site)

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

Ensure you have the following installed before proceeding:

- **Node.js** (tested on version 20.x.x)
- **Bun** (or another package manager, this guide uses [Bun](https://bun.sh/))
- **PostgreSQL** (for database management)
- **Decryption Token** (required for data import, contact the project owner if needed)

---

## Installation

### 1. Clone the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/NoahMelle/portfolio_v4.git
```

### 2. Install Dependencies

Navigate to the root directory of the project and install the required dependencies:

```bash
# install monorepo dependencies
bun install
# install directory-specific dependencies
bun run install:all
```

### 3. Set Up the Strapi CMS
1. Set up a new PostgreSQL database.
2. Copy the example environment file and rename it:
```bash
cp cms/.env.example cms/.env
```
3. Update the `.env` file:
    - Replace secrets with your own secure values.
    - Input your PostgreSQL credentials in the `.env` file.
### 3.1. Import Data and Generate API Tokens
1. Copy the relative path of the latest data export, located in `cms/database/backup`. You can do this by right-clicking the latest export file in your code editor and selecting **Copy Relative Path**.
2. Import the data using the following command, replacing `<export-file>` with the path you copied (⚠️ **without** the cms/ prefix):
```bash
bunx -w cms strapi import -f database/backup/<export-file>
```
Example:
```bash
bunx -w cms strapi import -f database/backup/export_20241008212340.tar.gz.enc
```

3. When prompted, input the decryption token.

### 4. Start the applications

In the project root directory, run the following command to start both the CMS and the frontend application:

```bash
bun run dev:all
```

1. Open http://localhost:1337/admin to access the Strapi admin panel.
2. Create an account.
3. Navigate to **Settings** -> **API Tokens**
4. Generate an API token with these settings:
    - **Name**: e.g., 'Read Only'
    - **Description**: Optional
    - **Token duration**: Recommend 'Unlimited'
    - **Token type**: 'Read-only'
5. ⚠️ Copy the token displayed next to the key icon. It will not be shown again.
6. Copy the environment example file for the main project:
```bash
cp main/.env.example main/.env
```
7. Open the newly copied .env file and paste the Strapi API token:
```
STRAPI_TOKEN=<your_generated_api_token>
```

### 5. Visit the site

Once everything is set up, visit the portfolio site by navigating to http://localhost:3000 in your browser.