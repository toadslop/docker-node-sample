export const protect = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ status: "fail", message: "unauthorized" });
  }

  // eslint-disable-next-line functional/no-expression-statement
  next();
};
