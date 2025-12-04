// Later: sync with Firebase user, create profile, etc.

exports.getMe = (req, res) => {
  return res.status(200).json({ message: "Auth /me placeholder" });
};
