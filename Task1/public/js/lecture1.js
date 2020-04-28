const str = (str, char) => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == char) {
            count++;
        }
    }
    return count + ' ' + char + "'s in " + str
};
console.log(str('banana', 'a'));
