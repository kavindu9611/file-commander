const fs = require("fs/promises");

(async () => {
  const createFile = async(path)=>{
   try{
    //Check whether or not already have that file
    const existingFileHandle = await fs.open(path, "r")
    existingFileHandle.close()

    //Already have that file...
    return console.log(`The file ${path} already exists.`)

   }catch(e){
    //Dont have the file.should create the file
    const newFileHandle = await fs.open(path, "w")
    console.log("A new file was successfully created.")
    newFileHandle.close()
   }

  }

  //commands
  const CREATE_FILE = "create a file"

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    //Get the size of the file
    const size = (await commandFileHandler.stat()).size;
    //Allocate buffer with the size of the file
    const buff = Buffer.alloc(size);

    //The location at which want to start filling the buffer
    const offset = 0;
    //How many bytes we want to read
    const length = buff.byteLength;
    //The position that we want to start reading the file from
    const position = 0;

    await commandFileHandler.read(
      buff,
      offset,
      length,
      position
    );

    const command = buff.toString("utf-8");

    if(command.includes(CREATE_FILE)){
      const filePath = command.substring(CREATE_FILE.length + 1)
      createFile(filePath)
    }
  });

  //watcher - async iterator
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
