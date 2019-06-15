/*
This Input.jsx component is build to provide an input field for form. This components receives props from its parent component user.jsx
*/

import React from "react";

// Below is Stateless Functional Component

/*
Rather than using props to fetch properties, parameterised  object destructuring is done to load properties direct into function.
*/

const Input = (onChange, name, placeholder, value, error) => {
  return (
    <React.Fragment>
      <input
        onChange={event => onChange(event)}
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
