import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function UserForm(props) {
  return (
    <Form onSubmit={props.submitHandler}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Enter a Twitter username"
          aria-label="Enter a Twitter username"
          value={props.screenNameInput}
          name="screen_name_input"
          onChange={props.changeHandler}
        />
        <InputGroup.Append>
          <Button variant="primary" type="submit">Submit</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}

export default UserForm;