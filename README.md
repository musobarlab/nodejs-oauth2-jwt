### The OAuth 2.0 Authorization Framework
- https://tools.ietf.org/html/rfc6749
- https://tools.ietf.org/html/rfc6749#page-10

#### Node JS Json Web Token using Passport Js for securing api example
- express js
- jsonwebtoken
- basic-auth
- RSA, here's an awesome website, http://travistidwell.com/jsencrypt/demo/
  i use this site to generate RSA key

#### Getting started
```shell
- cd /your/root/project
- npm install
- npm start
```

#### Using Docker
* go to your root project run:

```shell
$ docker build -t node-oauth2-jwt .
```

* Check your list images :

```shell
$ docker images
```

* Run your image

```shell
$ docker run -it -p 3000:9000 --name [NEW-NAME-FOR-node-oauth2-jwt] [YOUR-DOCKER-IMAGE]
```

* OR Remove Previous Container first

```shell
$ docker rm PREVIOUS-NAME-node-oauth2-jwt
```

* RUN
  - first inspect docker's VM IP
  ```shell
  $ docker inspect --format '{{ .NetworkSettings.IPAddress }}' [YOUR CONTAINER ID]
  ```

  - then you can visit eg: http://172.17.0.2:3000/

#### Endpoint

```diff
- POST
```
- localhost:3000/register_client
  - require body :
    - username, eg: wuriyanto

```diff
- POST
```
- localhost:3000/token?grant_type=client_credentials
  - require Authorization Basic:
    - username, eg: wuriyanto
    - password, eg: xxxx-xxx-xxx-xxxx

```diff
- POST
```
- localhost:3000/token?grant_type=password
  - require Authorization Basic:
    - username, eg: valid_client_id
    - password, eg: 123456
  - require body :
    - username, eg: wuriyanto
    - password, eg: 12345

```diff
- POST
```
- localhost:3000/token?grant_type=refresh_token
  - require Authorization Basic:
    - username, eg: valid_client_id
    - password, eg: 123456
  - require body :
      - refresh_token, eg: 27d0a468-3125-4b58-b505-969c3d18bdd1

```diff
- GET
```
- localhost:3000/profile_test
    - require authorization header (your username_password access token):
      - access token, eg: 'Bearer eyJhbGc.iOiJIUzI.1NiIsInR'

```diff
- GET
```
- localhost:3000/client_test
    - require authorization header (your client access token):
      - access token, eg: 'Bearer eyJhbGc.iOiJIUzI.1NiIsInR'
