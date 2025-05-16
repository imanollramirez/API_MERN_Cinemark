const logoutController = {};

logoutController.logout = async (req, res) => {
  res.clearCookie("authToken");
  return res.json({ message: "Log out succesfull!" });
};

export default logoutController;
