const BGraphDB = require('../src/index.js');
const fs = require('fs');
const Buffer = require('buffer').Buffer;

function getByteLength(target) {
    return Buffer.byteLength(target, 'utf8');
}

function test()
{
    const bgraphdb = new BGraphDB();

    console.time("db-add-data");

    for(let i = 0; i < 10; i++)
    {
        let label = fillString(i.toString(), 255);

        bgraphdb.insertLabel(label);

        for(let j = 0; j < 100; j++)
        {
            let c =  j.toString();
            let key = fillString(c, 255);
            let value = fillString(c, 65536);

            bgraphdb.insertData(label, key, value);
        }
    }

    console.timeEnd("db-add-data");

    let serializedDB = bgraphdb.serialize();

    console.log(getByteLength(serializedDB));

    console.time("db-write-file");
    fs.writeFile('./testdb.json', serializedDB, function (err) {
        if (err) throw err;
    }); 
    console.timeEnd("db-write-file");

    fs.readFile('./testdb.json', (err, data) => {
        if (err) throw err;
        serializedDB = data;
    });

    bgraphdb.deserialize(serializedDB);
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


function fillString(string, total)
{
    let size = total - string.length;
    let result = string;

    for(let i = 0; i < size; i++) result = result + "a";

    return result;
}

test();