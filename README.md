The OAuth 2.0 Authorization Framework
- https://tools.ietf.org/html/rfc6749
- https://tools.ietf.org/html/rfc6749#page-10

Node JS Json Web Token using Passport Js for securing api example
- express js
- passport js
- passport jwt
- jsonwebtoken

*how to get start :
- go to your project root
- npm install
- npm start

Endpoint :
- localhost:3000/auth?grant_type=password
  - require body :
    - username, eg: wuriyanto
    - password, eg: 12345

- localhost:3000/auth?grant_type=refresh_token
    - require body :
      - refresh_token, eg: 27d0a468-3125-4b58-b505-969c3d18bdd1

- localhost:3000/profile
    - require authorization header (your access token):
      - access token, eg: JWT eyJhbGc.iOiJIUzI.1NiIsInR
