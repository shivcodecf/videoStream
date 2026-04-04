export const setCookies = (token, res) => {
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // 🔥 ALWAYS true in deployed env
    sameSite: "none", // 🔥 REQUIRED for cross-origin
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};