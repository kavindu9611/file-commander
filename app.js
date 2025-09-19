const fs = require("fs/promises");

(async () => {
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

    console.log(buff.toString("utf-8"));
  });

  //watcher - async iterator
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
