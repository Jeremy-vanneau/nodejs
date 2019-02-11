const MongoClient = require('mongodb').MongoClient;

const user = encodeURIComponent('Alain');
const password = encodeURIComponent('password');
const authMechanism = 'DEFAULT';

// Connection URL
const url = 'mongodb://localhost:27017';
//const url = 'mongodb://' + user + ':' + password + '@localhost:27017/?authMechanism=' + authMechanism;

const dbName = 'Students';

const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
    if (err) throw err;
    console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    client.close();
  });
  findDocument(db, function() {
    client.close();
  });
  updateDocument(db, function() {
    client.close();
  });
  findAllDocuments(db, function() {
    client.close();
  });
  deleteDocument(db, function() {
    client.close();
  });
});

// Create
const insertDocuments = function(db, callback) {
    const collection = db.collection('students');
    collection.insertOne({firstName : 'Titi', lastName : 'El zozio', grade:'B'}
    //collection.insertMany([{a : 1}, {a : 2}, {a : 3}]
        , function(err, result) {
      if (err) throw err;
      console.log("Inserted a student into the collection");
      callback(result);
    });
}

// Read all
const findAllDocuments = function(db, callback) {
    const collection = db.collection('students');
    collection.find({}).toArray(function(err, data) {
        if (err) throw err;
      console.log('Find all : ' + JSON.stringify(data));
      callback(data);
    });
}

// Read the first element
const findOneDocument = function(db, callback) {
    const collection = db.collection('students');
    collection.findOne({}).toArray(function(err, data) {
        if (err) throw err;
      console.log('Find one :' + JSON.stringify(data));
      callback(data);
    });
}

// Read one or more
const findDocument = function(db, callback) {
    const collection = db.collection('students');
    collection.find({firstName:'Titi'}, { projection: { _id: 0 }}).limit(3).toArray(function(err, data) {
        if (err) throw err;
      console.log('Find one or more :' + JSON.stringify(data));
      callback(data);
    });
}

// Update
const updateDocument = function(db, callback) {
    const collection = db.collection('students');
    collection.updateOne({ firstName : 'Titi' }, { $set: { firstName : 'Toto' } }, function(err, data) {
    //collection.updateMany(...)
        if (err) throw err;
      console.log('Updated a Titi');
      callback(data);
    });  
  }

// Delete
const deleteDocument = function(db, callback) {
    const collection = db.collection('students');
    collection.deleteOne({ firstName : 'Toto' }, function(err, data) {
//  collection.deleteMany({ firstName : 'Titi' }, function(err, result) {
        if (err) throw err;
      console.log('Delete an entry');
      callback(data);
    });    
}