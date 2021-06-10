<img alt="spring boot logo" align="left" src="https://cdn.freelogovectors.net/wp-content/uploads/2018/12/react_logo.png" width="75">

# Employee Management System  

## Introduction
<img alt="spring boot logo" align="left" src="https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/589/original/codecool-logo-symbol.png" width="20">

This is a **Codecool** team project created during the last module of the school. Its aim was to practise REST APIs: fetch data from the backend API using React. The contributors are [Máté Groholy](https://www.linkedin.com/in/mgroholy/) and [Kriszti Tóth](https://www.linkedin.com/in/kriszti-toth/).

The application provides a secure way to store and manage employee details as well as related positions and departments. Users can take advantage of different features depending on their clearance level.

The **backend** part of the project can be found [here](https://github.com/mgroholy/employee-manager-backend). The app has been deployed with the help of Heroku and Netlify:   
[employee-ms.netlify.app](https://employee-ms.netlify.app/)

## Technologies
✓ React   
✓ Axios    
✓ Material UI  

## Features
AUTHENTICATION
- Registration for employees only
- Login / logout

---
AUTHORIZATION

3 clearance levels: USER - SUPERVISOR - ADMIN

Users only have access to view the page content.

- Employee: can be modified by supervisors but can only be added / deleted by admins   
- Department: can only be added / deleted by admins  
- Position: can be added / deleted by supervisors and admins

---
EMPLOYEES
+ List all employees
+ Filter by department, status, name, email and ID
+ Add employee details with input validation
+ Update employee details with input validation
+ Deactivate terminated employee
+ Delete after confirmation
---

DEPARTMENTS / POSITIONS
+ List
+ Add
+ Delete

## Demo users
USER  
email: ```john@doe.com```  
password: john   

SUPERVISOR  
email: ```jack@smith.com```  
password: jack    

ADMIN  
email: ```matt@davis.com```  
password: matt    
