import os
import tempfile
from typing import Dict, List, Any
import spacy

# Mock implementation for the hackathon
class ResumeParserService:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        
    def parse_resume(self, file_content: bytes) -> Dict[str, Any]:
        """Parse resume and extract information"""
        # For hackathon, return mock data
        # In a real implementation, you would use pyresparser and skillnlu here
        return {
            "name": "John Developer",
            "email": "john.developer@example.com",
            "skills": [
                {"name": "Python", "level": 70},
                {"name": "Django", "level": 50},
                {"name": "SQL", "level": 60},
                {"name": "REST API", "level": 80},
                {"name": "AWS", "level": 40}
            ],
            "experience": ["Software Developer at XYZ Corp", "Junior Developer at ABC Inc"]
        }