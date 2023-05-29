import { useContext, useState } from "react";
import FormComponent from "../../components/form/form.component";
import Input from "../../components/input/input.component";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";

import { UserContext } from "../../context/user.context";

const FORM_FIELDS = {
  email: "",
  password: "",
};

function SingIn() {
  const [formFields, setFormFields] = useState(FORM_FIELDS);
  const { signInUser } = useContext(UserContext);

  const { email, password } = formFields;

  // input onChange handler
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // setting form field's values
    setFormFields((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log("Fields are required.");
      return;
    }

    await signInUser(email, password);
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
