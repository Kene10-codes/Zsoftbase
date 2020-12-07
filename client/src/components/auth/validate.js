const validate = (values) => {
    const errors = {};

  
  /*  VALIDATE FULLNAME */
    if (!values.fullName) {
      errors.fullName = "Name is required";
    } else if (values.fullName.length < 1) {
      errors.fullName = "Invalid Name";
    } else {
      errors.fullName = "Awesome Name ";
    }
  
  /* VALIDATE EMAIL */
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
  
  /* VALIDATE PASSWORD */
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length <= 6) {
      errors.password = "Password length is weak ";
    } else {
      errors.password = "Password strength is ok ";
    }


  /* VALIDATE COMMENT */
  if (!values.comment) {
    errors.comment = "Name is required";
  } else if (values.comment.length < 1) {
    errors.comment = "Invalid Comment";
  } else {
    errors.comment = "Great Comment";
  }

  
    return errors;
  };
  
  export default validate;