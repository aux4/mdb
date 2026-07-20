#### Description

The `mdb` command group provides read-only access to Microsoft Access database files (`.mdb`) without requiring Microsoft Access to be installed. It is built on the `mdb-reader` library and exposes three subcommands: `tables` to list the tables in a database, `describe` to inspect a table's schema, and `data` to read rows. All subcommands emit JSON so their output composes cleanly with tools like `jq` and other aux4 commands.

#### Usage

```bash
aux4 mdb <tables|describe|data> --file <file.mdb> [options]
```

#### Example

```bash
aux4 mdb tables --file inventory.mdb
```

```json
["Products","Suppliers","Orders"]
```
