// Check function to check if word has been played already
Check = function(word){
    this.currentWord = word,
    this.currentWordArray = word.split(""),
    this.lettersGuessed = []
}

module.exports = Check;

