import { useState } from "react";
import FormComponent from "../../components/form/form.component";
import Input from "../../components/input/input.component";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";

import { signInStart } from "../../store/user/user.actions";
import { useDispatch } from "react-redux";

const FORM_FIELDS = {
  email: "",
  password: "",
};

function SingIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(FORM_FIELDS);

  const { email, password } = formFields;

  // input onChange handler
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // setting form field's values
    setFormFields((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    dispatch(signInStart(email, password));
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen">
      <FormComponent heading="Sign In" onSubmit={handleSignIn}>
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
        {/* {errorMessage && (
          <div className="pt-0.5 pb-2 w-full">
            <span className="text-xs font-medium text-red-600">
              {errorMessage}
            </span>
          </div>
        )} */}
        <Button style={{ marginTop: "1.25rem" }}>Sign In</Button>
        <p className="text-sm font-semibold text-black mt-3">
          Don't have an account?
          <Link to="/signup" className="ml-2 underline">
            Sign Up
          </Link>
        </p>
      </FormComponent>
    </div>
  );
}

export default SingIn;
