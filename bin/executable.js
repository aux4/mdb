#!/usr/bin/env node

const { Engine } = require("@aux4/engine");
const { listTablesExecutor } = require("./comand/ListTablesExecutor");
const { describeTableExecutor } = require("./comand/DescribeTableExecutor");
const { tableDataExecutor } = require("./comand/TableDataExecutor");

process.title = "aux4-mdb";

const config = {
  profiles: [
    {
      name: "main",
      commands: [
        {
          name: "tables",
          execute: listTablesExecutor,
          help: {
            text: "list tables",
            variables: [
              {
                name: "file",
                text: "mdb file"
              },
              {
                name: "password",
                text: "file password",
                default: ""
              },
              {
                name: "normalTables",
                text: "list normal tables",
                default: "true"
              },
              {
                name: "systemTables",
                text: "list system tables",
                default: "false"
              },
              {
                name: "linkedTables",
                text: "list linked tables",
                default: "false"
              },
              {
                name: "showCount",
                text: "show row count",
                default: "false"
              }
            ]
          }
        },
        {
          name: "desc",
          execute: describeTableExecutor,
          help: {
            text: "describe table",
            variables: [
              {
                name: "file",
                text: "mdb file"
              },
              {
                name: "password",
                text: "file password",
                default: ""
              },
              {
                name: "table",
                text: "table name"
              }
            ]
          }
        },
        {
          name: "data",
          execute: tableDataExecutor,
          help: {
            text: "get table data",
            variables: [
              {
                name: "file",
                text: "mdb file"
              },
              {
                name: "password",
                text: "file password",
                default: ""
              },
              {
                name: "table",
                text: "table name"
              },
              {
                name: "columns",
                text: "columns comma separated",
                default: ""
              },
              {
                name: "offset",
                text: "offset",
                default: ""
              },
              {
                name: "limit",
                text: "limit",
                default: ""
              }
            ]
          }
        }
      ]
    }
  ]
};

(async () => {
  const engine = new Engine({ aux4: config });

  const args = process.argv.splice(2);

  try {
    await engine.run(args);
  } catch (e) {
    console.error(e.message.red);
    process.exit(1);
  }
})();
