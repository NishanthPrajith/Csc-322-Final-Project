# CCNY ZERO (CS 322 software engineering)
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet massa ante. Phasellus ornare massa efficitur tincidunt aliquet. Fusce congue tristique velit, pharetra lobortis ligula finibus id. Donec eleifend nulla vitae ultrices ultrices. Nulla rhoncus convallis mattis. Nullam ut ultrices orci. Nulla id lacinia sapien, et tincidunt urna. Etiam lacinia eros nec placerat finibus. 

## Live Website Link
[CCNY Zero Live](https://link-url-here.org)

## Website Demo (Video)
*Needs fixing*
[![Watch the video](https://i.imgur.com/vKb2F1B.png)](https://youtu.be/vt5fpE0bzSY)

## Group Members Team E
- Haroon Syed
- Christopher Lall
- Andrew Persaud
- Tufayel Ahmed
- Josue Flores

## Running Locally
First clone the github repo and go into the project directory. Then,
```bash
npm install
npm start dev # run the react.js project in development mode
```
Open http://localhost:3000 to view it in the browser.

*If package error appears run these before running* `npm start`.
```bash
npm install react-icons
npm install react-select --save
npm install @material-ui/core
npm install react scripts --save
```

## Technologies Used
 - Firebase Authentication
 - Firebase Hosting
 - Firebase Firestore Database
 - React.js

## Repository Structure
- `src`
  - `signIn/` : A page that lets a user log into the website
  - `signUp/` : A page which allows people to sign up as a student or an instructor
  - `aboutUs/` : About us page js code
  - `forgotPassword/` : Allows the user to change the password if needed
  - `instructorView/` : The page for an instructor when logging in
  - `error/` : 404 error page .js code
  - `studentView/` : The page the student sees after logging in
  - `registrars/` : The registrar/super user page when logging in
  - `home/` : The main page for the logged in user 
  - `navbar/` : The code for the navigation bar and its may states
  - `reSubmitPass/` : The code that verifies the correct password when a user signs up
  - `components/` : 
  - `contexts/` : Has all the authorization & authentication implementation for creating an account, logging in and signing out.


## Default Users
 1. test
 
## Project Documentation
1. [Phase 1 Report : Software Requirements & Description](https://github.com/NishanthPrajith/Csc-322-Final-Project/blob/a050d190daded7f6b248075960b23d0b98ee545a/Phase1report.docx.pdf)
2. [Phase 2 Report : Design report](https://github.com/NishanthPrajith/Csc-322-Final-Project/blob/cc86ebd76973b3b0b5832b8b7972f3d7d5ea4c88/CSC32200_GES_Phase2.pdf)
