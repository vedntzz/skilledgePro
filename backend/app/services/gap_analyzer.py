from typing import Dict, List, Any

class GapAnalyzerService:
    def analyze_gaps(self, extracted_skills: List[Dict[str, Any]], required_skills: List[str]) -> Dict[str, Any]:
        """
        Analyze the gap between extracted skills and required skills
        """
        # Create a mapping of skill name to level
        skill_levels = {skill["name"]: skill["level"] for skill in extracted_skills}
        
        # For hackathon, use hardcoded skill requirements
        required_levels = {
            "Python": 90,
            "Django": 80,
            "Flask": 70,
            "SQL": 75,
            "REST API": 85,
            "AWS": 70
        }
        
        # Calculate gaps
        skill_gaps = []
        for skill, required in required_levels.items():
            if skill in skill_levels:
                current = skill_levels[skill]
                gap = max(0, required - current)
            else:
                current = 0
                gap = required
                
            icon = self._get_skill_icon(skill)
            
            skill_gaps.append({
                "name": skill,
                "current": current,
                "required": required,
                "gap": gap,
                "icon": icon
            })
            
        # Calculate match score (weighted average)
        total_weight = sum(required_levels.values())
        weighted_sum = sum((100 - min(100, skill_gaps[i]["gap"])) * required_levels[skill_gaps[i]["name"]] 
                          for i in range(len(skill_gaps)))
        match_score = round(weighted_sum / total_weight)
        
        # Determine estimated time based on match score
        if match_score >= 85:
            estimated_time = "1 Week"
        elif match_score >= 70:
            estimated_time = "1 Month"
        else:
            estimated_time = "3 Months"
            
        return {
            "match_score": match_score,
            "skill_gaps": skill_gaps,
            "estimated_time": estimated_time
        }
    
    def _get_skill_icon(self, skill: str) -> str:
        """Map skills to appropriate icons"""
        programming_languages = ["Python", "JavaScript", "Java", "C++"]
        databases = ["SQL", "MongoDB", "PostgreSQL", "MySQL"]
        cloud = ["AWS", "Azure", "GCP", "Kubernetes", "Docker"]
        
        if skill in programming_languages:
            return "Code"
        elif skill in databases:
            return "Database"
        elif skill in cloud:
            return "Server"
        else:
            return "Code"  # Default