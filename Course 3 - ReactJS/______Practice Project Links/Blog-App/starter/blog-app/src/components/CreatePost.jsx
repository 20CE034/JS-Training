import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import { Alert } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Function to generate random values
const generateRandomValues = () => {
  const id = Math.floor(Math.random() * 10000).toString();
  const numPosts = Math.floor(Math.random() * 100);
  const numComments = Math.floor(Math.random() * 100);
  const numLikes = Math.floor(Math.random() * 100);
  return { id, numPosts, numComments, numLikes };
};

export default function BasicFormControl() {
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    ...generateRandomValues(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted:", values);
    // Handle form submission logic here
  };

  return (
    <div>
      <Link to={-1}>
        <ArrowBackIcon sx={{ fontSize: "20px" }} />
      </Link>
      <Alert
        className="raleway"
        sx={{ m: 2, fontWeight: 700 }}
        severity="warning"
        variant="outlined"
        color="warning"
      >
        Looks like you dont have an Profile, Lets{" "}
        <Link to="/createprofile">
          Create Profile <OpenInNewIcon fontSize="10" />
        </Link>{" "}
        First
      </Alert>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl defaultValue="" required>
          <Label>First Name</Label>
          <StyledInput
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            placeholder="Write your first name here"
          />
          <HelperText />

          <Label>Last Name</Label>
          <StyledInput
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            placeholder="Write your last name here"
          />
          <HelperText />

          <Label>Phone</Label>
          <StyledInput
            name="phone"
            value={values.phone}
            onChange={handleChange}
            placeholder="Write your phone number here"
          />
          <HelperText />

          <button type="submit">Submit</button>
        </FormControl>
      </form>
    </div>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: 'Raleway', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  }
`
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " *" : ""}
    </p>
  );
})`
  font-family: "Raleway", sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "Raleway", sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
