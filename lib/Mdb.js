const fs = require("fs/promises");

class Mdb {
  constructor(mdb) {
    this.mdb = mdb;
  }

  static async open(file, password = undefined) {
    const buffer = await fs.readFile(file);

    const { default: MDBReader } = await import("mdb-reader");
    const reader = new MDBReader(buffer);
    return new Mdb(reader, { password });
  }

  getTableNames(normalTables = true, systemTables = false, linkedTables = false, showCount = false) {
    if (!showCount) {
      return this.mdb.getTableNames({ normalTables, systemTables, linkedTables });
    }

    return this.mdb.getTableNames({ normalTables, systemTables, linkedTables }).map(tableName => {
      const table = this.mdb.getTable(tableName);
      return {
        name: tableName,
        rowCount: table.rowCount
      };
    });
  }

  desc(tableName) {
    const table = this.mdb.getTable(tableName);
    if (!table) throw new Error("Table not found");

    const columns = table.getColumns();
    return {
      name: tableName,
      rowCount: table.rowCount,
      columns: columns.map(column => ({
        name: column.name,
        type: column.type,
        length: column.size,
        nullable: column.nullable,
        precision: column.precision,
        scale: column.scale
      }))
    };
  }

  data(tableName, columns, offset, limit) {
    const table = this.mdb.getTable(tableName);
    if (!table) throw new Error("Table not found");

    const selectedColumns = columns ? columns.split(",") : table.getColumnNames();

    return table.getData({ columns: selectedColumns, rowOffset: offset, rowLimit: limit });
  }
}

module.exports = Mdb;
