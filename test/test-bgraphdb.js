const BGraphDB = require('../src/index.js')
const Buffer = require('buffer').Buffer;

function getBinarySize(string) {
    return Buffer.byteLength(string, 'utf8');
}

function test()
{
    const bgraphdb = new BGraphDB();

    bgraphdb.insertLabel("test1");
    bgraphdb.insertLabel("test2");
    bgraphdb.insertLabel("test3");
    bgraphdb.insertLabel("test4");
    bgraphdb.insertLabel("test5");

    bgraphdb.insertData("test3", "1", "1");
    bgraphdb.insertData("test3", "2", "2");
    bgraphdb.insertData("test3", "3", "3");
    bgraphdb.insertData("test3", "4", "4");
    bgraphdb.insertData("test3", "5", "5");
    
    let serializedDB = bgraphdb.serialize();

    bgraphdb.insertData("test3", "6", "6");
    bgraphdb.insertData("test3", "7", "7");
    bgraphdb.insertData("test3", "8", "8");
    bgraphdb.insertData("test3", "9", "9");
    bgraphdb.insertData("test3", "10", "10");

    console.log("=============================");
    console.log(bgraphdb.serialize());

    bgraphdb.deleteData("test3", "6");
    bgraphdb.deserialize(serializedDB);

    console.log("=============================");
    console.log(bgraphdb.serialize());

    bgraphdb.deleteLabel("test3");

    console.log("=============================");
    console.log(bgraphdb.serialize());
}


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

test();