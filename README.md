# School Manager FUPRE
***
## Overview
`Description`
This is the repository of the Federal **Univeristy of Petroleum Resources, Effurun**
### Important Notice
To contirbute to this project:
+ Clone the repository to your local.
+ If you are working on it for the first ime, check out to a new branch from develop.
+ Make your contributions
+ Create a Pull Request to develop from your own branch on which those changes were made.
    - Always compare your own branch to develop
    - Do this for the second time when you make a pull request.
    - Wait till all checks are complete.
    - If checks are not complete, check to see if there are any unused imports in all components.
      For example:
``` js
{import Component from "../../react-componenet"}
```


___



### Table of content
- How to run the project
- Libraries and dependencies
- Project structure

---
#### How to run the project
This project uses `yarn`, so be sure to install yarn on your laptop before cloning the project. You can install yarn using npm as shown below:

```
npm install --global yarn
```
If `yarn` already exists, check your latest version and update to the lastest. To check your version, type this on your terminal

```
yarn --version
```
in sumary

    $npm install --global yarn 
    $yarn --version
    $yarn start

For more information, check out [how to install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

___

#### Libraries and dependencies
Several libraries are being used to ease the developement of this software, which are categorized below

##### Animations, charts and effects
+ [Framer motion](https://www.npmjs.com/package/framer-motion)  [![Framer motion](https://img.shields.io/github/forks/framer/motion)](https://github.com/framer/motion)
+ [Charts Js]()  [![Charts Js](https://img.shields.io/github/stars/chartjs/Chart.js?label=Charts%20Js%20stars)](https://github.com/chartjs/Chart.js)
+ React modal

#### Project management tools
+ Atlaskit (JIRA)

#### Error tracking management
+ Sentry  [![Sentry](https://img.shields.io/github/forks/getsentry/sentry?color=green&label=Sentry&logo=Github)](https://github.com/getsentry/sentry)

#### API calls
+ Axios [![Axios](https://img.shields.io/github/stars/axios/axios?color=red&label=Axios&logo=github)](https://github.com/axios/axios)
+ React Query

#### CSS Frameworks
+ Bootstrap [![Bootstrap](https://img.shields.io/github/forks/twbs/bootstrap?color=blue&label=Bootstrap&logo=github)](https://github.com/twbs/bootstrap)
+

#### Security
+ Dumpurify [![Dumpurify](https://img.shields.io/github/forks/cure53/DOMPurify?color=yellow&label=Dumpurify&logo=github)](https://github.com/cure53/DOMPurify)

#### State mangement
+ Redux [![Redux](https://img.shields.io/github/forks/reduxjs/redux?color=purple&label=Redux%20forks&logo=github)](https://github.com/reduxjs/redux)

#### Middlewares
+ Redux logger
+ Redux Thunk
+ Redux persist

#### Input Validators
+ Yup
+ React-otp-input
#### Cookies
+ React Cookies

___

### PROJECT STRUCTURE
| File name | Description |
| ------ | ----------- |
| src  | Folder that holds all the source code that the project runs on
| api | Contains all files relating to API calls. All POST and GET requests are here. Including request processors
| asset | Holds all graphic contents, and fonts.
| custom hooks |This folder has two custom hook file for checking if user is conneteced to the internet, and for cookies.
| pages | This folder contains subfolders that hold the pages. It is sub divided into lecturer, shared, student, and super admin. The Lecture folder contains pages only available to lecturers. The shared folder contains pages availble to both students and lectueres. Usually when the user is not signed in.The stuent folder contains pages available to students only. The superAdmin folder contains pages availble to superAdmin.
| routerBuilder | The router builder folder contains route details that are mapped through, to have a more effective means of creating the routes. It contains student routes, lecturer routes, shared routes. All exported from the route builder. Note: All routes are lazy load for better load time and good performance.
| routers | This all contains mapped routes of sub pages. All these components are exported and used in the routeBuidler.
| store | This is ware the redux tools are kept. The store contains the root reducer which is an object that holds other reducers.
| ui_elements | The ui elements contains all the graphical contens used for the application. It contains loaders, buttons, breadcrumbs, etc. All compoenents such as navbar useful to the application are stored here.
| Utils | The utils folder contains all the utility functions being used in the application. These functions are logics, that are exported and imported into the application to for use.

### FINAL NOTICE
For any further information or unbording, kindly reach out to your supervisor.