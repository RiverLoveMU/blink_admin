self.addEventListener(
  "message",
  function (e) {
    console.log(e.data);
    self.postMessage("You said: " + e.data);
  },
  false
);

self.postMessage("You said: ");
