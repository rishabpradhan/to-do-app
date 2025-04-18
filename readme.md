# Task Manager App

A MERN stack to-do-list with Mysql where users can register, log in, and manage their personal tasks securely. Built using the MERN stack with MySQL as the database.

## Features of this

- User Authentication (Register/Login) using JWT
- Add, View, and Delete personal tasks
- Dashboard showing only the logged-in user's tasks
- Secure HTTP-only cookies for session management
- Built with React (Vite), Node.js, Express, MySQL

### Technologies Used

- Frontend: React.js, Vite, Axios

- Backend: Node.js, Express, MySQL

- Authentication: JSON Web Tokens (JWT)

- Database: MySQL (via XAMPP locally)

## 📥 Clone This Repository

To clone this repository to your local machine, run:
git clone https://github.com/rishabpradhan/to-do-app.git

### How the App Works

- Homepage displays a welcome message and navigates to Register or Login.

- Register/Login page allows users to create or access their account.

- Once logged in, the user is redirected to the Dashboard, where:

- Their name is displayed.

- They can add tasks (title and description).

- View their own list of tasks.

- Delete tasks with a single click.

- All routes are protected; only logged-in users can access the dashboard or tasks.

- User token is stored for 1 day and cookie will automatically expire and the user will need to authenticate again.
