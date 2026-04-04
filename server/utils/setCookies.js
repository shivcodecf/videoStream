export const setCookies = (token, res) => {
 const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax", 
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};


