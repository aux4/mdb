import { readFile } from 'fs/promises';
import MDBReader from 'mdb-reader';

async function openReader(file, password) {
  if (!file) {
    console.error('Usage: aux4-mdb <tables|desc|data> <file> [...args]');
    process.exit(1);
  }

  const buffer = await readFile(file);
  const options = {};
  if (password && password !== '') {
    options.password = password;
  }

  return new MDBReader(buffer, options);
}

function boolParam(value) {
  return value === true || value === 'true';
}

function intParam(value) {
  return value !== undefined && value !== '' ? parseInt(value, 10) : undefined;
}

async function listTables(args) {
  const [file, password, normalTables, systemTables, linkedTables, showCount] = args;
  const reader = await openReader(file, password);

  const names = reader.getTableNames({
    normalTables: boolParam(normalTables),
    systemTables: boolParam(systemTables),
    linkedTables: boolParam(linkedTables)
  });

  if (boolParam(showCount)) {
    const tables = names.map(name => ({ name, rowCount: reader.getTable(name).rowCount }));
    console.log(JSON.stringify(tables));
  } else {
    console.log(JSON.stringify(names));
  }
}

async function describeTable(args) {
  const [file, password, tableName] = args;
  const reader = await openReader(file, password);

  const table = reader.getTable(tableName);
  const columns = table.getColumns();

  const result = {
    name: tableName,
    rowCount: table.rowCount,
    columns: columns.map(column => ({
      name: column.name,
      type: column.type,
      size: column.size,
      nullable: column.nullable,
      precision: column.precision,
      scale: column.scale
    }))
  };

  console.log(JSON.stringify(result));
}

function readRows(reader, tableName, columns, offset, limit) {
  const table = reader.getTable(tableName);
  const selectedColumns = columns && columns !== '' ? columns.split(',') : table.getColumnNames();

  return table.getData({
    columns: selectedColumns,
    rowOffset: intParam(offset),
    rowLimit: intParam(limit)
  });
}

async function tableData(args) {
  const [file, password, tableName, columns, offset, limit] = args;
  const reader = await openReader(file, password);

  const data = readRows(reader, tableName, columns, offset, limit);
  console.log(JSON.stringify(data));
}

async function streamTableData(args) {
  const [file, password, tableName, columns, offset, limit] = args;
  const reader = await openReader(file, password);

  const data = readRows(reader, tableName, columns, offset, limit);
  for (const row of data) {
    console.log(JSON.stringify(row));
  }
}

async function main() {
  const [action, ...args] = process.argv.slice(2);

  try {
    switch (action) {
      case 'tables':
        await listTables(args);
        break;
      case 'describe':
        await describeTable(args);
        break;
      case 'data':
        await tableData(args);
        break;
      case 'stream':
        await streamTableData(args);
        break;
      default:
        console.error(`Unknown action: ${action}`);
        process.exit(1);
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
