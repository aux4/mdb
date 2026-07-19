# mdb desc

## should describe a table's schema as a JSON object

```execute
aux4 mdb desc --file sample.mdb --table Table1 | jq .
```

```expect
{
  "name": "Table1",
  "rowCount": 2,
  "columns": [
    {
      "name": "A",
      "type": "text",
      "size": 100,
      "nullable": true
    },
    {
      "name": "B",
      "type": "text",
      "size": 200,
      "nullable": true
    },
    {
      "name": "C",
      "type": "byte",
      "size": 1,
      "nullable": true
    },
    {
      "name": "D",
      "type": "integer",
      "size": 2,
      "nullable": true
    },
    {
      "name": "E",
      "type": "long",
      "size": 4,
      "nullable": true
    },
    {
      "name": "F",
      "type": "double",
      "size": 8,
      "nullable": true
    },
    {
      "name": "G",
      "type": "datetime",
      "size": 8,
      "nullable": true
    },
    {
      "name": "H",
      "type": "currency",
      "size": 8,
      "nullable": true
    },
    {
      "name": "I",
      "type": "boolean",
      "size": 0,
      "nullable": true
    }
  ]
}
```
