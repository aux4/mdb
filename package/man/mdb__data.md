#### Description

The `data` command reads rows from a table and prints them as a JSON array of objects. By default every column is returned; pass `--columns` with a comma-separated list to project a subset. Pagination is supported through `--offset` (rows to skip) and `--limit` (maximum rows to return), which is helpful when working with large tables.

#### Usage

```bash
aux4 mdb data --file <file.mdb> --table <table> [--password <password>] [--columns <c1,c2,...>] [--offset <n>] [--limit <n>]
```

--file      Path to the .mdb file (positional or `--file`)
--password  Database password (default: none)
--table     Table name to read (required)
--columns   Comma-separated list of columns to return (default: all columns)
--offset    Number of rows to skip (default: 0)
--limit     Maximum number of rows to return (default: all rows)

#### Example

```bash
aux4 mdb data --file inventory.mdb --table Products --columns Id,Name --limit 2
```

```json
[{"Id":1,"Name":"Widget"},{"Id":2,"Name":"Gadget"}]
```
