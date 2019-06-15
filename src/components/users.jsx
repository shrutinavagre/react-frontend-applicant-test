// Imported customer components and services
import { getUsers } from "../services/usersService";
import { paginate } from "../utils/paginate";
import Input from "./input";
import NewUser from "./userForm";

// Imported inbuild and third party libraries
import React, { Component } from "react";
import _ from "lodash";
import Joi from "joi-browser";

// Below is State Component

class Users extends Component {
  /*
  Declared state properties to use afterwards while rendering dom elements.
  */
  state = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "name", order: "asc" },
    data: {
      name: "",
      email: ""
    },
    errors: {}
  };

  /* 
  Below is mentioed schema to validate the two input fields i.e. name and email. Here joi-browser library is used which provide various mathods to validate the object.
  */
  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 })
      .label("Email")
  };

  /*
  validate() checks the data object if data properties are valid as per Joi schema.
 
  - If valid, function call returns null.
 
  - If not valid, i.e. error is returned, error details are mapped into state property 'errors' to later display it on webpage while re-rendering components.
  */

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  /* 
  Asynchronous componentDidMount() fetches the data from apiEndpoint. It handles the promise return by http call and set the users property with that received data.
  */
  async componentDidMount() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  /*
  Below handlePageChange() is used only to update the currentPage property each time user click next/previous button
  */
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  /*
  This handlechange function updates the satate property data everytime user changes values in input fileds ("name" & "email")
  */
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  /*
  Return the className property for P tag to display name.
  If user's email includes .biz returns "green" else "black".
  */
  highlightEmail = ({ email }) => {
    return email.includes(".biz") ? "green" : "black";
  };

  /*
  onSubmit() checks for the input validation using validate(). If there is no error return, it call adduser() to add the user.
  */
  onSubmit(event) {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.adduser();
  }

  /* 
  addUser() add the new user data into state property users. 
  */
  adduser = () => {
    let users = this.state.users;

    users.push(this.state.data);

    this.setState({ users });
  };

  /*
  getUserData() is used to load the data from state property. Before rendering the elements, the data is sorted and filtered according to pagination.

  Along with that, nextPageUsers are checked to disable the next page button.
  */
  getUserData = () => {
    const { users, sortColumn, currentPage, pageSize } = this.state;

    const sortedUsers = _.orderBy(users, [sortColumn.path], [sortColumn.order]);

    const paginatedUsers = paginate(sortedUsers, currentPage, pageSize);

    const nextPageUsers = paginate(sortedUsers, currentPage + 1, pageSize);

    return { paginatedUsers, nextPageUsers, users };
  };

  render() {
    /*
    Here object distructuing is done on properties in state.
    */
    const { currentPage, data, errors } = this.state;
    const { paginatedUsers, nextPageUsers, users } = this.getUserData();

    return (
      <div>
        <span>
          {paginatedUsers.map(user => (
            <span style={{ margin: 10, padding: 10 }} key={user.id}>
              <p style={{ color: this.highlightEmail(user) }}>{user.name}</p>
              <p>{user.email}</p>
              <hr />
            </span>
          ))}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() => this.handlePageChange(currentPage - 1)}
          disabled={this.state.currentPage === 1 ? "disabled" : ""}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => this.handlePageChange(currentPage + 1)}
          disabled={nextPageUsers.length === 0 ? "disabled" : ""}
        >
          Next
        </button>
        <div id="userForm">
          <form onSubmit={event => this.onSubmit(event, users)}>
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
        </div>
      </div>
    );
  }
}

export default Users;
