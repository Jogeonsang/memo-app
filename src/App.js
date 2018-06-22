import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {

  id = 3 // 이미 0,1,2 가 있기 때문에 초기 id 값을 3으로 설정

  state = {
    input : '',
    todos : [
      { id : 0, text : '안녕', checked : false },
      { id : 1, text : '리액트!', checked : true },
      { id : 2, text : '반가워~', checked : false }
    ]
  }

handleChange = (e) => {
  this.setState({
    input : e.target.value // input의 다 바뀔 값
  });
}


handleCrate = () => {
  const { input , todos } = this.state;
  this.setState({
    input: '', // 인풋 비우고
    // concat을 사용하여 배열에 추가
    todos: todos.concat ({
    id: this.id++,
    text: input,
    checked : false
    })
  });
}

handleKeyPress = (e) => {
  if(e.key === 'Enter') {
    this.handleCrate();
  }
}

  render() {
    const { input, todos} = this.state;
    const {
      handleCrate,
      handleChange,
      handleKeyPress
    } = this;

    return (
      <TodoListTemplate form= {(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onClick={handleCrate}
        />
      )}>
        <TodoItemList todos={todos}/>
      </TodoListTemplate>
    );
  }
}
export default App;
