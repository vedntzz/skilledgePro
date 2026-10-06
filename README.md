# SkillEdge Pro

**1st place — Philly CodeFest 2025 (Comcast Challenge).**

Upload a resume, pick a target role, and SkillEdge Pro tells you which skills you're missing, how far off you are, and an LLM-generated learning path to close the gap — then matches you to projects that exercise those skills.

## How it works

```
React (upload, results, learning path, projects)
        │  axios
        ▼
FastAPI  /api/v1
  ├─ ResumeParser      spaCy + pyresparser → structured skills
  ├─ GapAnalyzer       extracted skills vs. role requirements → gaps + match score
  ├─ OpenAIClient      gaps + time budget → week-by-week learning path (JSON)
  └─ SQLAlchemy        users, analyses, projects (SQLite by default, any SQL via DATABASE_URL)
```

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, React Router 7, Tailwind, Chart.js, Webpack |
| API | FastAPI, Pydantic v2, JWT auth (python-jose, passlib) |
| NLP / AI | spaCy, pyresparser, OpenAI API, scikit-learn |
| Data | SQLAlchemy 2.0, SQLite (swap via `DATABASE_URL`) |
| Packaging | Docker (backend) |

## Run it

```bash
# backend
cd backend
pip install -r requirements.txt
python -m spacy download en_core_web_sm
export OPENAI_API_KEY=...
uvicorn app.main:app --reload

# frontend (repo root)
npm install
npm start
```

## What I'd change with more than a hackathon weekend

- Replace keyword/rule-based gap scoring with embedding similarity between resume skills and role requirements
- Validate the LLM learning path against a schema and retry on malformed output
- Move from SQLite to Postgres and add tests around the gap analyzer
