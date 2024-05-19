export interface ReturnProps {
  forUserName: string | null;
  forEmail: string | null;
  forPassword: string | null;
  isEmpty: boolean | null;
}

export function validationForm(
  userName: string | null | undefined,
  email: string | null | undefined,
  password: string | null
): ReturnProps {
  let returnObject: ReturnProps = {
    forUserName: null, //default null
    forEmail: null,
    forPassword: null, //default null
    isEmpty: false, //default false
  };

  if (!userName && !email) {
    returnObject.forUserName = "User name or Email field cannot be empty";
    returnObject.isEmpty = true;
  }

  if (!password) {
    returnObject.forPassword = "Password field cannot be empty";
    returnObject.isEmpty = true;
  }
  return returnObject;
}
