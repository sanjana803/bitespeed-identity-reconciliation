# Bitespeed Identity Reconciliation

A robust API service for reconciling user identities through email and phone number, built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- Identity reconciliation through email and phone number
- Secondary contact linking
- Comprehensive error handling
- Request validation
- Logging and monitoring
- TypeScript support
- PostgreSQL database with Prisma ORM
- API documentation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Logging**: Winston
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Linting**: ESLint
- **Formatting**: Prettier

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Yarn package manager

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
API_PREFIX=/api/v1
REQUEST_TIMEOUT=30000

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/bitespeed_db"

# Logging
LOG_LEVEL=info

# CORS
CORS_ORIGIN=*
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bitespeed-identity-reconciliation.git
   cd bitespeed-identity-reconciliation
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up the database:
   ```bash
   yarn prisma migrate dev
   ```

4. Start the development server:
   ```bash
   yarn dev
   ```

## API Endpoints

### Identify Contact

```http
POST /identify
```

Request body:
```json
{
  "email": "user@example.com",
  "phoneNumber": "+1234567890"
}
```

Response:
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["user@example.com"],
    "phoneNumbers": ["+1234567890"],
    "secondaryContactIds": [2, 3]
  }
}
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middlewares/    # Express middlewares
├── routes/         # API routes
├── services/       # Business logic
└── server.ts       # Application entry point
```

## Development

- Run tests: `yarn test`
- Lint code: `yarn lint`
- Format code: `yarn format`
- Build: `yarn build`

## Deployment

The application is configured for deployment on Render.com. Follow these steps:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - Build Command: `npm install && npm run build && npx prisma migrate deploy`
   - Start Command: `npm start`
4. Add environment variables
5. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
