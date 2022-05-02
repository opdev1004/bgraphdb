# B-Graph DB
Javascript database. Memory DB with nested b-graph (B-Tree).

Please use version > 0.0.9

From v0.0.10, db structure use String instead of object for a storage(bgraph) of label to avoid JSON circular iteration problem.

## ▶️ install
```
npm i bgraphdb
```

## 👩‍🎓 Tutorial
### Most of Case
```
const bgraphdb = new BGraphDB();
bgraphdb.insertLabel("test1");
bgraphdb.insertLabel("test2");
bgraphdb.insertData("test1", "1", "1");
bgraphdb.insertData("test1", "2", "2");
bgraphdb.insertData("test1", "3", "3");
bgraphdb.insertData("test1", "4", "4");
bgraphdb.insertData("test1", "5", "5");
bgraphdb.deleteData("test1", "6");
bgraphdb.deleteLabel("test2");
```
This database stays in the memory. So if you want to maintain them, you need to store them in the persistent storage. The database can be serialized and the serialized database can be stored by indexedDB or using file system from node.js.

Don't store bigger than what hardware can handle.

It would be good to maintain read and write a file speed under 1 second for desktop apps.
For example:
If you target HDD users, less than 80mb size of serialized database.
If you target SSD users, less than 450mb size of serialized database.

Another good option is read and write only when your apps need to.
For example:
Read a db file only when your app is strating.
Write a db file only before your app is closing. Or only when user decides to write a db file.

### 📖 Simple document
| function | ``` insertLabel(label)  ``` | 
| - | - |
| description | This function is for reserving place of 1 b-graph for storing data. This is like name of category or page. And data will be stored under that name (label)  |
| arg: label | string, name of b-graph to store data |
| return | true for inserting label otherwise false |

| function | ``` updateLabel(oldLabel, newLabel)  ``` | 
| - | - |
| description | This function is for updating name of label. |
| arg: oldLabel | string, old name of b-graph to store data |
| arg: newLabel | string, new name of b-graph to store data |
| return | false for failure of updating value, true for success  |

| function | ``` deleteLabel(label)  ``` | 
| - | - |
| description | This function deletes label. Which mean it removes all of data under the name of label. |
| arg: label | string, name of b-graph to store data |
| return | does not exist yet |

| function | ``` insertData(label, key, value)  ``` | 
| - | - |
| description | This function inserts the key and value inside of b-graph of the label |
| arg: label | string, name of b-graph to store data |
| arg: key | string, name of value |
| arg: value | anything but recommend the value that can be JSON.stringfy() |
| return | false for failure of inserting data, true for success  |

| function | ``` updateData(label, key, value)  ``` | 
| - | - |
| description | This function updates value of the key inside of b-graph of label |
| arg: label | string, name of b-graph to store data |
| arg: key | string, name of value |
| arg: value | new value. anything but recommend the value that can be JSON.stringfy() |
| return | false for failure of updating data, true for success  |

| function | ``` deleteData(label, key)  ``` | 
| - | - |
| description | This function deletes the data of key inside of b-graph of label |
| arg: label | string, name of b-graph to store data |
| arg: key | string, name of value |
| return | false for failure of deleting data, true for success  |

| function | ``` search(label, key) ``` | 
| - | - |
| description | This function searches key inside of b-graph of label and return the value of key |
| arg: label | string, name of b-graph to store data |
| arg: key | string, name of value |
| return | unidentified for failure of searching data, value for success  |

| function | ``` searchRange(label, key, total, position = 0) ``` | 
| - | - |
| description | This function searches data and returns multiple number of data from the position |
| arg: label | string, name of b-graph to store data |
| arg: key | string, name of value |
| arg: total | number, number of data from the position |
| arg: position | number, the position where it start to store data into list. This let us skip first number of data from the where key is. |
| return | unidentified for wrong label and key. list of data for success. else empty list |

| function | ``` searchRangeBackward(label, key, total, position = 0) ``` | 
| - | - |
| description | This function searches data and returns multiple number of data from the position. Adds data backward. |
| arg: label | string, name of b-graph to store data |
| arg: key | string, name of value |
| arg: total | number, number of data from the position |
| arg: position | number, the position where it start to store data into list. This let us skip first number of data from the where key is. |
| return | unidentified for wrong label and key. list of data for success. else empty list |

| function | ``` searchLabelContains(substring, total, position, lastKey)  ``` | 
| - | - |
| description | This function is for finding list of labels that contains substring. |
| arg: substring | string |
| arg: total | number, number of labels to grab |
| arg: position | number, number to skip labels |
| arg: lastKey | string, last label where it should start search from |
| return | return list of label (empty list as well) |

| function | ``` searchLabelContainsOnlyLabel(substring, total, position, lastKey)  ``` | 
| - | - |
| description | This function is for finding list of labels that contains substring. |
| arg: substring | string |
| arg: total | number, number of labels to grab |
| arg: position | number, number to skip labels |
| arg: lastKey | string, last label where it should start search from |
| return | return list of label (empty list as well) |

| function | ``` searchKeyContains(label, substring, total, position, lastKey)  ``` | 
| - | - |
| description | This function is for finding list of data that its key contains substring. |
| arg: label | string, name of b-graph to store data |
| arg: substring | string |
| arg: total | number, number of data to grab |
| arg: position | number, number to skip data |
| arg: lastKey | string, last key where it should start search from |
| return | return list of data (empty list as well) |

| function | ``` searchValueContains(label, substring, total, position, lastKey)  ``` | 
| - | - |
| description | This function is for finding list of data that its value contains substring. |
| arg: label | string, name of b-graph to store data |
| arg: substring | string |
| arg: total | number, number of data to grab |
| arg: position | number, number to skip data |
| arg: lastKey | string, last key where it should start search from |
| return | return list of data (empty list as well) |

| function | ``` getStart(label)  ``` | 
| - | - |
| description | This function is for finding list of data that its value contains substring. |
| arg: label | string, name of b-graph to store data |
| return | return first data, |

| function | ``` getEnd(label)  ``` | 
| - | - |
| description | This function is for finding list of data that its value contains substring. |
| arg: label | string, name of b-graph to store data |
| return | return last data |

| function | ``` getAllLabels()  ``` | 
| - | - |
| description | This function returns a list of labels |
| return | return array list |

| function | ``` getAllKeysFromLabel(label)  ``` | 
| - | - |
| description | This function returns a list of all key from label |
| arg: label | string, name of b-graph to store data |
| return | return array list |

| function | ``` getAllValuesFromLabel(label)  ``` | 
| - | - |
| description | This function returns a list of all value from label |
| arg: label | string, name of b-graph to store data |
| return | return array list |

| function | ``` getAllFromLabel(label)  ``` | 
| - | - |
| description | This function returns a list of all data from label |
| arg: label | string, name of b-graph to store data |
| return | return array list |

| function | ``` serialize() ``` | 
| - | - |
| description | serialize database. it can be stored by indexedDB or using file system from node.js |
| return | string, serialized database |

| function | ``` deserialize(string) ``` | 
| - | - |
| description | deserialize serialized database. |
| arg: string | string, serialized database |

## 👨‍💻 Author
[Victor Chanil Park](https://github.com/opdev1004)

## 💯 License
MIT, See [LICENSE](./LICENSE).