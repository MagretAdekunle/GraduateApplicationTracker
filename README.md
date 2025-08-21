# Graduate Application Tracker

## Overview

The **Graduate Application Tracker** is a full-stack application that simplifies and centralizes the graduate school application process. It helps students:

- Track application deadlines
- Match programs to their interests and profile
- Get feedback on Statements of Purpose (SOP)
- Monitor program funding and location details

The backend is built with **FastAPI** and **PostgreSQL**, and the frontend uses **Next.js** with React.

---

## Features

- **Program Matching:** Submit your profile and get ranked graduate program suggestions.  
- **Deadline Tracker:** Keep track of program deadlines in one place.  
- **SOP Helper:** Draft SOPs and get AI-assisted feedback.  
- **Dashboard:** Centralized interface to navigate all tools.  

---

## Tech Stack

- **Backend:** FastAPI, Uvicorn, SQLAlchemy, PostgreSQL  
- **Frontend:** Next.js, React, Axios  
- **Database:** PostgreSQL  
- **AI / NLP:** (Optional for SOP feedback)  

---

## Setup Instructions

### 1. Backend

```bash
cd backend
python3 -m venv venv              # create virtual environment
source venv/bin/activate          # activate venv
pip install -r requirements.txt.  # install dependencies
python seed.py                    # seed database
uvicorn main:app --reload         # start backend
```
API runs at http://127.0.0.1:8000
Endpoints:
GET /programs → list all programs
POST /match → match programs to your profile

### 2. Frontend

```bash
cd frontend
npm install                         # install dependencies
npm run dev                         # start frontend
```
Frontend runs at http://localhost:3000


### 3. Optional: Run Both Together

```bash
npm install --save-dev concurrently
npm run start:all
```
See logs from both servers in the same terminal

---

## Project Structure

grad-app/
 ├─ backend/
 │   ├─ main.py
 │   ├─ db.py
 │   ├─ seed.py
 │   └─ .venv/
 └─ frontend/
     ├─ pages/
     │   ├─ _app.js
     │   ├─ dashboard.js
     │   ├─ match.js
     │   ├─ deadlines.js
     │   └─ sop.js
     └─ components/
         └─ Navbar.js

---

## .gitignore Highlights

-  backend/venv/ → virtual environment
-  backend/__pycache__/ → Python cache
-  frontend/node_modules/ and .next/ → frontend build outputs

---

## Future Improvements
Integrate AI-based SOP feedback
Add email/calendar reminders for deadlines
User authentication and profile management
Mobile-friendly U