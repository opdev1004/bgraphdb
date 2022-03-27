const BGraph = require('./data-structure/bgraph.js');

module.exports = class BGraphDB {
    constructor(order = 5) {
        this.order = order;
        this.bgraph = new BGraph(order);
    }

    insertLabel(label)
    {
        if(!label || typeof label !== 'string') return false;
        else
        {
            this.bgraph.insert(label, null);
            return true;
        }
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
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' ) return false;

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
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' ) return false;

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

            let result = labelBGraph.search(key);

            return result;
        }
    }

    searchRange(label, key, range, position = 0)
    {
        if(!label || typeof label !== 'string' || !key || typeof key !== 'string' ) return undefined;

        let bgraphObj = this.bgraph.search(label);
        if(bgraphObj === undefined || bgraphObj === null) return [];
        else
        {
            let labelBGraph = new BGraph();
            labelBGraph.deserializeFromObj(bgraphObj);

            return labelBGraph.searchRange(key, range, position);
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