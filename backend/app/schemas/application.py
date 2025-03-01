from pydantic import BaseModel
from typing import List, Dict, Optional, Any

class SkillGap(BaseModel):
    name: str
    current: float
    required: float
    gap: float
    icon: str

class LearningModule(BaseModel):
    name: str
    type: str
    platform: str
    duration: str
    description: str
    priority: str

class ResumeUpload(BaseModel):
    file_content: bytes

class AnalysisResult(BaseModel):
    match_score: float
    skill_gaps: List[SkillGap]
    estimated_time: str

class LearningPath(BaseModel):
    modules: List[LearningModule]
    timeline: str
    estimated_score_after: int

class ApplicationBase(BaseModel):
    user_id: int
    role_id: int

class ApplicationCreate(ApplicationBase):
    pass

class Application(ApplicationBase):
    id: int
    match_score: float
    skill_gaps: List[Dict[str, Any]]
    learning_path: Dict[str, Any]
    estimated_time: str
    created_at: str

    class Config:
        orm_mode = True