// object destructuring :
const obj = {
  name: "frad",
  age: 20,
  edu: {
    deg: "master",
    school: {
      name: "harvard",
    }
  }
}


const {name:oname} = obj;
// console.log(oname);

// nester destructuring...

const {edu: {deg}} = obj
// console.log(deg);

const {edu: {school: {name:sname}}} = obj;
// console.log(sname);

// if the nester object is not presented then it cause TypeError

// Example 
// const {education: {deg: deg1}} = obj;
// console.log(deg1);

// Solution is to add default 
const {education: {deg: deg2} = {}} = obj;
// console.log(deg2) // undefined;

const {
  education: {
    schoolObj: {
      name:sname2 = "oxford" // 'oxford' is default for name if name is not defined then 'oxford' will used;
    } = {} // '{}' is default for school 
  } = {} // '{}' is default for edu
} = obj;

console.log(sname2)