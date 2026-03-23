Mini Compliance Tracker
Overview

Mini Compliance Tracker is a simple web application for managing compliance tasks for multiple clients. Users can:

View clients
View tasks for a selected client
Add new tasks
Update task status (Pending → Completed)
Identify overdue tasks
Filter tasks by status and category

The goal of this project is to demonstrate a working end-to-end full-stack application.

Live Demo
Frontend (Deployed): https://mini-compliance-frontend-1.onrender.com


Backend (Deployed): https://mini-compliance-backend.onrender.com




Tech Stack
Frontend: React, CSS
Backend: Node.js, Express
Database: PostgreSQL
Deployment: Render




Frontend
Navigate to frontend folder:
cd client
Install dependencies:
npm install
npm run dev

Features

Clients: View a list of clients and select one to see tasks , and add clients ,
Tasks: View all tasks for the selected client,
Add Task: Add a new compliance task,
Update Task: Mark tasks as Completed,
Filters: Filter tasks by Status and Category,
Overdue Tasks: Pending tasks with past due dates are highlighted,
Bonus Features: Search, sorting, summary stats (total, pending, overdue)


Tradeoffs:-
No authentication implemented due to time constraints ,
UI kept simple for clarity and usability ,
Tasks are seeded manually for demo purposes ,

Assumptions:-
Each client can have multiple tasks ,
Task status limited to Pending and Completed ,
Task priority limited to Low, Medium, High ,


GitHub Repository


frontend- https://github.com/kante-Ramanaidu/mini-compliance-frontend/tree/main


backend- https://github.com/kante-Ramanaidu/mini-compliance-backend/tree/main
