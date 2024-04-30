export interface ReturnProps {
  forUserName: string | null;
  forPassword: string | null;
  isEmpty: boolean | null;
}

export function validationForm(
  userName: string | null,
  password: string | null
): ReturnProps {
  let returnObject: ReturnProps = {
    forUserName: null, //default null
    forPassword: null, //default null
    isEmpty: false, //default false
  };

  if (!userName) {
    returnObject.forUserName = "User name field cannot be empty";
    returnObject.isEmpty = true;
  }
  if (!password) {
    returnObject.forPassword = "Password field cannot be empty";
    returnObject.isEmpty = true;
  }
  return returnObject;
}
