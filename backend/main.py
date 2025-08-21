# FastAPI main app code goes here
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from db import get_db, Program
from typing import List

app = FastAPI()

@app.get("/programs", response_model=List[dict])
def list_programs(db: Session = Depends(get_db)):
    programs = db.query(Program).all()
    return [{"id": p.id, "name": p.name, "university": p.university, "location": p.location, "deadline": str(p.deadline), "keywords": p.keywords, "funding": p.funding} for p in programs]


@app.post("/match")
def match_programs(profile: dict, db: Session = Depends(get_db)):
    # Match logic goes here
    user_interests = profile.get("interests", "").lower().split(",")
    user_gpa = profile.get("gpa", 0)
    funding_needed = profile.get("funding_needed", False)

    programs = db.query(Program).all()
    scored = []

    for p in programs:
        score = 0
        for interest in user_interests:
            if interest.strip() and interest.strip() in p.keywords.lower():
                score += 2
        if user_gpa >= 3.5:
            score += 1
        if funding_needed and "fellowship" in (p.funding or "").lower():
            score += 1
        scored.append({"id": p.id, "name": p.name, "university": p.university, "location": p.location, "deadline": str(p.deadline), "keywords": p.keywords, "funding": p.funding, "score": score})

    ranked = sorted(scored, key=lambda x: x["score"], reverse=True)
    return ranked
