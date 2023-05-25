const { default: mongoose } = require("mongoose");

const toJson = (schema) => {
    const oldToJson = schema.methods.toJSON || mongoose.Document.prototype.toJSON;

    schema.methods.toJSON = function (){
        let obj = this.toObject();
        if(oldToJson) {
            obj = oldToJson.call(this);
        }
        delete obj.__v;
        obj.id = this._id.toString();
        delete obj._id;
        return obj
    }

}

module.exports = toJson;