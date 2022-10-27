

export class PseudoSocket {


  // Random fload number
 floadRandpn = (Math.random() * (100.12 - 0.02) + 0.02).toFixed(18);


// Key from data array object
 keyOfData = ['id', 'int'];

// Avi Colors
 colors = { red: 'Red', green: 'Green', blue: 'Blue' };


 pickRandomColor(obj: any) {
  let result;
  let count = 0;
  for (let prop in obj) if (Math.random() < 1 / ++count) result = prop;
  return result;
}

 pickRandomChild(items:any){
return items[Math.floor(Math.random()*items.length)];
}


 amountOfData(num:number) {
  let data = [];
  let frequencyDataArray = [];

  // Generate number as array
  for (let i = 0; i < num; ++i) data[i] = i * 380 / 5;

  // Convert array to nested array
  while (data.length > 0) {
    frequencyDataArray.push(data.splice(0, 2));
  }

  // add array key to orinal array
  frequencyDataArray.unshift(this.keyOfData);

  // return array of array
  return frequencyDataArray;
}


   pseudoSocket(num:number){
  let frequencyDataObj:any = {};
  let frequencyDataOfObjlChild:any = {};
  let keys:any = [];
  let finalfrequencyData = [];
  let finalfrequencyDataChild:any = [];

  let frequencyDataArray = this.amountOfData(num);

  keys = frequencyDataArray.shift();

  // Main Array
  for (let i = 0; i < frequencyDataArray.length; i++) {
    frequencyDataObj = {};
    frequencyDataOfObjlChild = {};

    // Main Array Of Obj
    for (let k = 0; k < this.keyOfData.length; k++) {
      frequencyDataObj[keys[k]] = frequencyDataArray[i][k];
    }

    // Child Array Of Obj
    for (let k = 0; k < this.keyOfData.length; k++) {
      frequencyDataOfObjlChild[this.keyOfData[k]] = frequencyDataArray[i][k];
    }

    // add Key to child array of obj
    Object.keys(frequencyDataOfObjlChild).forEach(() =>{
      frequencyDataOfObjlChild.color = this.pickRandomColor(this.colors);
    })

    finalfrequencyDataChild.push(frequencyDataOfObjlChild)

    // add Key to main array of obj
    Object.keys(frequencyDataObj).forEach(() =>{
      frequencyDataObj.int = frequencyDataObj.int * 25;
      frequencyDataObj.color = this.pickRandomColor(this.colors);
      frequencyDataObj.child = this.pickRandomChild(finalfrequencyDataChild);
      frequencyDataObj.float = +this.floadRandpn;
    })


    finalfrequencyData.push(frequencyDataObj);
  }

  return finalfrequencyData
}



}
