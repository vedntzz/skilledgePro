from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import JSON

from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    employee_id = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    name = Column(String)
    is_active = Column(Boolean, default=True)

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    department = Column(String)
    start_date = Column(String)
    duration = Column(String)
    description = Column(Text)
    
    roles = relationship("Role", back_populates="project")

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    level = Column(String)
    department = Column(String)
    description = Column(Text)
    skills = Column(JSON)
    
    project_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="roles")
    
    applications = relationship("Application", back_populates="role")

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    match_score = Column(Float)
    skill_gaps = Column(JSON)
    learning_path = Column(JSON)
    estimated_time = Column(String)
    created_at = Column(String)
    
    user_id = Column(Integer, ForeignKey("users.id"))
    role_id = Column(Integer, ForeignKey("roles.id"))
    
    user = relationship("User")
    role = relationship("Role", back_populates="applications")