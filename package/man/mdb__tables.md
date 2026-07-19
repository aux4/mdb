#### Description

The `tables` command lists the tables contained in a Microsoft Access database file and prints them as a JSON array. By default only normal (user) tables are returned; system and linked tables can be included with flags. When `--showCount` is enabled, each entry becomes an object with the table `name` and its `rowCount`, which is useful for quickly sizing a database before reading data.

#### Usage

```bash
aux4 mdb tables --file <file.mdb> [--password <password>] [--normalTables <true|false>] [--systemTables <true|false>] [--linkedTables <true|false>] [--showCount <true|false>]
```

--file          Path to the .mdb file (positional or `--file`)
--password      Database password (default: none)
--normalTables  Include normal tables (default: `true`)
--systemTables  Include system tables (default: `false`)
--linkedTables  Include linked tables (default: `false`)
--showCount     Include the row count for each table (default: `false`)

#### Example

```bash
aux4 mdb tables --file inventory.mdb --showCount true
```

```json
[{"name":"Products","rowCount":128},{"name":"Suppliers","rowCount":12}]
```
