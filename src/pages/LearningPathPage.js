import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Award, Code, Calendar } from 'lucide-react';

const LearningPathPage = () => {
  const { projectId, roleId } = useParams();
  const [project, setProject] = useState(null);
  const [role, setRole] = useState(null);
  const [learningModules, setLearningModules] = useState([]);

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

    setLearningModules([
      {
        id: 1,
        name: "Python Advanced Techniques",
        type: "course",
        platform: "Coursera",
        duration: "4 weeks",
        description: "Master advanced Python concepts including decorators, generators, and context managers.",
        priority: "High"
      },
      {
        id: 2,
        name: "Django Web Framework",
        type: "course",
        platform: "Udemy",
        duration: "6 weeks",
        description: "Comprehensive guide to building web applications with Django.",
        priority: "High"
      },
      {
        id: 3,
        name: "AWS Certified Developer",
        type: "certification",
        platform: "AWS",
        duration: "8 weeks",
        description: "Learn to develop, deploy, and debug cloud-based applications using AWS.",
        priority: "Medium"
      },
      {
        id: 4,
        name: "SQL Optimization Techniques",
        type: "course",
        platform: "LinkedIn Learning",
        duration: "3 weeks",
        description: "Learn to write efficient SQL queries and optimize database performance.",
        priority: "Medium"
      },
      {
        id: 5,
        name: "Build a RESTful API with Django",
        type: "project",
        platform: "Internal",
        duration: "2 weeks",
        description: "Practical project to implement a RESTful API using Django Rest Framework.",
        priority: "High"
      }
    ]);
  }, [projectId, roleId]);

  if (!project || !role) {
    return <div className="text-center p-8">Loading learning path...</div>;
  }

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl leading-6 font-bold text-gray-900">3-Month Learning Path</h3>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-500">{role.title}</span>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {project.name}
            </span>
          </div>
        </div>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Follow this personalized learning path to close your skill gaps and become a strong candidate for the role.
        </p>
      </div>
      
      <div className="bg-white shadow overflow-hidden rounded-md mb-8">
        <div className="px-4 py-5 sm:p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Timeline Overview</h4>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-between">
              <div>
                <span className="bg-white px-3 py-1 text-sm font-medium text-gray-900 rounded-md border border-gray-300">
                  Month 1
                </span>
              </div>
              <div>
                <span className="bg-white px-3 py-1 text-sm font-medium text-gray-900 rounded-md border border-gray-300">
                  Month 2
                </span>
              </div>
              <div>
                <span className="bg-white px-3 py-1 text-sm font-medium text-gray-900 rounded-md border border-gray-300">
                  Month 3
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-md bg-green-100 text-green-800">
              <span className="text-sm font-medium">Estimated Skill Match After Completion: 90%</span>
            </div>
          </div>
        </div>
      </div>
      
      <h4 className="text-lg font-medium text-gray-900 mb-4">Recommended Learning Modules</h4>
      
      <div className="space-y-6">
        {learningModules.map((module) => (
          <div key={module.id} className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {module.type === 'course' && <BookOpen className="h-5 w-5 mr-2 text-blue-500" />}
                  {module.type === 'certification' && <Award className="h-5 w-5 mr-2 text-purple-500" />}
                  {module.type === 'project' && <Code className="h-5 w-5 mr-2 text-green-500" />}
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{module.name}</h3>
                </div>
                <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                  module.priority === 'High' ? 'bg-red-100 text-red-800' :
                  module.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {module.priority} Priority
                </span>
              </div>
              
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {module.type === 'course' ? 'Online Course' : 
                     module.type === 'certification' ? 'Certification' : 'Practical Project'}
                    <span className="mx-2 text-gray-300">|</span>
                    {module.platform}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  <p>
                    Duration: <span className="font-medium">{module.duration}</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
              
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPathPage;