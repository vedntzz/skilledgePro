from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from sqlalchemy.orm import Session
import io

from app.db.base import get_db
from app.services.resume_parser import ResumeParserService
from app.services.gap_analyzer import GapAnalyzerService
from app.ai.openai_client import OpenAIClient
from app.schemas.application import AnalysisResult, LearningPath

router = APIRouter()
resume_parser = ResumeParserService()
gap_analyzer = GapAnalyzerService()
openai_client = OpenAIClient()

@router.post("/upload/{project_id}/{role_id}", response_model=AnalysisResult)
async def analyze_resume(
    project_id: int, 
    role_id: int, 
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload and analyze a resume against a specific role.
    """
    try:
        # Read file content
        content = await file.read()
        
        # Parse resume
        parsed_data = resume_parser.parse_resume(content)
        
        # Get required skills for the role (in a real app, fetch from DB)
        required_skills = ["Python", "Django", "Flask", "SQL", "REST API", "AWS"]
        
        # Analyze gaps
        analysis = gap_analyzer.analyze_gaps(parsed_data["skills"], required_skills)
        
        return {
            "match_score": analysis["match_score"],
            "skill_gaps": analysis["skill_gaps"],
            "estimated_time": analysis["estimated_time"]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error analyzing resume: {str(e)}"
        )
        
@router.get("/learning-path/{project_id}/{role_id}", response_model=LearningPath)
def get_learning_path(
    project_id: int, 
    role_id: int, 
    db: Session = Depends(get_db)
):
    """
    Get a personalized learning path for a user.
    """
    # In a real app, fetch the most recent analysis for this user and role
    # For hackathon, use hardcoded skill gaps
    skill_gaps = [
        {"name": "Python", "current": 70, "required": 90, "gap": 20, "icon": "Code"},
        {"name": "Django", "current": 50, "required": 80, "gap": 30, "icon": "Server"},
        {"name": "SQL", "current": 60, "required": 75, "gap": 15, "icon": "Database"},
        {"name": "REST API", "current": 80, "required": 85, "gap": 5, "icon": "Code"},
        {"name": "AWS", "current": 40, "required": 70, "gap": 30, "icon": "Server"}
    ]
    
    # Generate learning path
    learning_path = openai_client.generate_learning_path(skill_gaps, "3 Months")
    
    return learning_path