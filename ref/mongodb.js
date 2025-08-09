/*
  download mongodb community edition as msi;
  install it and add the bin folder path in environmental variable;
  
  while installing, the log and data folders needs full control;
  best to create new folder with log and data folder.
  And change the path in \bin\mongod.cfg(configuration file) 
*/

/* Operators
    -Operators are starts wit '$' sign-

  * Comparison operators {
    -Comparison operators returns data based on the value comparisons-
    -includes: $eq, $ne, $in, $nin, $lt, $lte, $gt, $gte-

    syntax for each operators except $in and $nin : 
      db.collection.find({<field>: {$<op>: <value>}})
      where, <field> is the property in the document
             <value> is the value need to compare with the property
             <op> is the operators such as - eq, ne, gt, ...
    syntax for $in and $nin : 
      db.collection.find({<field>: {$<op>: [<value1>, <value2>,....]}})     
      where, <op> is the operators such as - in or nin        

    $eq : Matches values that are equal to a specified value
    $gt : Matches values that are greater than a specified value.
    $gte : Matches values that are greater than or equal to a specified value.
    $in : Matches any of the values specified in an array.
    $lt : Matches values that are less than a specified value.
    $lte : Matches values that are less than or equal to a specified value.
    $ne : Matches all values that are not equal to a specified value.
    $nin : Matches none of the values specified in an array.
  }

  * Logical Operators {

    -Logical operators return data based on the expression that evaluate true or false. If true that doc will be returned-
    -includes: $and, $not, $or, $nor-

    syntax for each operators excepts $not : 
      dp.collection.find({$op: [<expression>, <expression>, ...]})
      where, <op> is the operators such as - and, or, nor
             <expresion> is query wit other operators
    syntax for $not :
      db.collection.find({<field>: {$not: {<expression>}}})
      where, <field> is the property of document

    $and : Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
    $not : Inverts the effect of a query predicate and returns documents that do not match the query predicate.
    $nor : Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
    $or : Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
  }

  * Element Operators {

    -Element operator will return data which return true if the key matches the field or datatype-
    -includes: $exists, $type-

    syntax for $exists : 
      db.collection.find({<field>: {$exists: <boolean>}})
        <boolean> if true return the docs which contain that field, else return the docs which does not contain that field 
    syntax for $type :
      db.collection.find({<field>: {$type: <datatype>}})
      db.collection.find({<field>: {$type: [<datatype>, <datatype>, ...]}})
        <datatype> as string of lowercase like "int", "string", etc

    $exists : Matches documents that have the specified field.
    $type : Selects documents if a field is of the specified type.
  }

  * Evaluation Operators {
    -includes: $expr, $jsonSchema, $mod, $regex, $where-

    $expr : { 
      -This $expr operator will be used to compare two property within the document and return the doc if it satisfied-
      -It allow use of aggregation expression within the query language-
      -Work inside the find, update, delete and even in the $match stage in aggregation-

      syntax : 
        {$expr: <aggregation-expression>}
        where, <aggregation-expression> = {$op: [<arg>, <arg>, ...]}
               where, op - operator will any like arithmetic, comparison, logical, date, string ...
                      arg - field reference ex: "$<field>"

      -It also use the $cond operator, For example:
        $expr : {$lt : [
          {
            $cond: {
              if: {$gte: ["$price", 100]}, 
              then: {$multiply: ["$price", 0.5]}, 
              else: {$multiply: ["$price", 0.75]}
            }
          }, 20
        ]}
    }

    $jsonSchema : It provide schema and validation for collection, same as new mongoose.Schema({}) but different syntax;

    $mod : {
      syntax: 
        {<field>: {$mod: [divisor, remainder]}}
        where, the field is divided by divisor and compare wid remainder, if same the doc will return;
      -empty, more then two element in array cause error-
    }

    $regex : {
      syntax: 
        {<field>: {$regex: <regular expression>}}
        where, <regular expression> in ref/regExp
    }

    $where : {
      -allow to use js for querying data-
      -it does not allowed in mongodb atlas-
      syntax: 
        {$where: <jsAsString|jsFunction>}
    }
  }


  * Array Operators {
    -includes: $all, $elemMatch, $size-

    $all : {
      -$all is same as $and operator, it return doc if the array field includes all element in the array of $all-
      -this may use to non-array field-
      syntax:
        {<field>: {$all: [elem, elem, ...]}}
    }

    $elemMatch : {
      -The $elemMatch operator matches documents that contain an array field with at least one element that matches all the specified query criteria-
      syntax: 
        {<field>: {$elemMatch: {<query>, <query>, ...}}}
    }

    $size : {
      -Match doc based on its size, if size match then that doc return-
      syntax:
        {<field>: {$size: <arraySize>}}
    }
  }

*/