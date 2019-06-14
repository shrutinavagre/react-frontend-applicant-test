import React, { Component } from "react";

class NewUser extends Component {
  state = {
    data: {
      name: "",
      email: ""
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  render() {
    const { data } = this.state;

    return (
      <form action="">
        <label htmlFor="name" />
        <input
          onChange={event => this.handleChange(event)}
          type="text"
          name="name"
          id="name"
          value={data["name"]}
        />
        <label htmlFor="email" />
        <input
          onChange={event => this.handleChange(event)}
          type="text"
          name="email"
          id="email"
          value={data["email"]}
        />
        <button onClick={() => this.props.onClick(data)}>Add User</button>
      </form>
    );
  }
}

export default NewUser;
