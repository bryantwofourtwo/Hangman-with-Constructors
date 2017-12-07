//take in a random word as an argument and 
//displays it as a line of dashes

Display = function(word) {
    this.wordArray = word.split(""),
    this.arrayofDashes = [],
    this.updated,
    this.originalDisplay = function() {
        for(i=0; i<this.wordArray.length; i++) {
            if(this.wordArray[i] === " ") {
                x = " ";
                this.arrayofDashes.push(x);
            }
            else {
                x = "-";
                this.arrayofDashes.push(x);
            }
        }
        console.log(this.arrayofDashes.join(""));
    },
    this.updatedDisplay = function(letter) {
        for(i=0; i<this.wordArray.length; i++) {
            if(letter == this.wordArray[i]) {
                this.arrayofDashes.splice(i, 1, letter);
            }
        }
        this.updated = this.arrayofDashes.join("");
        console.log(this.updated);
    }
}

module.exports = Display;
