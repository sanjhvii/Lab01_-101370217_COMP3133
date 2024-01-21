
// 
const fs = require('fs');
const csv = require('csv-parser');

const path = './input_countries.csv';
const canFile = './canada.txt';
const usFile = './usa.txt';

if (fs.existsSync(canFile)){
    fs.unlinkSync(canFile);
}

if (fs.existsSync(usFile)){
    fs.unlinkSync(usFile);
}

fs.createReadStream(path)
    .pipe(csv())
    .on('data', (row)=>{
        if(row['country'] == "Canada"){
            let x = row['country'] + "," + row['year'] + "," + row['population'] + "\n";
            fs.appendFile(canFile, x, (err) => {
                if (err){
                    console.log(err);
                }
            })
        }
        if(row['country'] == "United States"){
            let x = row['country'] + "," + row['year'] + "," + row['population'] + "\n";
            fs.appendFile(usFile, x, (err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
    })
    .on('end', ()=>{
        console.log("Successfully processed CSV file!")
    })