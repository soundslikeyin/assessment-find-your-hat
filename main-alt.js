const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let gameOver = false;

class Field {
    constructor(field = []) {
        this.field = field ;
        this.locationX = 0; // initialise location of Character
        this.locationY = 0; // initialise location of Character
        this.field[0][0] = pathCharacter; // this method indicates the location of Character
    }    
}

const generateField = (row, column) => {
    
    let newMap = new Array();
    for (i = 0; i < row; i++){
        newMap[i] = new Array();
        for (j = 0; j < column; j++)
        newMap[i][j] = fieldCharacter;
    }
    return newMap;
}


const generateSolution = (newMap) => {
    const row = newMap.length;
    const column = newMap[0].length;
    const numberHoles = Math.floor(0.1 * (row*column));

    for (i = 0; i < numberHoles; i++) {

        let holePositionX = 0;
        let holePositionY = 0;

        while (holePositionX == 0 && holePositionY == 0) {
            holePositionX = Math.floor(Math.random() * column);
            holePositionY = Math.floor(Math.random() * row);
        }

        newMap[holePositionY][holePositionX] = hole;
    }

    let hatPositionX = 0;
    let hatPositionY = 0;

    while (hatPositionX == 0 && hatPositionY == 0 && newMap[hatPositionY][hatPositionX]!='O' ) {
        hatPositionX = Math.floor(Math.random() * column);
        hatPositionY = Math.floor(Math.random() * row);
    }

    newMap[hatPositionY][hatPositionX] = hat;

    return newMap;
}

const printField = (Field) => {
    for (i = 0; i < Field.field.length; i++) {
        console.log(Field.field[i].join(''));
    }
}

const solutionField = new Field(generateSolution(generateField(10, 5)));
const myField = new Field(generateField(10, 5));


const didUserWin = () => {
    switch (solutionField.field[solutionField.locationY][solutionField.locationX]) {
        case hat:
            myField.field[myField.locationY][myField.locationX] = pathCharacter;
            solutionField.field[solutionField.locationY][solutionField.locationX] = pathCharacter;
            console.log("Congrats, you found the hat!");
            gameOver = true;
            break;
        case hole:
            console.log("Game over. You fell into a hole");
            gameOver = true;
            break;
        case fieldCharacter:
            myField.field[myField.locationY][myField.locationX] = pathCharacter;
            solutionField.field[solutionField.locationY][solutionField.locationX] = pathCharacter;
            console.log("You haven't found the hat, please continue playing.");
            break;
        case pathCharacter:
            // myField.field[myField.locationY][myField.locationX] = pathCharacter;
            // solutionField.field[solutionField.locationY][solutionField.locationX] = pathCharacter;
            console.log("You haven't found the hat, please continue playing.");
            break;
    }
}

const getDirection = () => {
    const userDirection = prompt('Which direction do you want to move? (L,R,U,D):');

    switch (userDirection) {
        case 'L':
            if (myField.locationX > 0) {
                myField.locationX = myField.locationX - 1;
                solutionField.locationX = solutionField.locationX - 1;
            } else {
                console.log("Sorry, you cannot move that way. There's a wall there.");
            }
            break;
        case 'R':
            myField.locationX = myField.locationX + 1;
            solutionField.locationX = solutionField.locationX + 1;
            break;
        case 'U':
            if (myField.locationY > 0) {
                myField.locationY = myField.locationY - 1;
                solutionField.locationY = solutionField.locationY - 1;
            } else {
                console.log("Sorry, you cannot move that way. There's a wall there.");
            }
            break;
        case 'D':
            myField.locationY = myField.locationY + 1;
            solutionField.locationY = solutionField.locationY + 1;
            break;
        default:
            console.log('Your entry is invalid. Please enter again.');
            getDirection();
            break;
    }

}

while (gameOver === false) {
    printField(myField);
    getDirection();
    didUserWin();
}

printField(solutionField);

