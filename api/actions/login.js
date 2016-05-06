export default function login(req) {

  // TODO: HARDCODE AUTHENTICATION
  if(req.body.email != 'zen@xzj.me' || req.body.pwd != '12345') {
    return Promise.reject("Email or password is wrong.");
  }

  const user = {
    email: req.body.email
  };
  req.session.user = user;
  return Promise.resolve(user);
}
