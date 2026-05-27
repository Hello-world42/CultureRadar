export const getAccountType = (user) => {
  if (user?.account_type) {
    return user.account_type;
  }
  return localStorage.getItem("demo_plan") || "free";
};

export const isProAccount = (user) => getAccountType(user) === "pro";
