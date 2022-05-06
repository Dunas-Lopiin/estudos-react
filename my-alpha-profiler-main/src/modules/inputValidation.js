export function usernameValidate(username) {
  const regex = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/; // 8-20 characters, no underscore, no double underscore
  if (regex.test(username)) {
    return {
      isValid: true,
      error: null,
    };
  } else {
    return {
      isValid: false,
      error: 'Username must be between 8 and 20 characters, no underscore, no double underscore',
    };
  }
}

export function passwordValidate(password, confirmPassword) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/; // 8+ characters, at least one lowercase letter, one uppercase letter, one number, special characters allowed
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: 'Passwords do not match',
    };
  } else if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      error:
        'Password must be at least 8 characters, at least one lowercase letter, one uppercase letter, one number',
    };
  } else {
    return {
      isValid: true,
      error: null,
    };
  }
}

export function emailValidate(email, confirmEmail) {
  const emailRegex = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,4})+$/; // eslint-disable-line
  if (email !== confirmEmail) {
    return {
      isValid: false,
      error: 'Emails do not match',
    };
  } else if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Email address is not valid',
    };
  } else {
    return {
      isValid: true,
      error: null,
    };
  }
}

export function birthdateValidate(birthdate) {
  const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
  if (birthdateRegex.test(birthdate)) {
    return {
      isValid: true,
      error: null,
    };
  } else {
    return {
      isValid: false,
      error: 'Birthdate is not valid',
    };
  }
}

export function photoValidate(base64Photo) {
  const photoRegex = /^data:image\/(png|jpg|jpeg);base64,/; // base64 photo
  if (photoRegex.test(base64Photo)) {
    return {
      isValid: true,
      error: null,
    };
  } else {
    return {
      isValid: false,
      error: 'Photo is not valid',
    };
  }
}

export default function registerValidate(
  username,
  password,
  confirmPassword,
  email,
  confirmEmail,
  birthdate
) {
  const usernameValidation = usernameValidate(username);
  const passwordValidation = passwordValidate(password, confirmPassword);
  const emailValidation = emailValidate(email, confirmEmail);
  const birthdateValidation = birthdateValidate(birthdate);
  return {
    isValid:
      usernameValidation.isValid &&
      birthdateValidation.isValid &&
      emailValidation.isValid &&
      passwordValidation.isValid,
    error:
      usernameValidation.error ||
      birthdateValidation.error ||
      emailValidation.error ||
      passwordValidation.error,
  };
}

export function editValidate(photo, email, confirmEmail, password, confirmPassword) {
  const photoValidation = photoValidate(photo);
  const passwordValidation = passwordValidate(password, confirmPassword);
  const emailValidation = emailValidate(email, confirmEmail);
  let error = null;
  let isValid = true;
  if (photo === '' && password === '' && email === '') {
    error = 'Please at least fill one field';
    isValid = false;
  } else {
    if (photo !== '') {
      if (!photoValidation.isValid) {
        error = photoValidation.error;
        isValid = false;
      }
    } else if (password !== '') {
      if (!passwordValidation.isValid) {
        error = passwordValidation.error;
        isValid = false;
      }
    } else if (email !== '') {
      if (!emailValidation.isValid) {
        error = emailValidation.error;
        isValid = false;
      }
    }
  }
  return {
    isValid,
    error,
  };
}
