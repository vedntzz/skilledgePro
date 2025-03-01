import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Upload, CheckCircle } from 'lucide-react';

const ResumeUploadPage = () => {
  const { projectId, roleId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [role, setRole] = useState(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

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
  }, [projectId, roleId]);

  const handleUpload = () => {
    setResumeUploaded(true);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalyzing(false);
      navigate(`/results/${projectId}/${roleId}`);
    }, 2000);
  };

  if (!project || !role) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl leading-6 font-bold text-gray-900">Apply for {role.title}</h3>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {project.name}
          </span>
        </div>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Upload your resume to analyze how your skills match this role.
        </p>
      </div>
      
      <div className="bg-white shadow overflow-hidden rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col items-center">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full bg-blue-100">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Upload Your Resume</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  We'll analyze your resume to identify skill gaps for the {role.title} role.
                </p>
              </div>
            </div>
            
            <div 
              className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
              onClick={handleUpload}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop your resume here or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supports PDF, DOCX, TXT formats
              </p>
            </div>
            
            {resumeUploaded && (
              <div className="mt-6 w-full max-w-md">
                <div className="flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>resume.pdf uploaded successfully</span>
                  </div>
                  <CheckCircle className="h-5 w-5" />
                </div>
                
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    {analyzing ? 'Analyzing Resume...' : 'Analyze My Skills'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage;