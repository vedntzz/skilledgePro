from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.base import get_db
from app.schemas.project import Project, ProjectWithRoleCount, Role

router = APIRouter()

@router.get("/", response_model=List[ProjectWithRoleCount])
def get_projects(db: Session = Depends(get_db)):
    """
    Get all projects.
    """
    # For hackathon, return hardcoded projects
    return [
        {
            "id": 1,
            "name": "Xfinity Stream Enhancement",
            "department": "Digital Products",
            "start_date": "April 2025",
            "duration": "6 months",
            "description": "Enhance the Xfinity streaming platform with new features and improved performance.",
            "roles": 4
        },
        {
            "id": 2,
            "name": "Customer Data Platform",
            "department": "Data Intelligence",
            "start_date": "May 2025",
            "duration": "8 months",
            "description": "Build a unified customer data platform to improve personalization across services.",
            "roles": 6
        },
        {
            "id": 3,
            "name": "Network Monitoring System",
            "department": "Infrastructure",
            "start_date": "June 2025",
            "duration": "5 months",
            "description": "Develop a real-time network monitoring system with predictive maintenance capabilities.",
            "roles": 5
        }
    ]

@router.get("/{project_id}", response_model=Project)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """
    Get a specific project by ID.
    """
    # For hackathon, return hardcoded project
    return {
        "id": project_id,
        "name": "Xfinity Stream Enhancement",
        "department": "Digital Products",
        "start_date": "April 2025",
        "duration": "6 months",
        "description": "Enhance the Xfinity streaming platform with new features and improved performance.",
        "roles": [
            {
                "id": 1,
                "title": "Python Developer",
                "level": "Mid-Senior",
                "department": "Backend Engineering",
                "description": "Develop and maintain backend services and APIs using Python.",
                "skills": ["Python", "Django", "Flask", "SQL", "REST API", "AWS"],
                "project_id": project_id
            },
            {
                "id": 2,
                "title": "Frontend Engineer",
                "level": "Mid-level",
                "department": "UI Engineering",
                "description": "Build responsive and interactive user interfaces for web applications.",
                "skills": ["JavaScript", "React", "HTML", "CSS", "Redux", "Testing"],
                "project_id": project_id
            },
            {
                "id": 3,
                "title": "DevOps Engineer",
                "level": "Senior",
                "department": "Infrastructure",
                "description": "Design and implement CI/CD pipelines and cloud infrastructure.",
                "skills": ["Kubernetes", "Docker", "AWS", "CI/CD", "Terraform", "Linux"],
                "project_id": project_id
            }
        ]
    }

@router.get("/{project_id}/roles/{role_id}", response_model=Role)
def get_role(project_id: int, role_id: int, db: Session = Depends(get_db)):
    """
    Get a specific role by ID.
    """
    # For hackathon, return hardcoded role
    role_data = {
        1: {
            "id": 1,
            "title": "Python Developer",
            "level": "Mid-Senior",
            "department": "Backend Engineering",
            "description": "Develop and maintain backend services and APIs using Python.",
            "skills": ["Python", "Django", "Flask", "SQL", "REST API", "AWS"],
            "project_id": project_id
        },
        2: {
            "id": 2,
            "title": "Frontend Engineer",
            "level": "Mid-level",
            "department": "UI Engineering",
            "description": "Build responsive and interactive user interfaces for web applications.",
            "skills": ["JavaScript", "React", "HTML", "CSS", "Redux", "Testing"],
            "project_id": project_id
        },
        3: {
            "id": 3,
            "title": "DevOps Engineer",
            "level": "Senior",
            "department": "Infrastructure",
            "description": "Design and implement CI/CD pipelines and cloud infrastructure.",
            "skills": ["Kubernetes", "Docker", "AWS", "CI/CD", "Terraform", "Linux"],
            "project_id": project_id
        }
    }
    
    if role_id in role_data:
        return role_data[role_id]
    else:
        raise HTTPException(status_code=404, detail="Role not found")