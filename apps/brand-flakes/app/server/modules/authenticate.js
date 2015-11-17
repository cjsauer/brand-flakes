/*
 * Authenticates a client app for use of the API
 *
 * TODO: Right now this method basically does nothing.
 *        More research is needed on how to actually authenticate
 *        an app securely.
 * @param {String} appId the client's application ID
 * @param {String} appSecret the client's secret application key
 * @return {Boolean} true iff authentication succeeded.
 */
let authenticate = (appId, appSecret) => {
  // Just authenticate everyone for now
  return true;
}

Modules.server.authenticate = authenticate;
