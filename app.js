const fs = require("fs/promises");

(async () => {
  //watcher - async iterator
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      //the file was changed...
      console.log(event);
    }
  }
})();
