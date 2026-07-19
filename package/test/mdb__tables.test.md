# mdb tables

## should list the normal tables as a JSON array

```execute
aux4 mdb tables --file sample.mdb
```

```expect
["Table1","Table2","Table3","Table4"]
```

## should include the row count for each table

```execute
aux4 mdb tables --file sample.mdb --showCount true
```

```expect
[{"name":"Table1","rowCount":2},{"name":"Table2","rowCount":0},{"name":"Table3","rowCount":0},{"name":"Table4","rowCount":0}]
```

## should list system tables when requested

```execute
aux4 mdb tables --file sample.mdb --normalTables false --systemTables true
```

```expect
["MSysObjects","MSysACEs","MSysQueries","MSysRelationships","MSysAccessObjects"]
```
