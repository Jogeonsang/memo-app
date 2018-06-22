import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends Component {

  id = 3 // 이미 0,1,2 가 있기 때문에 초기 id 값을 3으로 설정

  state = {
    input : '',
    todos : [
      { id : 0, text : '안녕하세요!', checked : false },
      { id : 1, text : 'React.js에 오신걸 환영합니다!', checked : true },
      { id : 2, text : '모두 즐거운 코딩 되세요!', checked : false }
    ],
    color : '#343a40'
  }

handleChange = (e) => {
  this.setState({
    input : e.target.value // input의 다음 바뀔 값
  });
}  // this.setState를 사용하여 input의 값이 변경될 때 실행된다.


handleCrate = () => {
  const { input , todos, color } = this.state;
  this.setState({
    input: '', // 인풋 비우고
    // concat을 사용하여 배열에 추가
    todos: todos.concat ({ //비어있는 input값에 concat을 사용하여 새로운 배열을 추가하는 방법
    id: this.id++, //id에 증감 연산자를 선언해 자동으로 1씩 증가하게 작성
    text: input, // 사용자가 작성하는 input
    checked : false, // checked 를 false로 작성한 이유는 논리 연산자를 사용했기 때문에 checked가 표시되지 않게 하기 위해서이다.
    color                // true로 설정하게 되면 true === true 가 되기 때문에 생성되면 checked가 표시된 상태로 생성되게 된다.
    })
  });
}

handleKeyPress = (e) => {
  if(e.key === 'Enter') {
    this.handleCrate();
  }
}

handleToggle = (id) => {
  const { todos } = this.state;

    //  파라미터로 받은 id를 가지고 몇번째 아이템인지 찾는다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; //선택한 객체

    const nextTodos = [...todos]; //배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState ({
      todos : nextTodos
    })
    }

handleRemove = (id) => {
  const { todos } = this.state;
  this.setState({
    todos : todos.filter(todo => todo.id !== id)
  });
}

handleSelectColor = (color) => {
  this.setState ({
    color
  })
}
  render() {
    const { input, todos, color} = this.state;
    const {
      handleCrate,
      handleChange,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this;

    return (
      <TodoListTemplate form= {(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onClick={handleCrate}
          color={color}
        />
      )}
      palette = {(
        <Palette colors ={ colors } selected = { color } onSelect = { handleSelectColor }/>
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}
export default App;
