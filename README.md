# @aux4/mdb
Parse MS Access mdb file

![npm](https://img.shields.io/npm/v/@aux4/mdb)

## Install

```bash
npm install -g @aux4/mdb
```

## Usage
```bash
aux4-mdb <command> [options]
  tables   list tables
             - file mdb file
             - password mdb password
             - normalTables [true] list normal tables
             - systemTables [false] list system tables
             - linkedTables [false] list linked tables
             - showCount [false] show row count
    desc   describe table
             - file mdb file
             - password mdb password
             - table table name
    data   get table data
             - file mdb file
             - password mdb password
             - table table name
             - columns columns comma separated
             - offset offset
             - limit limit

```
