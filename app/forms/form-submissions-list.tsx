import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"; // Import Link
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { getAllFormSubmissions, deleteFormSubmissionById } from "~/services/formSubmissions";

interface FormSubmission {
  id: string;
  formId: string;
  formData: any;
  submittedAt: string;
}

export function FormSubmissionsListPage() {
  const { formId } = useParams<{ formId: string; }>();
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!formId) {
      setError("Form ID is missing.");
      setLoading(false);
      return;
    }

    const fetchFormSubmissions = async () => {
      try {
        setLoading(true);
        const data = await getAllFormSubmissions(); // Assuming API doesn't support filtering by formId directly
        setFormSubmissions(data.filter((sub: FormSubmission) => sub.formId === formId));
      } catch (err) {
        console.error(`Failed to fetch submissions for form ${formId}:`, err);
        setError(`Failed to load submissions for form "${formId}". Please try again.`);
      } finally {
        setLoading(false);
      }
    };

    fetchFormSubmissions();
  }, [formId]);

  /**
   * Handles the deletion of a form submission.
   * @param submissionId The ID of the form submission to delete.
   */
  const handleDelete = async (submissionId: string) => {
    if (window.confirm(`Are you sure you want to delete submission "${submissionId}"?`)) {
      try {
        await deleteFormSubmissionById(submissionId);
        setFormSubmissions(formSubmissions.filter((sub) => sub.id !== submissionId));
      } catch (err) {
        console.error("Failed to delete form submission:", err);
        setError(`Failed to delete form submission "${submissionId}". Please try again.`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading submissions...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">{error}</div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Submissions for Form: {formId}</h1>
        {/* Back to Form Details button */}
        <Link to={`/forms/${formId}`}>
          <Button variant="outline">Back to Form Details</Button>
        </Link>
      </div>

      {formSubmissions.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No submissions found for this form yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
            <CardDescription>Showing submissions for form ID: {formId}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formSubmissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.id}</TableCell>
                    <TableCell>{new Date(sub.submittedAt).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/form-submissions/${sub.id}`}>View Details</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(sub.id)}
                        className="ml-2"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
