const Mdb = require("../../lib/Mdb");
const { Printer } = require("@aux4/engine");

async function tableDataExecutor(params) {
  const file = await params.file;
  const password = await params.password;
  const tableName = await params.table;
  const columns = await params.columns;
  const offset = await intParam(params.offset);
  const limit = await intParam(params.limit);

  const filePassword = password !== "" ? password : undefined;

  const mdb = await Mdb.open(file, filePassword);
  const data = mdb.data(tableName, columns, offset, limit);

  const out = Printer.on(process.stdout);
  out.println(JSON.stringify(data, null, 2));
}

async function intParam(param) {
  const value = await param;
  return value !== "" ? parseInt(value) : undefined;
}

module.exports = { tableDataExecutor };
