## 简答题

1. - 由于js需要对dom进行操作，所以设计为单线程。但是单线程处理任务的时候必须一个个按顺序执行，处理多任务的时候会有执行效率地下和任务耗时长的确定，于是出现了异步编程，这样一来，后面的任务就可以在前一个任务执行完之前执行。异步编程的发展阶段为 callback => 发布/订阅模式 => promise => generator => async/await。
   - EventLoop是事件循环；消息队列又叫任务队列，里面存放着异步操作的回调函数。EventLoop一直检查调用栈是否有函数需要执行，如果有就从栈顶开始执行。执行过程中如果发现其他函数，如果是同步就直接入栈，异步的就先挂起到任务队列，当调用栈中的函数执行完后就从任务队列中按顺序弹出一个函数继续执行。
   - 宏任务和微任务是异步任务的两种分类。在事件循环中，主线程中的函数都执行完以后，会先检查挂起的任务中是否有微任务。如果有，就先执行所有微任务，之后再执行宏任务，没有就直接执行宏任务。

