# Prisma setup

### Installation

```markdown
npm i prisma

# create prisma schema
npx prisma init
# this creates `prisma/schema.prisma` file and `.env` file
```

### Connecting to DB

```
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

# for mongodb (enter in .env file)
DATABASE_URL=mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

### Creating prisma schema

https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb/creating-the-prisma-schema-typescript-mongodb


### install prisma client

```
npm install @prisma/client

prisma generate
# this reads prisma schema and generates a version of prisma client that is tailored to your models.

prisma db push
# Whenever you update your Prisma schema, you will need to run the prisma db push command to create new indexes and regenerate Prisma Client.

## if you want to run but with different env files (like .env.local or .env.dev)
npm i -g dotenv-cli
dotenv -e .env.dev prisma db push


```
