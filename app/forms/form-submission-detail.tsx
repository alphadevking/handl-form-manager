import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"; // Import Link
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { getFormSubmissionById, deleteFormSubmissionById } from "~/services/formSubmissions";

interface FormSubmission {
  _id: string; // Changed from 'id' to '_id' to match backend
  formId: string;
  formData: any;
  createdAt: string; // Changed from 'submittedAt' to 'createdAt' to match backend
}

export function FormSubmissionDetailPage() {
  const { submissionId } = useParams<{ submissionId: string; }>();
  const navigate = useNavigate();
  const [formSubmission, setFormSubmission] = useState<FormSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!submissionId) {
      setError("Submission ID is missing.");
      setLoading(false);
      return;
    }

    const fetchFormSubmission = async () => {
      try {
        setLoading(true);
        const data = await getFormSubmissionById(submissionId);
        setFormSubmission(data);
      } catch (err) {
        console.error(`Failed to fetch form submission ${submissionId}:`, err);
        setError(`Failed to load form submission "${submissionId}". It might not exist.`);
      } finally {
        setLoading(false);
      }
    };

    fetchFormSubmission();
  }, [submissionId]);

  /**
   * Handles the deletion of the current form submission.
   */
  const handleDelete = async () => {
    if (!submissionId) {
      setError("Submission ID is missing for delete operation.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete submission "${submissionId}"? This action cannot be undone.`)) {
      try {
        console.log("Attempting to delete submission with ID:", submissionId); // Debugging log
        await deleteFormSubmissionById(submissionId);
        navigate("/form-submissions"); // Redirect to all form submissions list
      } catch (err) {
        console.error(`Failed to delete form submission ${submissionId}:`, err);
        setError(`Failed to delete form submission "${submissionId}". Please try again.`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading form submission details...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">{error}</div>
    );
  }

  if (!formSubmission) {
    return (
      <div className="text-center text-gray-500 mt-8">Form submission not found.</div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-end mb-4"> {/* Added div for back button */}
        <Link to="/form-submissions">
          <Button variant="outline">Back to All Submissions</Button>
        </Link>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Submission Details: {formSubmission._id}</CardTitle>
          <CardDescription>Form ID: {formSubmission.formId}</CardDescription>
          <CardDescription>Submitted At: {new Date(formSubmission.createdAt).toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Submitted Data:</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm">
            {JSON.stringify(formSubmission.formData, null, 2)}
          </pre>
          <div className="mt-6 flex justify-end">
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Delete Submission
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
