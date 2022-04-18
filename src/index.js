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
            this.bgraph.update(label, labelBGraph.serializeToObj());
            return true;
        }
        else 
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserializeFromObj(bgraphObj);
            let result = labelBGraph.insert(key, value);
            if(!result) return false;
            this.bgraph.update(label, labelBGraph.serializeToObj());
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
            labelBGraph.deserializeFromObj(bgraphObj);
            let result = labelBGraph.update(key, value);
            if(!result) return false;
            this.bgraph.update(label, labelBGraph.serializeToObj());
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
            labelBGraph.deserializeFromObj(bgraphObj);
            let result = labelBGraph.delete(key);
            if(!result) return false;
            this.bgraph.update(label, labelBGraph.serializeToObj());
            return true;
        }
    }

    search(label, key)
    {
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' ) return undefined;

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return undefined;
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserializeFromObj(bgraphObj);
            return labelBGraph.search(key);
        }
    }

    searchRange(label, key, total, position = 0)
    {
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' || !total || typeof total !== 'number' || typeof position !== 'number') return undefined;

        let bgraphObj = this.bgraph.search(label);
        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserializeFromObj(bgraphObj);
            return labelBGraph.searchRange(key, total, position);
        }
    }

    searchRangeBackward(label, key, total, position = 0)
    {
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' || !total || typeof total !== 'number' || typeof position !== 'number') return undefined;

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserializeFromObj(bgraphObj);
            return labelBGraph.searchRangeBackward(key, total, position);
        }
    }

    searchKeyContains(label, substring, total, position = 0, lastKey = "")
    {
        if(!label || typeof label !== 'string' || !substring || typeof substring !== 'string' || !total || typeof total !== 'number' || typeof position !== 'number' || typeof lastKey !== 'string') return undefined;

        let bgraphObj = this.bgraph.search(label);
        
        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserializeFromObj(bgraphObj);
            return labelBGraph.searchKeyContains(substring, total, position, lastKey);
        }
    }

    searchValueContains(label, substring, total, position = 0, lastKey = "")
    {
        if(!label || typeof label !== 'string' || !substring || typeof substring !== 'string' || !total || typeof total !== 'number' || typeof position !== 'number' || typeof lastKey !== 'string') return undefined;

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserializeFromObj(bgraphObj);
            return labelBGraph.searchValueContains(substring, total, position, lastKey);
        }
    }

    getStart(label)
    {
        if(!label || typeof label !== 'string') return undefined;

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return undefined;
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserializeFromObj(bgraphObj);
            let listNode = labelBGraph.start;
            return {key: listNode.key, value: listNode.value};
        }
    }

    getEnd(label)
    {
        if(!label || typeof label !== 'string') return undefined;

        let bgraphObj = this.bgraph.search(label);

        if(bgraphObj === undefined || bgraphObj === null) return undefined;
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserializeFromObj(bgraphObj);
            let listNode = labelBGraph.end;
            return {key: listNode.key, value: listNode.value};
        }
    }

    getAllLabels()
    {
        if(this.bgraph !== undefined) return this.bgraph.getAllKeys();
        else return [];
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