const EventEmitter=require('events')
console.log(EventEmitter)
class MyEmitter extends EventEmitter{}
let myEmitter=new MyEmitter();
myEmitter.on('event', () => {
    console.log('触发了一个事件！');
  });
  myEmitter.emit('event');