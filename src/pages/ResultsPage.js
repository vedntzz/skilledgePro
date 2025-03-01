import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code, Database, Server } from 'lucide-react';

const ResultsPage = () => {
  const { projectId, roleId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [role, setRole] = useState(null);
  const [matchScore] = useState(65);
  const [skillGaps, setSkillGaps] = useState([]);

  useEffect(() => {
    // Hardcoded project and role data
    setProject({
      id: parseInt(projectId),
      name: "Xfinity Stream Enhancement",
    });

    setRole({
      id: parseInt(roleId),
      title: "Python Developer",
    });

    setSkillGaps([
      { name: "Python", current: 70, required: 90, gap: 20, icon: "Code" },
      { name: "Django", current: 50, required: 80, gap: 30, icon: "Server" },
      { name: "SQL", current: 60, required: 75, gap: 15, icon: "Database" },
      { name: "REST API", current: 80, required: 85, gap: 5, icon: "Code" },
      { name: "AWS", current: 40, required: 70, gap: 30, icon: "Server" }
    ]);
  }, [projectId, roleId]);

  const handleViewLearningPath = () => {
    navigate(`/learning-path/${projectId}/${roleId}`);
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code className="h-5 w-5 text-gray-400" />;
      case 'Database': return <Database className="h-5 w-5 text-gray-400" />;
      case 'Server': return <Server className="h-5 w-5 text-gray-400" />;
      default: return <Code className="h-5 w-5 text-gray-400" />;
    }
  };

  if (!project || !role) {
    return <div className="text-center p-8">Loading results...</div>;
  }

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl leading-6 font-bold text-gray-900">Skill Analysis Results</h3>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-500">{role.title}</span>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {project.name}
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden rounded-md mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 36 36" className="h-full w-full">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray={`${matchScore}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{matchScore}%</span>
                  <span className="text-sm text-gray-500">Match Score</span>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">Overall skill match for {role.title}</p>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Summary of Findings</h4>
              <p className="text-sm text-gray-600 mb-4">
                Your profile shows good foundational skills for this role, but there are some significant gaps 
                that would need to be addressed. With targeted learning, you could become a strong candidate 
                for this position.
              </p>
              
              <div className="flex items-center justify-between mt-6">
                <span className="text-sm font-medium text-gray-500">Estimated Time to Close Gaps:</span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  3 Months
                </span>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleViewLearningPath}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  View Personalized Learning Path
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h4 className="text-lg font-medium text-gray-900 mb-4">Skill Gap Details</h4>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {skillGaps.map((skill) => (
            <li key={skill.name} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-5 w-5 mr-2">
                    {getIconComponent(skill.icon)}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    skill.gap > 25 ? 'bg-red-100 text-red-800' : 
                    skill.gap > 10 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {skill.gap}% Gap
                  </span>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Your Level: {skill.current}%</span>
                  <span>Required: {skill.required}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${skill.current}%` }}
                  ></div>
                  <div 
                    className="relative h-0 -mt-2.5"
                  >
                    <div 
                      className="absolute h-4 w-1 bg-red-500" 
                      style={{ left: `${skill.required}%`, marginLeft: '-1px' }}
                    ></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultsPage;