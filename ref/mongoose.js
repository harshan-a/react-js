// mongoose is a package in npm, which is used to create communication between nodejs and mongoDB.
/*
  steps to communicate with mongoDB: {
    * install mongoose using - npm install mongoose

    * connecting to DB using - mongoose.connect(url), it will be async if database requires an authentication like username and passward

    * create schema, which will be the structure of the document in collection by using - "new mongoose.Schema({...Schema})"

    * compiling model, is a class used to perform CRUD operations, document in collection is an instance of model, compiled by using - "mongoose.model("model_name", schema)". If multiple database is connected then use - "db1.model("model_name", schema)"
  }



  Schema : {
    *** for schema refer 13-store-api project ***

    String: enum, match, trim, lowercase, uppercase, minlength, maxlength;

    Number: enum, min, max;

    Date: min, max, expires;

    All type: type, required, default, select, validate({validator, message}), get, set, index, unique;
  }


  CRUD : {

    -- create : {
      * await Model.create(data);
    
      * const doc = new Model(data), then await doc.save(); 
    }

    -- find : {
      * await Model.find(conditions:Object, projection:String wit space between, options:Object) - find multiple docs based on condition(null indicates all docs)

      * await Model.findOne(conditions, projection, options) - find single doc based on condition.

      * await Model.findById(id, projection, options) - same as findOne(), but it use only id property to find specific doc
    },

    -- update : {
      (update - modify the part of document)  
      (replace - modify the entire document, includes - findOneAndReplace(), replaceOne())

      * await Model.findOneAndUpdate(conditions, update_data) - find single doc and update the data

      * await Model.findByIdAndUpdate(id, update_data) - same as findOneAndUpdate(), but it use only id property to find

      * await Model.updateOne(conditions, update_data) - update the first doc that matches the condition, if no condition then update the first doc in collection.

      * await Model.updateMany(condition, update_data) - same as updateOne(), except it update all the docs that matches the condition, if no condition then update all docs in collection.

      Note: updateOne and updateMany return only the acknowledgement object not the document itself, whereas the findOneAndUpdate and findByIdAndUpdate will return the actual document
    }

    -- delete : {
      * await Model.findOneAndDelete(conditions, options) - find single doc and delete the data

      * await Model.findByIdAndDelete(id) - same as findOneAndDelete(), but it use only id property to find

      * await Model.deleteOne(condition) - delete the first doc that matches the condition, if no condition then delete the first doc in collection.

      * await Model.deleteMany(condition) - same as deleteOne(), except it delete all the docs that matches the condition, if no condition then delete all docs in collection.

      Note: deleteOne and deleteMany return only the acknowledgement object not the document itself, whereas the findOneAndDelete and findByIdAndDelete will return the actual document
    }

    
    create - params are (data, options)
    find - params are (filter, projection, options)
    update - params are (filter, update_data, options)
    delete - params are (filter, options)
  }


  options {
    find() - 
      lean: Boolean, 
      populate: Object{path: "<field>"},
      strict: Boolean,
      limit: Number,
      skip: Number,
      sort: String|Object
      select: String|Object

    findOneAndUpdate() -
      lean: Boolean,
      populate: Object{path: "<field>"},
      strict: Boolean,
      sort: String|Object,
      fields: Object|String, **Only this method has fields-property to select fields, remaining uses select-property**
      upsert: Boolean,
      new: Boolean,
      runValidators: Boolean

    findOneAndDelete() - lean, populate, strict, sort, select
  }

  params and query : {
    params : {
      part of url path
      url : example.com/api/v1/:param
      to get : req.params (returns : {param: value})
    }

    query : {
      part of url after '?'
      url : example.com/api/v1/:params?query1=value&query2=value
      to get : req.query (returns : {query1: value, query2: value})
    }
  }


  mongoose middleware : {
    schema.pre("action_name", call_back);
    schema.post("action_name", call_back);
  }

  mongoose instance method : {
    - schema.methods.method_name = function() {}
    - schema.method("method_name", function() {});
    - schema.method({
      method_name : function() {}
    })
  }
  
*/