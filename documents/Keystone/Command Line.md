# [Command Line](https://keystonejs.com/docs/guides/cli)
The Keystone CLI (Command Line Interface is a robust tool designed to manage and streamline the development, building, and deployment process of your Keystone projects. This guide expands upon each command, providing detailed explanations, usage examples, and best practices for development and production environments.

### Overview of CLI Usage

The general structure of Keystone CLI commands is:

```
$ keystone [command] [options]
```

Here are the primary commands available:

- `dev` – Starts the development process for your Keystone app.
- `postinstall` – Optionally build the project for development.
- `build` – Prepares the project for production by generating necessary files.
- `start` – Starts the project in production mode.
- `prisma` – Run Prisma-related commands safely in your Keystone project.
- `telemetry` – Enables, disables, or checks the status of telemetry data collection.

### Command: `dev`

The `dev` command is designed for development purposes and is the most frequently used CLI command. It automates several essential tasks, such as generating files and database schemas, and spinning up a local server for the Admin UI and GraphQL API.

**Usage:**

```bash
$ keystone dev
```

**Key Functions:**
- Automatically generates files required for Keystone’s APIs and Admin UI.
- Generates and applies database migrations based on your current Keystone schema.
- Starts the local development server, which includes hosting the GraphQL API and Admin UI.

**Example:**

```bash
$ keystone dev --no-db-push
```
This runs Keystone in development mode but skips pushing Prisma schema changes to the database.

**Available Flags:**
- `--no-db-push`: Prevents the Prisma schema from being pushed to the database.
- `--no-prisma`: Skips the Prisma schema validation and build process.
- `--no-server`: Avoids starting the Express server (useful for schema and UI development).
- `--no-ui`: Skips building and serving the Admin UI.

**Note on Database Migrations:**
When `keystone dev` is run, it typically updates the database schema to match any changes in your Keystone schema. While this is convenient during early development stages, you may want to skip automatic migrations in certain cases (e.g., when using an existing production database). To do so, use the `--no-db-push` flag.

**Example Scenario:**
If you’re working with a production database, running `keystone dev` could inadvertently cause data loss. Instead, you might want to control migrations manually using the Prisma CLI.

```bash
$ keystone prisma migrate deploy
```

### Command: `postinstall`

The `postinstall` command ensures that Keystone-generated files (e.g., GraphQL and Prisma schemas) are up to date after dependencies are installed. It is typically used as a script in the `package.json` file.

**Usage:**

```bash
$ keystone postinstall
```

**Why Use It?**
- Ensures that required files are always present after running `npm install` or `yarn install`.
- Prevents potential errors in code editors or continuous integration (CI) workflows where these files are missing or outdated.

**Example:**

```json
{
  "scripts": {
    "postinstall": "keystone postinstall"
  }
}
```

**Note:** This command is essentially an alias for `keystone build --no-ui --frozen`.

### Command: `build`

The `build` command is used to generate the necessary files for production, ensuring that Keystone is ready to run. It must be run before deploying the application in production.

**Usage:**

```bash
$ keystone build
```

**What Does It Do?**
- Generates files that Keystone needs to function in a production environment (e.g., GraphQL and Prisma schemas).
- Validates the existing files against your Keystone schema, ensuring everything is up to date.

**Available Flags:**
- `--frozen`: Validates the GraphQL and Prisma schemas without modifying them. If the schemas don’t match, an error is thrown.
- `--no-prisma`: Skips building or validating the Prisma schema.
- `--no-ui`: Skips building the Admin UI, useful for API-only deployments.

### Command: `start`

The `start` command launches Keystone in production mode. It assumes the project has already been built (using the `keystone build` command).

**Usage:**

```bash
$ keystone start
```

**Key Points:**
- Starts the production server (Express) to serve the GraphQL API and optionally the Admin UI.
- Does not perform any database migrations—these must be run during the build or release phases.

**Available Flags:**
- `--with-migrations`: Automatically triggers Prisma to run database migrations when the project starts. This is useful for deployments where database migrations need to be applied just before the server starts.
- `--no-ui`: Skips serving the Admin UI.

### Command: `prisma`

The `prisma` command allows you to run Prisma-specific commands within the Keystone environment. Keystone ensures that the Prisma schema is in sync with your Keystone schema before passing any Prisma commands.

**Usage:**

```bash
$ keystone prisma [command]
```

**Common Prisma Commands:**
- `migrate deploy`: Deploy database migrations.
- `db push`: Syncs your Prisma schema to your database without generating migrations.

**Example:**

```bash
$ keystone prisma migrate deploy
```

This command deploys all pending migrations to the database, ensuring that the schema is fully updated.

**Advanced Migrations:**
For more sophisticated migration scenarios (e.g., fixing migration conflicts or handling complex database schemas), you may need to use commands like `migrate resolve` or `migrate status`.

### Command: `telemetry`

Keystone collects telemetry data (usage statistics, errors) to improve the platform. This command controls the telemetry preferences for your project.

**Usage:**

```bash
$ keystone telemetry [enable|disable|status]
```

### Example Workflow

To bring all the commands together, here’s an example of a typical workflow:

**Development:**

```bash
$ keystone dev
```

This starts the development server, applies database migrations, and serves the Admin UI.

**Production Build:**

```bash
$ keystone build
```

This command generates the production-ready files, ensuring that Prisma and GraphQL schemas are in sync.

**Deploying to Production:**

```bash
$ keystone prisma migrate deploy && keystone start --with-migrations
```

This sequence deploys the database migrations and starts the production server while ensuring that the schema is applied to the database.

### Best Practices

- **Use `postinstall` in your `package.json`:** This ensures that the generated files are always in sync with your schema after installing dependencies.
  
- **Careful with production databases during development:** Avoid running `keystone dev` on a production database as it may lead to data loss.

- **Migrate with caution:** In production, database migrations should be handled carefully, ideally during a designated deployment or build phase. Do not run migrations on a live database from a staging environment.