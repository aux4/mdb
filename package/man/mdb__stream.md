#### Description

The `stream` command reads rows from a table and prints them as newline-delimited JSON (NDJSON) — one JSON object per line — rather than a single JSON array. This format is convenient for piping row-by-row into other commands (for example another aux4 db command with `--inputStream`) and for processing large extracts line by line. It accepts the same options as `aux4 mdb data`, including column selection and pagination.

Note: `mdb-reader` decodes the requested rows into memory before they are emitted, so `stream` changes the output *format* (NDJSON vs a JSON array) rather than making the read lazy. Use `--offset` and `--limit` to bound how much is read from very large tables.

#### Usage

```bash
aux4 mdb stream --file <file.mdb> --table <table> [--password <password>] [--columns <c1,c2,...>] [--offset <n>] [--limit <n>]
```

--file      Path to the .mdb file (positional or `--file`)
--password  Database password (default: none)
--table     Table name to read (required)
--columns   Comma-separated list of columns to return (default: all columns)
--offset    Number of rows to skip (default: 0)
--limit     Maximum number of rows to return (default: all rows)

#### Example

```bash
aux4 mdb stream --file inventory.mdb --table Products --columns Id,Name
```

```json
{"Id":1,"Name":"Widget"}
{"Id":2,"Name":"Gadget"}
```
