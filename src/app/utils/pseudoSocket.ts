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
  let frequencyDataArray = [];

  // Generate number as array
  for (let i = 0; i < num; ++i) data[i] = i * 380 / 5;

  // Convert array to nested array
  while (data.length > 0) {
    frequencyDataArray.push(data.splice(0, 2));
  }

  // add array key to orinal array
  frequencyDataArray.unshift(keyOfData);

  // return array of array
  return frequencyDataArray;
}


export function pseudoSocket(num:number){
  let frequencyDataObj:any = {};
  let frequencyDataOfObjlChild:any = {};
  let keys:any = [];
  let finalfrequencyData = [];
  let finalfrequencyDataChild:any = [];

  let frequencyDataArray = amountOfData(num);

  keys = frequencyDataArray.shift();

  // Main Array
  for (let i = 0; i < frequencyDataArray.length; i++) {
    frequencyDataObj = {};
    frequencyDataOfObjlChild = {};

    // Main Array Of Obj
    for (let k = 0; k < keyOfData.length; k++) {
      frequencyDataObj[keys[k]] = frequencyDataArray[i][k];
    }

    // Child Array Of Obj
    for (let k = 0; k < keyOfData.length; k++) {
      frequencyDataOfObjlChild[keyOfData[k]] = frequencyDataArray[i][k];
    }

    // add Key to child array of obj
    Object.keys(frequencyDataOfObjlChild).forEach(() =>{
      frequencyDataOfObjlChild.color = pickRandomColor(colors);
    })

    finalfrequencyDataChild.push(frequencyDataOfObjlChild)

    // add Key to main array of obj
    Object.keys(frequencyDataObj).forEach(() =>{
      frequencyDataObj.int = frequencyDataObj.int * 25;
      frequencyDataObj.color = pickRandomColor(colors);
      frequencyDataObj.child = pickRandomChild(finalfrequencyDataChild);
      frequencyDataObj.float = +floadRandpn;
    })


    finalfrequencyData.push(frequencyDataObj);
  }

  return finalfrequencyData
}


