The OAuth 2.0 Authorization Framework
- https://tools.ietf.org/html/rfc6749
- https://tools.ietf.org/html/rfc6749#page-10

Node JS Json Web Token using Passport Js for securing api example
- express js
- passport js (not used)
- passport jwt (not used)
- jsonwebtoken
- basic-auth

*how to get start :
- go to your project root
- npm install
- npm start

Endpoint :

POST
- localhost:3000/register_client
  - require body :
    - username, eg: wuriyanto

POST
- localhost:3000/token?grant_type=client_credentials
  - require Authorization Basic:
    - username, eg: wuriyanto
    - password, eg: xxxx-xxx-xxx-xxxx

POST
- localhost:3000/token?grant_type=password
  - require body :
    - username, eg: wuriyanto
    - password, eg: 12345

POST
- localhost:3000/token?grant_type=refresh_token
    - require body :
      - refresh_token, eg: 27d0a468-3125-4b58-b505-969c3d18bdd1

GET
- localhost:3000/profile_test
    - require authorization header (your username_password access token):
      - access token, eg: JWT eyJhbGc.iOiJIUzI.1NiIsInR

GET
- localhost:3000/client_test
    - require authorization header (your client access token):
      - access token, eg: JWT eyJhbGc.iOiJIUzI.1NiIsInR
