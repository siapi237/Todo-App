import React, {useState} from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';



function Add(props){
  
  const [formValues, changeFormValues]=useState({
    title: "",
    description:"",
    dueDate:"",
    completed:false,
  });
  const [disabled, changeDisabled] = useState(false);

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  const handleChange= (event) => {
    const newState={...formValues};
    if (event.target.name === "completed"){
      newState[event.target.name] = !formValues.completed;
    } else {
      newState[event.target.name] = event.target.value;
    }
    changeFormValues(newState)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    changeDisabled(true);
    props.onSubmit(formValues.title, formValues.description, formValues.dueDate, formValues.completed);
    toastr["success"]("Todo added", "Success")
    changeFormValues({
      title:"",
      description:"",
      dueDate:"",
      completed: false
    })
    changeDisabled(false);
  }

  return (
      <div>
        <Form onSubmit={(event) => submitHandler(event)}>
        <Form.Group controlId="taskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              name="title" 
              type="text"
              value={formValues.title}
              onChange={(event)=>handleChange(event)}  
            />
          </Form.Group>

          <Form.Group controlId="taskDescription">
            <Form.Label> Description</Form.Label>
            <Form.Control 
              name="description" 
              type="text"
              value={formValues.description}
              onChange={(event)=>handleChange(event)}  
            />
          </Form.Group>

          <Form.Group controlId="taskDueDate">
            <Form.Label> Due Date</Form.Label>
            <Form.Control 
              name="dueDate" 
              type="text"
              value={formValues.dueDate}
              onChange={(event)=>handleChange(event)}  
            />
          </Form.Group>

          <Form.Group controlId="completed">
            <Form.Check 
              type="checkbox"
              name="completed"
              label="Completed?"
              value={formValues.completed}
              onChange={(event)=>handleChange(event)} 
            />
          </Form.Group>
          
          <Button variant="primary" type="submit" disabled={disabled}>
            Submit
          </Button>
        </Form>
      </div>
  );

}
export default Add;
