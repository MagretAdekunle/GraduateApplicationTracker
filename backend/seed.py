# Seed script for programs goes here
from datetime import date
from db import Base, engine, SessionLocal, Program

Base.metadata.create_all(bind=engine)

def seed_programs():
    # Seed data for programs goes here
    db = SessionLocal()

    programs = [
        Program(name="MS Computer Science", university="UT Austin", location="Austin, TX", deadline=date(2025,12,15), keywords="AI, Systems, Theory", funding="RA/TA, Fellowships"),
        Program(name="PhD Public Health", university="Harvard University", location="Cambridge, MA", deadline=date(2025,12,1), keywords="Epidemiology, Cancer, Health Policy", funding="Full funding"),
        Program(name="MS Data Science", university="Stanford University", location="Stanford, CA", deadline=date(2025,11,30), keywords="Machine Learning, Big Data, Statistics", funding="Limited scholarships"),
        Program(name="MBA", university="University of Chicago Booth", location="Chicago, IL", deadline=date(2025,10,5), keywords="Business, Finance, Strategy", funding="Loans, Fellowships"),
    ]

    for program in programs:
        exists = db.query(Program).filter_by(name=program.name, university=program.university).first()
        if not exists:
            db.add(program)

    db.commit() 
    db.close()

if __name__ == "__main__":
    seed_programs()
    print("Database seeded with graduate programs successfully!")
