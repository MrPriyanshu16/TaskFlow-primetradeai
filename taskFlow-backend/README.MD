# TaskFlow -> Full Stack Task Management Application
A full stack task management web application built using React, flask, and Microsoft SQL server.



# Tech Stack used:
- React(Vite)
- Tailwind CSS
- Axios
- React Router

# Backend:
- Flask
- Flask-JWT-Extended
- Flask-Bcrypt
- Flask-SQLAlechemy
- Microsoft SQL Server
- PyODBC

# Features of the Application:
1. User Registration: User can register themself.
2. User Login with JWT Authentication: Each user can access the protected route using a token instead of session based authentication.

3. Protected Routes: Routes are protected through JWT token generation.
4. Create tasks.
5. View Tasks.
6. Mark Tasks as complete/pending.
7. Delete Tasks
8. Search & filter Tasks
9. User-Specific Task Isolation
10. Secure Password Hashing(bcrypt)
11. JWT-based API Protection.


# Project Structure

TaskFlow/taskflow/Frontend
                    src/
                    components/
                    api/
                    context/
                    pages/

TaskFlow/taskflow/taskFlow-backend/
                    routes/
                    models.py
                    extensions.py
                    config.py
                    app.py

# Setup:
1. Go to backend folder and start venv environment of python.

2. After that venv/Scripts/activate and install requirements by pip install -r requirements.txt.

3. Create SQL Server database and type CREATE DATABASE TaskFlowDB.

4. Run Python app.py

5. for frontend go to taskflow and npm install. 

6. run the frontend by npm run dev.

------------------------------------------------END-OF-PROJECT --------------------------------------------