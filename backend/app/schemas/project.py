from pydantic import BaseModel
from typing import List, Optional

class RoleBase(BaseModel):
    title: str
    level: str
    department: str
    description: str
    skills: List[str]

class RoleCreate(RoleBase):
    project_id: int

class Role(RoleBase):
    id: int
    project_id: int

    class Config:
        orm_mode = True

class ProjectBase(BaseModel):
    name: str
    department: str
    start_date: str
    duration: str
    description: str

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    roles: List[Role] = []

    class Config:
        orm_mode = True

class ProjectWithRoleCount(ProjectBase):
    id: int
    roles: int

    class Config:
        orm_mode = True