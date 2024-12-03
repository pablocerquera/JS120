function logNum() {
    console.log(this.num);
}

let obj = {
    num: 42
};

logNum.call(obj); // logs 42


// these two equal the same thing


function logNum() {
    console.log(this.num);
}


let obj = {
    num: 42
};

obj.logNum = logNum;
obj.logNum(); // logs 42


let obj1 = {
    logNum() {
        console.log(this.num);
    }
}
let obj2 = {
    num: 43
}


obj1.logNum.call(obj2); // logs 43

//this is the same as the previous example but this example mutates obj2
let obj1 = {
    logNum() {
        console.log(this.num);
    }
}
let obj2 = {
    num: 43
}

obj2.logNum = obj1.logNum;
obj2.logNum(); // logs 43