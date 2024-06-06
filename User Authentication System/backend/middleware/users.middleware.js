const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    if (
      !email.match(/^[\w]+(([.]{1}[\w]+)?)*@[\w]+[.]{1}[a-z]+([.]{1}[a-z]+)?$/)
    ) {
      return res.status(400).json({
        error: true,
        message: "Invalid email format",
      });
    }

    next();
  } else {
    return res.status(400).json({
      error: true,
      message: "Some fields are missing. [email, password] all are required",
    });
  }
};

const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    if (!username.match(/^[A-Za-z\s]+$/)) {
      return res.status(400).json({
        error: true,
        message: "Invalid name format",
      });
    } else if (
      !email.match(/^[\w]+(([.]{1}[\w]+)?)*@[\w]+[.]{1}[a-z]+([.]{1}[a-z]+)?$/)
    ) {
      return res.status(400).json({
        error: true,
        message: "Invalid email format",
      });
    } else if (!password.match(/^[\w\W\s]{8,15}$/)) {
      return res.status(400).json({
        error: true,
        message:
          "Invalid password format. Password must be 8-15 characters long",
      });
    }

    next();
  } else {
    return res.status(400).json({
      error: true,
      message:
        "Some fields are missing. [username, email, password] all are required",
    });
  }
};

module.exports = { validateRegister, validateLogin };
