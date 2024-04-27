import * as React from "react";

const TestWorker: React.FC = () => {
  React.useEffect(() => {
    const worker = new Worker(new URL("./worker.js", import.meta.url));

    worker.onmessage = (e) => {
      console.log(e.data);
    };

    worker.postMessage("hello");

    const first = () =>
      new Promise((resovle, reject) => {
        console.log(1);
        const p = new Promise((resovle, reject) => {
          console.log(2);
          setTimeout(() => {
            console.log(3);
            resovle(4);
          }, 0);
          resovle(5);
        });
        resovle(6);
        p.then((arg) => {
          console.log(arg);
        });
      });
    first().then((arg) => {
      console.log(arg);
    });
    console.log(7);
  }, []);

  return <div style={{ padding: 10 }}>111</div>;
};

export default TestWorker;
