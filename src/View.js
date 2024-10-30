import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';
import Edit from './Edit';

function View(props){
  const [hidden, changeHidden] = useState(true);
  const [todo, changeTodo] = useState(
    { id: "", 
      title: "", 
      description:"",
      dueDate:"",
     tags: "",
      complete: false }
  )

  const showEdit = (id) =>{
    changeHidden(false);
    changeTodo(id);
  }
  const refresh =  ()=>{
    changeHidden(true);
    props.refresh()
  }

  const editTodoItem = (id,title,description, dueDate, complete) => {
    props.client.editTodo(id, title,description,dueDate, complete).then(()=>refresh());
  }

  const deleteTodo = (id) =>{
    props.client.removeTodo(id).then(()=>refresh());
  }

  const addTag = (id,body)=>{
    props.client.addTag(id,body).then(()=>refresh());
  }
  

  const buildRows = () =>  {
    return props.todos.map((current) => (
      <tr key={current.id}>
        <td>
          {current.title}
        </td>
        <td>
          {current.description}
        </td>
        <td>
          {current.dueDate}
        </td>
        <td>
          {current.tags}
          <br />
          
          {
            <>
            <input 
              name="tagvalue"
            />
            <button onClick={() => addTag(current.id)}>Add</button>
            </>
            }
        </td>
        <td>
          {current.completed ? "yes" : "no"}
        </td>
        <td>
          {<button onClick={() => showEdit(current)}>Edit</button>}
          {<button onClick={() => deleteTodo(current.id)}>Delete</button>}
        </td>

      </tr>
    )
    )
  }


    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Tags</th>
              <th>Complete?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buildRows()}
          </tbody>
        </Table>
        <br />
        {hidden ? <></> :
         <Edit todo={todo} onSubmit={(title,description, dueDate, complete) =>
          editTodoItem(title,description,dueDate,complete)}  />
        }
      </>
    );

}
export default View;
