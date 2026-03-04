console.log("Harshit is the best");


const fs = require('fs');


fs.writeFile('harshit.txt', 'Harshit is the best', (err) => {
    if(err) throw err;
    console.log('File has been created');
});

