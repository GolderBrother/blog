onmessage = function (message) {
  let data = message.data;
  console.log(`Worker: Message from main thread ${JSON.stringify(data)}`);
  data.msg = "Hi from task.js";
  postMessage(data);
};
