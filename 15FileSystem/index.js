// const fs = require('fs');
// fs.readFile('output.txt', (err, data) => {
// if (err) {
// return res.status(500).send('File not found');
// }
// res.send(data);
// })

//              File System
// fs.writeFile
// fs.readFile
// fs.appendFile
// fs.unlink
// fs.readdir
// fs.rename
// fs.createReadStream
// fs.mkdir
// fs.rmdir
// fs.stat
// fs.access

//              File Format
// Text File                     text/plain
// PDF                          application/pdf
// JSON                         application/json
// Image                         image/jpeg
// Video                         video/mp4
// Music

// res.setHeader('Content-Type','text/plain')

const express = require("express");
const app = express();
const fs = require("fs");




//Write File
app.get("/write-file", (req, res) => {
  fs.writeFile("./public/output.txt", "This is test message.", (err) => {
    if (err) {
      return res.status(500).send("File not found");
    }
    res.send("File written successfully");
  });
});




//Read File
app.get("/read-file", (req, res) => {
  fs.readFile("./public/output.txt", (err, data) => {
    if (err) {
      return res.status(500).send("File not found");
    }
    res.setHeader("Content-Type", "text/plain");
    res.send(data);
  });
});





//Append File
app.get("/append-file", (req, res) => {
  fs.appendFile(
    "./public/output.txt",
    "\nThis is new test message appended.",
    (err) => {
      if (err) {
        return res.status(500).send("Failed to append file.");
      }
      res.send("Content Appended.");
    }
  );
});




//Delete
app.get("/delete-file", (req, res) => {
  fs.unlink("./public/output.txt", (err) => {
    if (err) {
      return res.status(500).send("Failed to delete file.");
    }
    res.send("Content Deleted.");
  });
});




// Read a Folder / directory
app.get("/read-folder", (req, res) => {
  fs.readdir("./public", (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(files);
    res.send("Content Deleted.");
  });
});




// File Rename
app.get("/rename-file", (req, res) => {
  fs.rename("./public/output.txt", "./public/output1.txt", (err) => {
    if (err) {
      return res.status(500).send("Failed to rename file.");
    }
    res.send("File rename successfully.");
  });
});




// Stream Data
app.get("/stream-text", (req, res) => {
  const fileStream = fs.createReadStream("./public/output1.txt");

  fileStream.on("open", () => {
    fileStream.pipe(res);
  });

  fileStream.on("error", () => {
    res.status(500).send("File not found or error reading file.");
  });
});




// Create Folder
app.get("/create-folder", (req, res) => {
  fs.mkdir("./public/myFolder", (err) => {
    if (err) {
      return res.status(500).send("Failed to create folder.");
    }
    res.send("Folder create successfully.");
  });
});




// Rename Folder
app.get("/rename-folder", (req, res) => {
  fs.rename("./public/myFolder", "./public/renameFolder", (err) => {
    if (err) {
      return res.status(500).send("Failed to rename folder.");
    }
    res.send("Folder rename successfully.");
  });
});




// Delete Folder
app.get("/delete-folder", (req, res) => {
  fs.rmdir("./public/myFolder", (err) => {
    if (err) {
      return res.status(500).send("Failed to delete folder.");
    }
    res.send("Folder deleted successfully.");
  });
});




//Read PDF File
app.get("/read-pdf", (req, res) => {
  fs.readFile("./public/data.pdf", (err, data) => {
    if (err) {
      return res.status(500).send("PDF file not found");
    }
    res.setHeader("Content-Type", "application/pdf");
    res.end(data);
  });
});




//Read json File
app.get("/read-json", (req, res) => {
  fs.readFile("./public/data.json", (err, data) => {
    if (err) {
      return res.status(500).send("json file not found");
    }
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  });
});




//Write json File
app.get("/write-json", (req, res) => {
  const filePath = "./public/data.json";
  const data = { name: "akbar", email: "akbar67@gmail.com", age: 28 };
  fs.writeFile(filePath, JSON.stringify(data), (err, data) => {
    if (err) {
      return res.status(500).send("Failed to write JSON file.");
    }
    res.send("JSON file written successfully");
  });
});




//Append json File
app.get("/append-json", (req, res) => {
  const filePath = "./public/data.json";
  const newData = { name: "ahmad", email: "ahmad47@gmail.com", age: 23 };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).send("Failed to read JSON file.");
    }
    let jsonData;
    jsonData = JSON.parse(data);

    if (!Array.isArray(jsonData)) {
      jsonData = [jsonData];
    }

    jsonData.push(newData);

    fs.writeFile(filePath, JSON.stringify(jsonData), (err, data) => {
      if (err) {
        return res.status(500).send("Failed to write JSON file.");
      }
      res.send("JSON file written successfully");
    });
  });
});



//Read image File
app.get("/read-image", (req, res) => {
  fs.readFile("./public/image.webp", (err, data) => {
    if (err) {
      return res.status(500).send("image file not found");
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.end(data);
  });
});



//Read video File
app.get("/read-video", (req, res) => {
  fs.readFile("./public/video.mp4", (err, data) => {
    if (err) {
      return res.status(500).send("video file not found");
    }
    res.setHeader("Content-Type", "video/mp4");
    res.end(data);
  });
});



//Getting information for a File
app.get("/file-info", (req, res) => {
  fs.stat("./public/video.mp4", (err, stats) => {
    if (err) {
      return res.status(500).send("File not found");
    }
    res.json(stats.size + 'bytes');
    // res.json({size:stats.size,atime:stats.atime});
    console.log('File : ' + stats.isFile());    //use terminal
    console.log('Folder : ' + stats.isDirectory());
    
  });
});



//  Check File exists
app.get("/file-exists", (req, res) => {
  fs.access("./public/video.mp4", (err) => {
    if (err) {
      return res.status(500).send("File not found");
    }
    res.send('File exists');
   
  });
});





app.listen(4000, (req, res) => {
  console.log(`Successfully Connected http://localhost:${4000}`);
});
