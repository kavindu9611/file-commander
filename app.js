const fs = require("fs/promises");

(async () => {
  const commandFileHandler = await fs.open("./command.txt", "r");
  //watcher - async iterator
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      //the file was changed...
      // console.log(event);

      const size = (await commandFileHandler.stat()).size;
      const buff = Buffer.alloc(size);

      const offset = 0;
      const length = buff.byteLength;
      const position = 0;

      const content = await commandFileHandler.read(
        buff,
        offset,
        length,
        position
      );
      console.log(content);
    }
  }
})();
