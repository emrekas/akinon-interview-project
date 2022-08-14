const mongoose = require("mongoose")
const {MongoMemoryServer} = require('mongodb-memory-server');

/**
 * Connect to the in-memory database.
 */
(async () => {
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), {dbName: "exchange"});
})();
