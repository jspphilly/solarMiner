
class starPiece {
    constructor(type, value){
        this._value = value || 1;
        this._type = determineType(type);
    }
    
    move(){
        console.log("Moving Piece")
    }

    getValue(multiplier){
        var computedValue = this.value * multiplier;
        console.log("Computer Value is :" + computedValue)
        return  computedValue;
    }
}

class RedStar extends starPiece {

}


function determineType(type){
    
    switch (type){
        case 0:
            return {
                name:   "Red-Star",
                color:  'red'
            }
            break;
        
        case 1:
            return {
                name:   "Blue-Star",
                color:  'blue'
            }
            break;

        case 2:
            return {
                name:   "Yellow-Star",
                color:  'yellow'
            }
            break;

        case 3:
            return {
                name:   "Green-Star",
                color:  'green'
            }
            break;

        case 4:
            return {
                name:   "Black-Star",
                color:  'black'
            }
            break;

        case 5:
            return {
                name:   "Orange-Star",
                color:  'orange'
            }
            break;



    }
}

