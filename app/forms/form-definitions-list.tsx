import { useEffect, useState } from "react";
import { Link } from "react-router";
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
import { getAllFormDefinitions, deleteFormDefinitionByName } from "~/services/formDefinitions"; // Assuming these services exist

interface FormDefinition {
  id: string;
  description: string;
  schema: any;
}

export function FormDefinitionsListPage() {
  const [formDefinitions, setFormDefinitions] = useState<FormDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormDefinitions = async () => {
      try {
        setLoading(true);
        const data = await getAllFormDefinitions();
        setFormDefinitions(data);
      } catch (err) {
        console.error("Failed to fetch form definitions:", err);
        setError("Failed to load form definitions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormDefinitions();
  }, []);

  /**
   * Handles the deletion of a form definition.
   * @param formId The ID of the form definition to delete.
   */
  const handleDelete = async (formId: string) => {
    if (window.confirm(`Are you sure you want to delete form definition "${formId}"?`)) {
      try {
        await deleteFormDefinitionByName(formId);
        setFormDefinitions(formDefinitions.filter((def) => def.id !== formId));
      } catch (err) {
        console.error("Failed to delete form definition:", err);
        setError(`Failed to delete form definition "${formId}". Please try again.`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading form definitions...</div>
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
        <h1 className="text-3xl font-bold">Form Definitions</h1>
        <Button asChild>
          <Link to="/forms/create">Create New Form</Link>
        </Button>
      </div>

      {formDefinitions.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No form definitions found. Create one to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Definitions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formDefinitions.map((def) => (
                  <TableRow key={def.id}>
                    <TableCell className="font-medium">{def.id}</TableCell>
                    <TableCell>{def.description}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/forms/${def.id}`}>View/Edit</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(def.id)}
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
