import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;

    // return (Object.keys(errors).length = 0 ? null : errors);
  };
  validateProperty = ({ name, value }) => {
    // console.log("validateproperty");
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        name={name}
        error={errors[name]}
      ></Input>
    );
  }
  renderSelect(name, label, options) {
    // console.log(items);
    const { data, errors } = this.state;
    return (
      <Select
        label={label}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
        name={name}
        error={errors[name]}
      ></Select>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
}

export default Form;
