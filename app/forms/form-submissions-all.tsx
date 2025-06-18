import { useEffect, useState } from "react";
import { Link } from "react-router"; // Import Link
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getAllFormSubmissions, deleteFormSubmissionById } from "~/services/formSubmissions"; // Assuming these services exist

interface FormSubmission {
  id: string;
  formId: string;
  formData: any;
  submittedAt: string;
}

export function FormSubmissionsAllPage() {
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormSubmissions = async () => {
      try {
        setLoading(true);
        const data = await getAllFormSubmissions();
        setFormSubmissions(data);
      } catch (err) {
        console.error("Failed to fetch form submissions:", err);
        setError("Failed to load form submissions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormSubmissions();
  }, []);

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
      <div className="flex justify-center items-center h-full">Loading form submissions...</div>
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
        <h1 className="text-3xl font-bold">All Form Submissions</h1>
        {/* Back to Dashboard button */}
        <Link to="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      {formSubmissions.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No form submissions found yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Form ID</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formSubmissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.id}</TableCell>
                    <TableCell>{sub.formId}</TableCell>
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
