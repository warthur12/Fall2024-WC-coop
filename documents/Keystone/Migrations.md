# [Migrations](https://keystonejs.com/docs/guides/database-migration)
## Introduction
Before deploying Keystone with a production database, it is essential to ensure that the database contains all the necessary tables and fields required by Keystone. To streamline this process, Keystone can generate migration files that can be stored alongside your application code. These migration files can then be executed against your production database, ensuring that it is correctly configured.

## Prisma Migrate

Keystone utilizes Prisma's built-in migration feature to handle database schema changes. Prisma Migrate simplifies the process of managing database changes by generating SQL migration files, which are stored in a `./migrations` directory at the root of your project (next to your `keystone.ts` file).

### Example: Generating Migration Files

1. **Set Up Your Schema:**
   First, define your Keystone schema in `keystone.ts`. For example:

   ```javascript
   import { config, list } from '@keystone-6/core';
   import { text, relationship } from '@keystone-6/core/fields';

   export default config({
     lists: {
       User: list({
         fields: {
           name: text(),
           email: text({ isUnique: true }),
         },
       }),
       Post: list({
         fields: {
           title: text(),
           content: text(),
           author: relationship({ ref: 'User.posts' }),
         },
       }),
     },
   });
   ```

2. **Generate Migration Files:**
   To create migration files based on your schema, run:

   ```bash
   npx keystone prisma migrate dev
   ```

   - **Outcome:** This command generates SQL migration files that detail the changes needed to align your database with your schema. These files will be stored in the `./migrations` directory.

### Running Migrations

Once migration files are generated, you can apply them to your production database to ensure it has the correct structure.

#### Example: Running Migrations

To apply the migrations, run:

```bash
npx keystone prisma migrate deploy
```

- **Outcome:** This command runs the generated migration files against your production database. It should be executed as part of your deployment process, usually after building your application.

## Running `keystone dev`

By default, running `keystone dev` will automatically push your schema changes to the database specified by the `db.url` in your `keystone.ts` file. This is useful for rapid development but may not be suitable for production environments.

### Example: Default Behavior

```bash
npx keystone dev
```

- **Outcome:** The command forces a push of the current schema to the database, ensuring that all necessary tables and fields are present. This can be helpful for local development but may result in data loss if not managed carefully.

### Skipping DB Push

If you want to handle migrations manually, you can skip the automatic database push by using:

```bash
npx keystone dev --no-db-push
```

- **Outcome:** This prevents Keystone from pushing changes to the database. Be aware that if your database is missing tables or columns required by Keystone, you will encounter GraphQL runtime errors.

## Keystone Prisma Migrate CLI Commands

Keystone provides several useful commands through Prisma to manage your migrations effectively. Here are three commonly used commands:

1. **Generate Migration Files:**

   ```bash
   npx keystone prisma migrate dev
   ```

   - **Purpose:** This command generates migration files necessary to set up your production database. It’s advisable to commit these files to source control to ensure they are accessible during deployment.

   - **Use Case:** This is particularly useful when you want to continue rapid schema iteration during development but generate the migrations when you're ready to submit a pull request.

2. **Deploy Migrations:**

   ```bash
   npx keystone prisma migrate deploy
   ```

   - **Purpose:** Runs the generated migrations against the production database. This command should typically be run after a build step and as part of your application deployment.

   - **Use Case:** It’s essential to ensure that the database schema is updated before starting the Keystone application.

3. **Start Keystone with Migrations:**

   ```bash
   npx keystone start --with-migrations
   ```

   - **Purpose:** This command runs the generated migrations and then starts the Keystone application.

   - **Use Case:** This is useful for environments where you want to ensure the database schema is up-to-date before the application begins serving requests.

## Prisma CLI

The Prisma CLI is a powerful tool that enables you to manage your database migrations effectively within your Keystone project. While Keystone abstracts much of the Prisma workflow, familiarity with Prisma's CLI commands is beneficial for production scenarios.

### Key Prisma CLI Commands

1. **Migration Resolve:**

   ```bash
   npx prisma migrate resolve
   ```

   - **Purpose:** This command is used to mark specific migrations as applied or rolled back. It is helpful when you need to adjust your migration history without actually executing migrations.

2. **Migration Status:**

   ```bash
   npx prisma migrate status
   ```

   - **Purpose:** This command provides an overview of your migration status, showing which migrations have been applied, which are pending, and any potential issues.

### Importance of Familiarization

As you work with more sophisticated migration scenarios, understanding these commands will be critical for managing your application's database effectively. Being comfortable with the Prisma Migrate CLI will enable you to handle complex migrations confidently and avoid potential pitfalls in production.

## Conclusion

Managing database migrations in Keystone involves generating and applying migrations through Prisma Migrate. By following the outlined processes and utilizing the provided commands, you can ensure your production database is correctly configured and aligned with your application schema. Familiarity with both Keystone and Prisma's CLI tools is essential for successful database management in production environments.