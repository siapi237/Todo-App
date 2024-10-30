import React, {useState, useEffect} from 'react';
import {Routes,Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import View from './View';
import Add from './Add';

import { ApiClient } from "./apiClient";

function App(){
  const [todos, changeTodos] = useState([])
  const client = new ApiClient()
  const [search, changeSearch] = useState()

  const refreshList = () => {
    client.getTodos().then((response) => changeTodos(response.data));
  };

  const addTodoItem = (title,description, dueDate) => {
    client.addTodo(title,description,dueDate).then(() => refreshList());
  }

  const handleChange = (event)=>{
    let newState={search};
    newState = event.target.value;
    changeSearch(newState)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(search)
    client.searchTodos(search).then((response) =>changeTodos(response.data))
  }

  useEffect(() => {
    refreshList();
  },[])

    return (
      <div >

        <Navbar bg="light" expand="md" >
          <Navbar.Brand>Todo list</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/view">View</Link>
              <Link className="nav-link" to="/add">Add</Link>
            </Nav>

            <Form inline onSubmit={(event) => submitHandler(event)}>
        <Row >
          <Col xs="auto">
            <Form.Control
              type="text"
              name="searchterm"
              placeholder="Search"
              className=" mr-sm-2"
              value= {search} 
              onChange={(event)=>handleChange(event)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
          </Navbar.Collapse>
        </Navbar>

        <Container>
          <Routes>
            <Route path="/" element={
              <View todos={todos} refresh={()=>refreshList()}
              client={client}/>
            } />
            
            <Route path="/view" element={
              <View todos={todos} refresh={()=>refreshList()}
                client={client}/>
            } />
            
            <Route path="/add" element={
              <Add  onSubmit={(title,description, dueDate, complete) =>
              addTodoItem(title,description,dueDate,complete)} 
              client={client}/>
            } />
           
           </Routes>
           <Row>
              <p className='text-black-50'>
                Use the menu at the top of the page to navigate and add todo items
              </p>
           </Row>
        </Container>
      </div>
    );

}
export default App;
