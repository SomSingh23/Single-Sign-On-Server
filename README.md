# Single Sign-On (SSO) Setup Guide

This repository contains the code for implementing Single Sign-On (SSO) using a Dockerized SSO server and multiple frontend applications.

## Setup Instructions


- **Note:** You must have Docker installed locally.




1. **Clone the repository:**
   ```bash
   git clone https://github.com/SomSingh23/SSO_CC_LAB
    ```
2. **Run the SSO server**:
   ```bash
   cd SSO_CC_LAB
   ```
   ```bash
   cd sso_server
   ```
   ```bash
   docker-compose up
   ```

 ## **Run the Frontend Applications in Development Mode**

 - Important Note: Once the SSO server is running, proceed with starting the frontend applications in development mode.

 - With the SSO server running in the background, navigate to each frontend application directory and execute the following commands:

 - Make sure your on the root directory i.e `/SSO_CC_LAB` and open **3** new terminal

 - instead of `yarn or yarn install` you can use `npm i or npm install`

 - instead of `yarn dev`  you can use `npm run dev`


```bash
# write these commands on terminal 1
cd application_1
yarn install  # Install dependencies
yarn dev      # Start the application in development mode
```
<br>

```bash
# write these commands on terminal 2
cd application_2
yarn install  # Install dependencies
yarn dev      # Start the application in development mode
```
<br>

```bash
# write these commands on terminal 3
cd application_3
yarn install  # Install dependencies
yarn dev      # Start the application in development mode
```


<br>




## <i>SSO Implementation Workflow<i>

<br> 

![image](https://github.com/SomSingh23/SSO_CC_LAB/assets/91485305/144365bd-267b-430d-abc7-54e03c1e8903)


