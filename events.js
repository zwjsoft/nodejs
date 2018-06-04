const EmitterEvent=require('events')
class MyEmitter extends EmitterEvent{}
const myEmitter = new MyEmitter();
const myEmitter1 = new MyEmitter();

myEmitter.on('event', () => {
  console.log('myEmitter');
});
myEmitter.on('event', () => {
  console.log('myEmitter1');
});

myEmitter.emit('event');

