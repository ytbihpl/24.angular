import { Component } from '@angular/core';

const todos = [
  {
    id: 1,
    title: '吃饭',
    done: true
  },
  {
    id: 2,
    title: '唱歌',
    done: false
  },
  {
    id: 3,
    title: '写代码',
    done: true
  },
  {
    id: 4,
    title: '看书',
    done: true
  },
  
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: {
    id: number,
    title: string,
    done: boolean
  }[] = JSON.parse(window.localStorage.getItem('todos') || '[]');

  public visibility: string = 'all'
  defaultObject = {id:10000,title:'xxx',done:false};
  public currentEditing: {
    id: number,
    title: string,
    done: boolean
  } = this.defaultObject
  // // 该函数是一个特殊的 Angular 生命周期钩子函数
  // // 它会在 Angular 应用初始化的时候执行一次
  ngOnInit () {
    // 初始化的时候手动调用一次
    this.hashchangeHandler()

    // 注意：这里要 bind this绑定
    window.onhashchange = this.hashchangeHandler.bind(this)
  }

  // // 当 Angular 组件数据发生改变的时候，ngDoCheck 钩子函数会被触发
  // // 我们要做的就是在这个钩子函数中去持久化存储我们的 todos 数据
  ngDoCheck() {
    window.localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  get filterTodos () {
    if (this.visibility === 'active') {
      return this.todos.filter(t => !t.done)
    } else if (this.visibility === 'completed') {
      return this.todos.filter(t => t.done)
    }else{
      return this.todos
    }
  }

  // // 实现导航切换数据过滤的功能
  // // 1. 提供一个属性，该属性会根据当前点击的链接返回过滤之后的数据
  // //   filterTodos
  // // 2. 提供一个属性，用来存储当前点击的链接标识
  // //    visibility 字符串
  // //    all、active、completed
  // // 3. 为链接添加点击事件，当点击导航链接的时候，改变
  // //     

  addTodo (e:any): void {
    // console.log(e.target.value)
    const titleText = e.target.value
    if (!titleText.length) {
      return
    }
    
    const last = this.todos[this.todos.length - 1]
    
    this.todos.push({
      id: last ? last.id + 1: 1,
      title: titleText,
      done: false
    })

    // 清除文本框
    e.target.value = ''
  }

  get toggleAll () {
    return this.todos.every(t => t.done)
  }

  set toggleAll (val: any) {
    // console.log(val.checked)
    this.todos.forEach(t => t.done = val.checked)
  }

  removeTodo (index: number): void {
    this.todos.splice(index, 1)
  }

  saveEdit (todo:any, e:any) {
    // 保存编辑
    todo.title = e.target.value

    // 去除编辑样式
    this.currentEditing = this.defaultObject
  }

  handleEditKeyUp (e:any) {
    const {keyCode, target} = e
    if (keyCode === 27) {
      // 取消编辑
      // 同时把文本框的值恢复为原来的值
      target.value = this.currentEditing.title
      this.currentEditing = this.defaultObject
    }
  }

  get remaningCount () {
    return this.todos.filter(t => !t.done).length
  }

  hashchangeHandler () {
    // 当用户点击了锚点的时候，我们需要获取当前的锚点标识
      // 然后动态的将根组件中的 visibility 设置为当前点击的锚点标识
    const hash = window.location.hash.substr(1)
    switch (hash) {
      case '/':
        this.visibility = 'all'
        break;
      case '/active':
        this.visibility = 'active'
        break;
      case '/completed':
        this.visibility = 'completed'
        break;
    }
  }

  // 清除所有已完成任务项
  clearAllDone () {
    this.todos = this.todos.filter(t => !t.done)
  }
}
