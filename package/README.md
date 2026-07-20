# aux4/mdb

Microsoft Access (`.mdb`) database tools for the aux4 CLI.

The `aux4/mdb` package lets you read legacy Microsoft Access database files directly from the command line — no Microsoft Access installation required. You can list the tables in a database, inspect a table's schema, and extract rows with column selection and pagination. Every command outputs JSON, so results pipe cleanly into `jq` and other aux4 commands for reporting, migration, and ETL tasks.

## Installation

```bash
aux4 aux4 pkger install aux4/mdb
```

## Quick Start

```bash
# List the tables in a database
aux4 mdb tables --file inventory.mdb

# Inspect a table's schema
aux4 mdb describe --file inventory.mdb --table Products

# Read the first 10 rows of a table
aux4 mdb data --file inventory.mdb --table Products --limit 10
```

## Usage

### Commands

- [`aux4 mdb tables`](./commands/mdb/tables) - List the tables in an Access database as a JSON array.
- [`aux4 mdb describe`](./commands/mdb/describe) - Describe a table's schema as a JSON object.
- [`aux4 mdb data`](./commands/mdb/data) - Read rows from a table as a JSON array.
- [`aux4 mdb stream`](./commands/mdb/stream) - Stream rows from a table as newline-delimited JSON (NDJSON).

The `--file` option accepts the path to the `.mdb` file and can also be passed as the first positional argument (e.g. `aux4 mdb tables inventory.mdb`). Password-protected databases are supported through the `--password` option on every command.

### aux4 mdb tables

List the tables contained in a database. By default only normal (user) tables are returned.

```bash
aux4 mdb tables \
  --file <file.mdb> \
  [--password <password>] \
  [--normalTables <true|false>] \
  [--systemTables <true|false>] \
  [--linkedTables <true|false>] \
  [--showCount <true|false>]
```

Options:

- `--file <file.mdb>`      Path to the Access database file
- `--password <password>`  Database password (default: none)
- `--normalTables`         Include normal tables (default: `true`)
- `--systemTables`         Include system tables (default: `false`)
- `--linkedTables`         Include linked tables (default: `false`)
- `--showCount`            Include the row count for each table (default: `false`)

Examples:

```bash
# List user tables
aux4 mdb tables --file inventory.mdb

# List user tables with their row counts
aux4 mdb tables --file inventory.mdb --showCount true

# List only system tables
aux4 mdb tables --file inventory.mdb --normalTables false --systemTables true
```

### aux4 mdb describe

Describe a table's schema, including its columns and row count.

```bash
aux4 mdb describe \
  --file <file.mdb> \
  --table <table> \
  [--password <password>]
```

Options:

- `--file <file.mdb>`      Path to the Access database file
- `--table <table>`        Table name to describe
- `--password <password>`  Database password (default: none)

Example:

```bash
aux4 mdb describe --file inventory.mdb --table Products
```

### aux4 mdb data

Read rows from a table, with optional column selection and pagination.

```bash
aux4 mdb data \
  --file <file.mdb> \
  --table <table> \
  [--password <password>] \
  [--columns <c1,c2,...>] \
  [--offset <n>] \
  [--limit <n>]
```

Options:

- `--file <file.mdb>`      Path to the Access database file
- `--table <table>`        Table name to read
- `--password <password>`  Database password (default: none)
- `--columns <c1,c2,...>`  Comma-separated list of columns to return (default: all)
- `--offset <n>`           Number of rows to skip (default: 0)
- `--limit <n>`            Maximum number of rows to return (default: all)

Examples:

```bash
# Read every row
aux4 mdb data --file inventory.mdb --table Products

# Read specific columns
aux4 mdb data --file inventory.mdb --table Products --columns Id,Name

# Page through the table 100 rows at a time
aux4 mdb data --file inventory.mdb --table Products --offset 100 --limit 100
```

### aux4 mdb stream

Read rows from a table and emit them as newline-delimited JSON (NDJSON) — one object per line — instead of a single array. Useful for piping row-by-row into other commands or processing large extracts. Accepts the same options as `aux4 mdb data`.

```bash
aux4 mdb stream \
  --file <file.mdb> \
  --table <table> \
  [--password <password>] \
  [--columns <c1,c2,...>] \
  [--offset <n>] \
  [--limit <n>]
```

Examples:

```bash
# Stream every row as NDJSON
aux4 mdb stream --file inventory.mdb --table Products

# Stream selected columns
aux4 mdb stream --file inventory.mdb --table Products --columns Id,Name
```

Note: `mdb-reader` reads the requested rows into memory before emitting them, so `stream` changes the output *format* (NDJSON vs a JSON array) rather than making the read lazy. Use `--offset`/`--limit` to bound large tables.

## Output

All commands emit JSON to stdout, which makes it easy to post-process results:

```bash
# Pretty-print a schema
aux4 mdb describe --file inventory.mdb --table Products | jq .

# Extract a single column with jq
aux4 mdb data --file inventory.mdb --table Products | jq '.[].Name'
```

## License

Apache-2.0. See the [LICENSE](./LICENSE) file for details.
