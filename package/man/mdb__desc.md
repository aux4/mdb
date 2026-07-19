#### Description

The `desc` command is an alias of [`aux4 mdb describe`](./mdb__describe). It describes the schema of a single table and prints it as a JSON object with the table `name`, its `rowCount`, and a `columns` array. See `aux4 mdb describe` for full details.

#### Usage

```bash
aux4 mdb desc --file <file.mdb> --table <table> [--password <password>]
```

--file      Path to the .mdb file (positional or `--file`)
--password  Database password (default: none)
--table     Table name to describe (required)

#### Example

```bash
aux4 mdb desc --file inventory.mdb --table Products
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
