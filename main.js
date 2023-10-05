const fs = require("node:fs");


fs.readFile("FirstURL.json", (err,data)=>{
    if(err===null){
        //console.log(data.toString());
        
            const jsonObject = JSON.parse(data); //зчитування вмісту JSON та розбір в об'єкт  JS
            jsonObject.forEach((item, index) => {
            const StockCode = item.StockCode;
            const ValCode = item.ValCode;
            const Attraction = item.Attraction;

            const textToWrite = `${StockCode}-${ValCode}-${Attraction}`;
            fs.writeFile(`output${index}.txt`,textToWrite,"utf8", (err)=>{
                if(err===null){
                    console.log("The file has been saved");
                    if(index === 2){
                      mergeFiles();
                    }
                }else{
                    console.log(err);
                }
            });
        });
        
    }else{
        console.log(err);
    }
    
});

/*function checkAndMergeFile() {
  fs.readFile("output.txt", "utf8", (err, data) => {
    if (err === null) {
        // Розділити текст на рядки та видалити порожні рядки
        const lines = data.split("\n").filter(Boolean);
        if(lines.length !== 4){
          mergeFiles(() => {
            // Після злиття перевіряємо файл ще раз
            checkAndMergeFile();
          });
        }
        
    } else {
        console.log(err);
    }
});
}*/

function mergeFiles(callback) {
fs.writeFile("output.txt", "", "utf8", (err) => { //створення або перезапис файлу "output.txt" з вмістом ""
  
    if(err===null){
        for (let i = 0; i <= 2; i++) {
            const fileName = `output${i}.txt`;
            fs.readFile(fileName, "utf8", (readErr, data) => {
              if (readErr) {
                console.log(readErr);
              } else {
               
                fs.appendFile("output.txt", data + "\n", "utf8", (appendErr) => { //"output.txt" - куди переносимо,  data + "\n" - що переносимо (data це прочитаний текст з readFile)
                  if (appendErr) {
                    console.log(appendErr);
                  } else {
                    console.log(`The content from the file has been added to the merged file`);
                  }
                });
              }
            });
          }
          
    }
    else{
        console.log(err);
    }
  });
}
