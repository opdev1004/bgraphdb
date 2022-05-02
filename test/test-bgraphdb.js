const BGraphDB = require('../src/index.js')
const Buffer = require('buffer').Buffer;

function getBinarySize(string) {
    return Buffer.byteLength(string, 'utf8');
}

function test()
{
    const bgraphdb = new BGraphDB();
    let serializedDB = bgraphdb.serialize();
    console.log(serializedDB);
    bgraphdb.deserialize(serializedDB);

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
    

    bgraphdb.insertData("test3", "6", "6");
    bgraphdb.insertData("test3", "7", "7");
    bgraphdb.insertData("test3", "8", "8");
    bgraphdb.insertData("test3", "9", "9");
    bgraphdb.insertData("test3", "10", "10");

    console.log("=============================");
    console.log(bgraphdb.serialize());

    bgraphdb.deleteData("test3", "6");

    console.log("=============================");
    console.log(bgraphdb.serialize());

    bgraphdb.deleteLabel("test3");

    console.log("=============================");
    console.log(bgraphdb.serialize());

    console.log("=============================");
    bgraphdb.insertData("test4", "worldis", "wawaaaacooo");
    bgraphdb.insertData("test4", "worldiscute", "wowooocooo");
    bgraphdb.insertData("test4", "worldgogo", "afk mate cooo");
    bgraphdb.insertData("test4", "worldgogogogogogoo", "nonononoooo");
    bgraphdb.insertData("test4", "gogogocute", "no");
    
    console.log(bgraphdb.getStart("test4"));
    console.log(bgraphdb.getEnd("test4"));

    console.log("------------------------------");
    let list = bgraphdb.searchRange("test4", "worldgogo", 3);
    console.log(list);
    console.log("------------------------------");
    list = bgraphdb.searchRangeBackward("test4", "worldiscute", 3);
    console.log(list);
    console.log("------------------------------");
    list = bgraphdb.searchKeyContains("test4", "world", 2);
    console.log(list);
    console.log("------------------------------");
    list = bgraphdb.searchValueContains("test4", "coo", 2);
    console.log(list);
    console.log("------------------------------");
    list =  bgraphdb.getAllLabels();
    console.log(list);
    console.log("------------------------------");
    list =  bgraphdb.getAllKeysFromLabel("test4");
    console.log(list);
    console.log("------------------------------");
    list =  bgraphdb.getAllValuesFromLabel("test4");
    console.log(list);
    console.log("------------------------------");
    list =  bgraphdb.getAllFromLabel("test4");
    console.log(list);
    bgraphdb.updateData("test4", "worldis", "mmm");
    console.log(bgraphdb.search("test4", "worldis"));

    /*
    bgraphdb.deserialize(bgraphdb.serialize());
    console.log(bgraphdb.serialize());
    console.log(typeof bgraphdb.serialize());
    */
   list = bgraphdb.searchLabelContains("test", 10);
   console.log(list);
   list = bgraphdb.searchLabelContainsOnlyLabel("test", 10);
   console.log(list);
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