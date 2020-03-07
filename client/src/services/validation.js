export default function validate(state) {
  const errorState = {};
  Object.keys(state).forEach((key) => {
    const input = state[key];
    const errorObj = {
      error: true,
      message: ''
    }
    if (!input) {
      errorObj.error = true;
      errorObj.message = `Please enter ${key}`
      errorState.errorsPresent = true;
    } else {
      errorObj.error = false;
    }
    errorState[key] = errorObj;
  });
  console.log(errorState)
  return errorState;
}
