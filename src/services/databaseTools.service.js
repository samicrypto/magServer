const { MongoTransferer, MongoDBDuplexConnector, LocalFileSystemDuplexConnector } = require('mongodb-snapshot');



 const dumpMongo2Localfile = async(backupPath) => {
  const mongo_connector = new MongoDBDuplexConnector({
      connection: {
          uri: `mongodb://127.0.0.1:27017`,
          dbname: 'MagServer',
      },
  });

  const localfile_connector = new LocalFileSystemDuplexConnector({
      connection: {
          path: backupPath,
      },
  });

  const transferer = new MongoTransferer({
      source: mongo_connector,
      targets: [localfile_connector],
  });

  for await (const { total, write } of transferer) {
      console.log(`remaining bytes to write: ${total - write}`);
  }

  return backupPath;
};


 const restoreLocalfile2Mongo = async() => {
  const mongo_connector = new MongoDBDuplexConnector({
      connection: {
          uri: `mongodb://<username>:<password>@<hostname>:<port>`,
          dbname: '<database-name>',
      },
  });

  const localfile_connector = new LocalFileSystemDuplexConnector({
      connection: {
          path: './backup.tar',
      },
  });

  const transferer = new MongoTransferer({
      source: localfile_connector,
      targets: [mongo_connector],
  });

  for await (const { total, write } of transferer) {
      console.log(`remaining bytes to write: ${total - write}`);
  }
};



const copyMongo2Mongo = async() => {
  const mongo_connector_1 = new MongoDBDuplexConnector({
      connection: {
          uri: `mongodb://<username>:<password>@<hostname>:<port>`,
          dbname: '<database-name>',
      },
  });

  const mongo_connector_2 = new MongoDBDuplexConnector({
      connection: {
          uri: `mongodb://<username>:<password>@<hostname>:<port>`,
          dbname: '<database-name>',
      },
  });

  const mongo_connector_3 = new MongoDBDuplexConnector({
      connection: {
          uri: `mongodb://<username>:<password>@<hostname>:<port>`,
          dbname: '<database-name>',
      },
  });

  const transferer = new MongoTransferer({
      source: mongo_connector_1,
      targets: [mongo_connector_2, mongo_connector_3],
  });

  for await (const { total, write } of transferer) {
      console.log(`remaining bytes to write: ${total - write}`);
  }
};


module.exports = {
  dumpMongo2Localfile,
  restoreLocalfile2Mongo,
  copyMongo2Mongo
};
