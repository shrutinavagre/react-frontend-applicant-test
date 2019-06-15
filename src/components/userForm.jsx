/* 
This userForm.jsx component is build to provide an input form with two input fields name and email. This components receives props from its parent component user.jsx 
*/

import React, { Component } from "react";

// Below is the NewUser Class Component

class NewUser extends Component {
  state = {
    data: {
      name: "",
      email: ""
    }
  };

  /*
  This handlechange function updates the satate property data everytime user changes values in input fileds ("name" & "email")
  */
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  render() {
    /* 
    Here object distructuing is done on properties in state and props.
    */
    const { data } = this.state;
    const { users, errors, onSubmit } = this.props;

    return (
      <form onSubmit={event => onSubmit(event, users, data)}>
        <div className="form-group">
          <label htmlFor="name" />
          <input
            onChange={event => this.handleChange(event)}
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            value={data["name"]}
          />
          {errors["name"] && (
            <div className="alert alert-danger">{errors["name"]}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email" />
          <input
            onChange={event => this.handleChange(event)}
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={data["email"]}
          />
          {errors["email"] && (
            <div className="alert alert-danger">{errors["email"]}</div>
          )}
        </div>
        <button className="btn btn-primary">Add User</button>
      </form>
    );
  }
}

export default NewUser;
