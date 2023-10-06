const fs = require("node:fs");

fs.readFile("FirstURL.json", (err, data) => {
  if (err === null) {
    const jsonObject = JSON.parse(data); // Зчитування вмісту JSON та розбір в об'єкт JS
    const outputData = [];

    jsonObject.forEach((item) => {
      const StockCode = item.StockCode;
      const ValCode = item.ValCode;
      const Attraction = item.Attraction;

      const textToWrite = `${StockCode}-${ValCode}-${Attraction}`;
      outputData.push(textToWrite);
    });

    const mergedData = outputData.join("\n");

    fs.writeFile("output.txt", mergedData, "utf8", (err) => {
      if (err === null) {
        console.log("The file has been saved");
      } else {
        console.log(err);
      }
    });
  } else {
    console.log(err);
  }
});
