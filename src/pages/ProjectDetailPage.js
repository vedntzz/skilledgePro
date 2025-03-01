import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Hardcoded project details
    setProject({
      id: parseInt(projectId),
      name: "Xfinity Stream Enhancement",
      department: "Digital Products",
      startDate: "April 2025",
      duration: "6 months",
      description: "Enhance the Xfinity streaming platform with new features and improved performance.",
    });

    // Hardcoded roles for this project
    setRoles([
      {
        id: 1,
        title: "Python Developer",
        level: "Mid-Senior",
        department: "Backend Engineering",
        description: "Develop and maintain backend services and APIs using Python.",
        skills: ["Python", "Django", "Flask", "SQL", "REST API", "AWS"]
      },
      {
        id: 2,
        title: "Frontend Engineer",
        level: "Mid-level",
        department: "UI Engineering",
        description: "Build responsive and interactive user interfaces for web applications.",
        skills: ["JavaScript", "React", "HTML", "CSS", "Redux", "Testing"]
      },
      {
        id: 3,
        title: "DevOps Engineer",
        level: "Senior",
        department: "Infrastructure",
        description: "Design and implement CI/CD pipelines and cloud infrastructure.",
        skills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Terraform", "Linux"]
      }
    ]);
  }, [projectId]);

  const handleRoleApply = (roleId) => {
    navigate(`/upload/${projectId}/${roleId}`);
  };

  if (!project) return <div className="text-center p-8">Loading project details...</div>;

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl leading-6 font-bold text-gray-900">{project.name}</h3>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {project.department}
          </span>
        </div>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          {project.description}
        </p>
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
          <span>
            Starting: <span className="font-medium">{project.startDate}</span> • Duration: <span className="font-medium">{project.duration}</span>
          </span>
        </div>
      </div>
      
      <h4 className="text-lg font-medium text-gray-900 mb-4">Available Roles</h4>
      
      <div className="space-y-6">
        {roles.map((role) => (
          <div 
            key={role.id} 
            className="bg-white shadow overflow-hidden sm:rounded-md hover:shadow-md transition-shadow"
          >
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{role.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{role.department} • {role.level}</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleRoleApply(role.id)}
                >
                  Apply
                </button>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">{role.description}</p>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500">Required Skills</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailPage;