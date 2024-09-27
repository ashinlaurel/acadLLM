# Acad LLM


This is a full-stack project that uses Node.js for the backend and a modern JavaScript framework (like React) for the frontend.

## Prerequisites

To run this project locally, ensure you have the following installed on your system:

- **NVM**: Node Version Manager

### 1. Install NVM (Node Version Manager)

NVM is used to manage multiple Node.js versions easily. You can install NVM by running the following commands:

**For Linux/MacOS:**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

**For Windows:**

You can install NVM using the [nvm-windows installer](https://github.com/coreybutler/nvm-windows/releases).

After installing, restart your terminal or run the following command to load NVM:

```bash
source ~/.bashrc  # or ~/.zshrc if using Zsh
```

Verify the installation by running:

```bash
nvm --version
```

### 2. Install Node.js Version 16

Once NVM is installed, you can install Node.js version 16 using the following command:

```bash
nvm install 16
```

### 3. Set Node.js Version 16 as Default

To ensure you're using Node.js version 16, run:

```bash
nvm use 16
nvm alias default 16
```

You can verify that Node.js and npm (Node Package Manager) are properly installed by checking their versions:

```bash
node --version
npm --version
```

## Project Setup


Since this project  has both backend and frontend, navigate to the respective directories and install dependencies as needed:

```bash
cd backend/
npm install

cd frontend/
npm install
```

## Running the Project

### Backend

To start the backend server, navigate to the backend directory and run:

```bash
cd Backend/
node ./app.js
```

### Frontend

To start the frontend server, navigate to the frontend directory and run:

```bash
cd Frontend/
npm run start
```

By default, the frontend will be accessible at `http://localhost:3000` and the backend API at `http://localhost:5000`.

## Additional Notes

### Frontend env variables
as of now none

### Backend env variables

OPENAI_API_KEY="enter your key"


