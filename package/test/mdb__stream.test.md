# mdb stream

## should stream rows as newline-delimited JSON

```execute
aux4 mdb stream --file sample.mdb --table Table1
```

```expect
{"A":"abcdefg","B":"hijklmnop","C":2,"D":222,"E":333333333,"F":444.555,"G":"1974-09-21T00:00:00.000Z","H":"3.5000","I":true}
{"A":"a","B":"b","C":0,"D":0,"E":0,"F":0,"G":"1981-12-12T00:00:00.000Z","H":"0.0000","I":false}
```

## should stream only the selected columns

```execute
aux4 mdb stream --file sample.mdb --table Table1 --columns A,B
```

```expect
{"A":"abcdefg","B":"hijklmnop"}
{"A":"a","B":"b"}
```

## should limit the number of streamed rows

```execute
aux4 mdb stream --file sample.mdb --table Table1 --limit 1
```

```expect
{"A":"abcdefg","B":"hijklmnop","C":2,"D":222,"E":333333333,"F":444.555,"G":"1974-09-21T00:00:00.000Z","H":"3.5000","I":true}
```
