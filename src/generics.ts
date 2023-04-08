// Generics type (ex: Array<datatype goes in here or union like string | number >)
//const names: Array<string> = []; // same as string[]
  // names[0].split(' '); // string method would be allowed

  //type safety
//   const promise: Promise<number> = new Promise((resolve, reject) => {
//     setTimeout(() => {
  //    resolve(10); //10 works but a string would bring error because of Promise<number>
//     }, 2000);
// });

//promise.then(data => {
  //  data.split(' '); //would not work this a string method
//})

//creating a generic function- extends is critical and will ive error if not there
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
   }
   const mergedObj = merge({ name: 'max', hobbies: ['sports'] }, { age: 30 });
   console.log(mergedObj)

  //another example of generic function
interface Lengthy {
  length:number;
}

   function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.';
    if (element.length === 1) {
      descriptionText = 'Got 1 element';
    } else if (element.length > 1) {
      descriptionText = 'Got ' + element.length + ' elements.';
    }
    return [ element, descriptionText];
   }

   console.log(countAndDescribe(['sports', 'cooking']))

   // "keyof" constraint
   function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return 'Value: ' + obj[key];
   }

   extractAndConvert({name: 'bryan'}, 'name');

   //generic classes
   class DataStorage<T extends string | number | boolean > {
    private data: T[] = [];
    
    addItem(item: T){
    this.data.push(item);
   }

   removeItem(item: T) {
    if (this.data.indexOf(item) === -1){
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
   }

   getItems() {
    return [...this.data];
   }
  }

  const textStorage = new DataStorage<string>();
  textStorage.addItem('Max');
  textStorage.addItem('Manu');
  textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'}
// objStorage.addItem({name: 'Max'});
// objStorage.addItem({name: 'Manu'});
// // ...

// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

// Generic types gives you flexibility and type safety

//Generic Utility types examples
 interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
 }
  function createCourseGoal(
    title: string, 
    description: string, 
    date:Date 
    ): CourseGoal{
    //this would all be in one step --->//return {title: title, description: description, completeUntil: date};
  
    //instead below Partial gives you flexibilty with      
        let courseGoal: Partial<CourseGoal> = {};
        courseGoal.title = title;
        courseGoal.description = description;
        courseGoal.completeUntil = date;
        return courseGoal as CourseGoal;
  }

  //Readonly keeps data from being manipulated
   const names: Readonly<string[]> = ['Max', 'Anna'];
  //  names.push('Manu');  //throws error
  //  names.pop();         //throws error

  //choose union types when you want to be flexible with different types
  //Generics help you create data structures that work together or wrap 
  //values of a broad variety of types (e.g. an array that can hold any type of data).

  //Question: What's the idea behind constraints (when 
  //talking about generics)?

  //Answer: Constraints allow you to narrow down the concrete types
  //that may be used in a generic function etc.