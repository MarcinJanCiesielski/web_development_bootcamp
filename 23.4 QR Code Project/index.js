/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import * as fs from "node:fs";
import inquirer from "inquirer";
import qr from "qr-image"

inquirer
  .prompt([
    {
      message: "Provide url for site you want to make qr code from",
      name: "URL"
    }
  ])
  .then((answers) => {
    const url = answers.URL;
    const qr_svg = qr.image(url, {type: 'png'});
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));
    fs.appendFile("user_data.txt", url, (err) => {
      if (err) throw err;
      console.log("Data has been saved");
    });
  })

  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
