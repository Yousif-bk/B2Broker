// Random fload number
const floadRandpn = (Math.random() * (100.12 - 0.02) + 0.02).toFixed(18);


// Key from data array object
const keyOfData = ['id', 'int'];

// Avi Colors
const colors = { red: 'Red', green: 'Green', blue: 'Blue' };

function pickRandomColor(obj: any) {
  let result;
  let count = 0;
  for (let prop in obj) if (Math.random() < 1 / ++count) result = prop;
  return result;
}

function pickRandomChild(items:any){
return items[Math.floor(Math.random()*items.length)];
}


function amountOfData(num:number) {
  let data = [];
  let arrayOfArray = [];

  // Generate number as array
  for (let i = 0; i < num; ++i) data[i] = i * 380 / 5;

  // Convert array to nested array
  while (data.length > 0) {
    arrayOfArray.push(data.splice(0, 2));
  }

  // add array key to orinal array
  arrayOfArray.unshift(keyOfData);

  // return array of array
  return arrayOfArray;
}


export function pseudoSocket(num:number){
  let arrayOfObject:any = {};
  let arrayOfObjectChild:any = {};
  let keys:any = [];
  let finalArray = [];
  let finalArrayChild:any = [];

  let arrayOfArray = amountOfData(num);

  keys = arrayOfArray.shift();

  // Main Array
  for (let i = 0; i < arrayOfArray.length; i++) {
    arrayOfObject = {};
    arrayOfObjectChild = {};

    // Main Array Of Obj
    for (let k = 0; k < keyOfData.length; k++) {
      arrayOfObject[keys[k]] = arrayOfArray[i][k];
    }

    // Child Array Of Obj
    for (let k = 0; k < keyOfData.length; k++) {
      arrayOfObjectChild[keyOfData[k]] = arrayOfArray[i][k];
    }

    // add Key to child array of obj
    Object.keys(arrayOfObjectChild).forEach(() =>{
      arrayOfObjectChild.color = pickRandomColor(colors);
    })

    finalArrayChild.push(arrayOfObjectChild)

    // add Key to main array of obj
    Object.keys(arrayOfObject).forEach(() =>{
      arrayOfObject.int = arrayOfObject.int * 25;
      arrayOfObject.color = pickRandomColor(colors);
      arrayOfObject.child = pickRandomChild(finalArrayChild);
      arrayOfObject.float = +floadRandpn;
    })


    finalArray.push(arrayOfObject);
  }

  return finalArray
}


