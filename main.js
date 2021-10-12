const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor( field = []) {
        // each Field is a 2-d array with the name field for easy access
        this.field = field;
        this.locationX = 0; // initialise location of Character
        this.locationY = 0; // initialise location of Character
        this.field[0][0] = pathCharacter; // this method indicates the location of Character
    }
}

const generateField = (height, width) => {
    let newField = [[]];

    for ( i = 0; i < height; i++) {
        for ( j = 0; j < width; j++) {
            newField[i][j] = fieldCharacter;
        }
    }


    numberHoles = 10;

    for (i = 0; i <numberHoles) {
    newField[Math.floor(Math.random() * height][Math.floor(Math.random() * width]= hole;
}
    newField[Math.floor(Math.random() * height][Math.floor(Math.random() * width]= hat;

    return newField

}


const myField = new Field(generateField(5,5));

const didUserWin = () => {

    switch (myField[myField.locationX][myField.locationY]) {
        case '^' :
            myField.field[myField.locationX][myField.locationY] = pathCharacter;
            console.log("Congrats, you found the hat!");
            return true;
        case 'O' :
            console.log("Game over. You fell into a hole");
            return true;
        case '░' :
            myField.field[myField.locationX][myField.locationY] = pathCharacter;
            console.log("You haven't found the hat, please continue playing.");
            return false;
        case '*' :
            myField.field[myField.locationX][myField.locationY] = pathCharacter;
            console.log("You haven't found the hat, please continue playing.");
            return false;
    }

}

const getDirection = () => {
    const userDirection = prompt('Which direction do you want to move? (L,R,U,D):');


    switch (userDirection) {
        case 'L' :
            if (myField.locationX >0) {
                myField.locationX = myField.locationX - 1;  
            }  else {
                console.log("Sorry, you cannot move that way. There's a wall there.");
            }
            break;
        case 'R' :
            myField.locationX = myField.locationX - 1;  
            break;
        case 'U' :
            if (myField.locationY >0) {
                myField.locationY = myField.locationY - 1;  
            } else {
                console.log("Sorry, you cannot move that way. There's a wall there.");
            }
            break;
        case 'D' :
            myField.locationY = myField.locationY - 1;  
            break;
        default :
            console.log('Your entry is invalid. Please enter again.');
            getDirection();
            break;
    }

}


const printField = (field) => {
    for (i = 0; i< field.length; i++) {
        console.log(field[i].join() + "\n");
    }
}



while (didUserWin === false) {
    printField(myField);
    getDirection();
}

 
