#### Description

The `describe` command describes the schema of a single table and prints it as a JSON object. The result includes the table `name`, its `rowCount`, and a `columns` array where each column reports its `name`, `type`, `size`, and `nullable` flag (plus `precision` and `scale` for numeric types). Use it to understand a table's structure before selecting columns with `aux4 mdb data`. The command is also available under the shorter alias `aux4 mdb desc`.

#### Usage

```bash
aux4 mdb describe --file <file.mdb> --table <table> [--password <password>]
```

--file      Path to the .mdb file (positional or `--file`)
--password  Database password (default: none)
--table     Table name to describe (required)

#### Example

```bash
aux4 mdb describe --file inventory.mdb --table Products
```

```json
{
  "name": "Products",
  "rowCount": 128,
  "columns": [
    { "name": "Id", "type": "long", "size": 4, "nullable": false },
    { "name": "Name", "type": "text", "size": 100, "nullable": true }
  ]
}
```
