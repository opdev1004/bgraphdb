const BGraph = require('./data-structure/bgraph.js');

module.exports = class BGraphDB {
    constructor(order = 5) {
        this.order = order;
        this.bgraph = new BGraph(order);
    }

    insertLabel(label)
    {
        if(!label || typeof label !== 'string') return false;
        else return this.bgraph.insert(label, null);
    }

    updateLabel(oldLabel, newLabel)
    {
        if(!oldLabel || typeof oldLabel !== 'string' || !newLabel || typeof newLabel !== 'string') return false;
        let bgraphObj = this.bgraph.search(oldLabel);
        if(bgraphObj === undefined) return false;
        let result = this.bgraph.insert(newLabel, bgraphObj);
        if(!result) return false;
        this.bgraph.delete(oldLabel);
        return true;
    }

    deleteLabel(label)
    {
        this.bgraph.delete(label);
    }

    insertData(label, key, value)
    {
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' || !value || typeof value !== 'string') return false;
        let bgraphObj = this.bgraph.search(label);
        if(bgraphObj === undefined) return false;
        else if(bgraphObj === null)
        {
            let labelBGraph = new BGraph(this.order);
            let result = labelBGraph.insert(key, value);
            if(!result) return false;
            this.bgraph.update(label, labelBGraph.serialize());
            return true;
        }
        else 
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            let result = labelBGraph.insert(key, value);
            if(!result) return false;
            this.bgraph.update(label, labelBGraph.serialize());
            return true;
        }
    }

    updateData(label, key, value)
    {
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' || !value || typeof value !== 'string') return false;

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined) return false;
        else 
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            let result = labelBGraph.update(key, value);
            if(!result) return false;
            this.bgraph.update(label, labelBGraph.serialize());
            return true;
        }
    }

    deleteData(label, key)
    {
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' ) return false;

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return false;
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            let result = labelBGraph.delete(key);
            if(!result) return false;
            this.bgraph.update(label, labelBGraph.serialize());
            return true;
        }
    }

    search(label, key)
    {
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' ) return false;

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return false;
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            return labelBGraph.search(key);
        }
    }

    searchRange(label, key, total, position = 0)
    {
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' || !total || typeof total !== 'number' || typeof position !== 'number') return [];

        let bgraphObj = this.bgraph.search(label);
        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            return labelBGraph.searchRange(key, total, position);
        }
    }

    searchRangeBackward(label, key, total, position = 0)
    {
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' || !total || typeof total !== 'number' || typeof position !== 'number') return [];

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            return labelBGraph.searchRangeBackward(key, total, position);
        }
    }

    searchLabelContains(substring, total, position = 0, lastKey = "")
    {
        if(!substring || typeof substring !== 'string' || !total || typeof total !== 'number' || typeof position !== 'number' || typeof lastKey !== 'string') return [];

        return this.bgraph.searchKeyContains(substring, total, position, lastKey);
    }

    searchLabelContainsOnlyLabel(substring, total, position = 0, lastKey = "")
    {
        if(!substring || typeof substring !== 'string' || !total || typeof total !== 'number' || typeof position !== 'number' || typeof lastKey !== 'string') return [];
        
        let result = [];
        let list = this.bgraph.searchKeyContains(substring, total, position, lastKey);

        for(let data of list)
        {
            result.push(data.key);
        }

        return result;
    }

    searchKeyContains(label, substring, total, position = 0, lastKey = "")
    {
        if(!label || typeof label !== 'string' || !substring || typeof substring !== 'string' || !total || typeof total !== 'number' || typeof position !== 'number' || typeof lastKey !== 'string') return [];

        let bgraphObj = this.bgraph.search(label);
        
        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            return labelBGraph.searchKeyContains(substring, total, position, lastKey);
        }
    }

    searchValueContains(label, substring, total, position = 0, lastKey = "")
    {
        if(!label || typeof label !== 'string' || !substring || typeof substring !== 'string' || !total || typeof total !== 'number' || typeof position !== 'number' || typeof lastKey !== 'string') return [];
        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            return labelBGraph.searchValueContains(substring, total, position, lastKey);
        }
    }

    getStart(label)
    {
        if(!label || typeof label !== 'string') return false;

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return false;
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            let listNode = labelBGraph.start;
            return {key: listNode.key, value: listNode.value};
        }
    }

    getEnd(label)
    {
        if(!label || typeof label !== 'string') return false;

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return false;
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            let listNode = labelBGraph.end;
            return {key: listNode.key, value: listNode.value};
        }
    }

    getAllLabels()
    {
        if(this.bgraph !== undefined) return this.bgraph.getAllKeys();
        else return [];
    }

    getAllKeysFromLabel(label)
    {
        if(!label || typeof label !== 'string') return [];

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            return labelBGraph.getAllKeys();
        }
    }

    getAllValuesFromLabel(label)
    {
        if(!label || typeof label !== 'string') return [];

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            return labelBGraph.getAllValues();
        }
    }

    getAllFromLabel(label)
    {
        if(!label || typeof label !== 'string') return [];

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserialize(bgraphObj);
            return labelBGraph.getAll();
        }
    }

    serialize()
    {
        return this.bgraph.serialize();
    }

    deserialize(string)
    {
        this.bgraph.deserialize(string);
    }
}