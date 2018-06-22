import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  render(){
    const { text, checked, id, onToggle, onRemove} = this.props;

    return (
      <div className="to-do-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle이 실행되지 않도록 하는 코드 , 이벤트의 확산을 멈춰주는 코드이다.
          onRemove(id)}
        }>&times;</div>
        <div className={`to-do-text ${checked && 'checked'}`}>
          <div> { text } </div>
        </div>
        {
          checked && (<div className="check-mark">✓</div>)
        }
        </div>
    );
  }
}

export default TodoItem;