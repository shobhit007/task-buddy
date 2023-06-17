import { useState } from "react";

import FormComponent from "../../components/form/form.component";
import Input from "../../components/input/input.component";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";

import { useDispatch, useSelector } from "react-redux";

import { signupStart } from "../../store/user/user.actions";
import { selectCurrentUser } from "../../store/user/user.selector";

const FORM_FIELDS = {
  name: "",
  email: "",
  password: "",
};

function Signup() {
  const [formFields, setFormFields] = useState(FORM_FIELDS);

  const dispatch = useDispatch();
  const { errorMessage } = useSelector(selectCurrentUser);

  const { email, password, name } = formFields;

  // input onChange handler
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // setting form field's values
    setFormFields((preValues) => ({ ...preValues, [name]: value }));
  };

  // submit form
  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(signupStart(email, password, name));
  };

  return (
    <div className="min-h-screen">
      <FormComponent heading="Sign Up" onSubmit={handleOnSubmit}>
        <Input
          type="text"
          placeholder="Enter name"
          name="name"
          value={name}
          onChange={handleOnChange}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleOnChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleOnChange}
        />
        {errorMessage && (
          <span className="text-xs font-medium text-red-600">
            {errorMessage}
          </span>
        )}
        <Button style={{ marginTop: "1.25rem" }}>Sign Up</Button>
        <p className="text-sm font-semibold text-black mt-3">
          Already have an account?
          <Link to="/signin" className="ml-2 underline">
            Sign In
          </Link>
        </p>
      </FormComponent>
    </div>
  );
}

export default Signup;
