# DTEC App

A modern Next.js application built with TypeScript.

## 🚀 Features

- **Next.js 15.3.3** with App Router
- **TypeScript** for type safety
- **Internationalization (i18n)** with support for English and Turkish
- **Authentication** with JWT tokens
- **MySQL Database** integration
- **Responsive Design** with Tailwind CSS
- **Modern UI Components** using Shadcn Radix UI
- **Form Handling** with React Hook Form and Zod validation
- **Charts and Analytics** with Recharts
- **Animations** with Framer Motion
- **Dark/Light Theme** support
- **Docker** containerization ready

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)
- **Docker** and **Docker Compose** (optional, for containerized deployment)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd dtec-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dtec_app

# API Configuration
API_URL=https://your-backend-url.com
HS_SECRET=your-jwt-secret-key

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 4. Database Setup

1. Create a MySQL database named `dtec_app`
2. Run any necessary migrations (if available)
3. Ensure your MySQL server is running

### 5. Private Keys

Ensure you have the required private key file in the `keys/` directory:

- `keys/private.pem`

## 🚀 Running the Project

### Development Mode

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```


## 🐳 Docker Deployment

### Option 1: Using Docker Compose (Recommended)

This will start both the application and MySQL database:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Option 2: Manual Docker Build

```bash
# Build the Docker image
docker build -t dtec-app .

# Run the container
docker run -p 3000:3000 \
  -e DB_HOST=your_db_host \
  -e DB_USER=your_db_user \
  -e DB_PASSWORD=your_db_password \
  -e DB_NAME=dtec_app \
  -e API_URL=https://your-backend-url.com \
  -e HS_SECRET=your-secret \
  -v ./keys:/app/keys:ro \
  dtec-app
```

## 📁 Project Structure

```text
dtec-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── [locale]/          # Internationalized routes
│   │   ├── api/               # API routes
│   │   └── ...
│   ├── components/            # React components
│   │   ├── HomePage/          # Home page components
│   │   ├── ui/               # UI components
│   │   └── ...
│   ├── i18n/                 # Internationalization config
│   ├── lib/                  # Utility libraries
│   └── ...
├── public/                   # Static assets
│   ├── images/              # Image assets
│   ├── fonts/               # Font files
│   └── ...
├── messages/                # i18n message files
├── keys/                    # Private keys
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile              # Docker build instructions
└── ...
```

## 🌍 Internationalization

The application supports multiple languages:

- **English (en)** - Default language
- **Turkish (tr)**

Language files are located in the `messages/` directory.




## 🛡️ Security

- JWT-based authentication
- Encrypted password storage with bcryptjs
- Private key management for secure operations
- Environment variable configuration for sensitive data




