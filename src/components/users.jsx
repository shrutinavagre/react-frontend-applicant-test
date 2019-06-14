import { getUsers } from "../services/usersService";
import { paginate } from "../utils/paginate";
// import Pagination from "./pagination";

import React, { Component } from "react";
import _ from "lodash";
import Joi from "joi-browser";
// import NewUser from "./userForm";

class Users extends Component {
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

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 })
      .label("Email")
  };

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

  async componentDidMount() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  highlightEmail = ({ email }) => {
    return email.includes(".biz") ? "green" : "black";
  };

  onSubmit(event, allUsers) {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.adduser();
  }

  adduser = () => {
    let users = this.state.users;

    users.push(this.state.data);

    this.setState({ users });
  };

  getUserData = () => {
    const { users, sortColumn, currentPage, pageSize } = this.state;

    const sortedUsers = _.orderBy(users, [sortColumn.path], [sortColumn.order]);

    const paginatedUsers = paginate(sortedUsers, currentPage, pageSize);

    const nextPageUsers = paginate(sortedUsers, currentPage + 1, pageSize);

    return { paginatedUsers, nextPageUsers, users };
  };

  render() {
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
