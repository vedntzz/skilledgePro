import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Calendar, ArrowRight } from 'lucide-react';
import { projectService } from '../services/api';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  if (loading) {
    return <div className="text-center py-10">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 mb-8">
        <h3 className="text-2xl leading-6 font-bold text-gray-900">Available Internal Projects</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Browse and apply to open projects across departments. Match your skills to available roles.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-600 rounded-md p-3">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.department}</p>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>{project.description}</p>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{project.start_date} • {project.duration}</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <span>{project.roles} open roles</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;