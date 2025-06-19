import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"; // Import Link
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  getFormDefinitionByName,
  updateFormDefinitionByName,
  deleteFormDefinitionByName,
} from "~/services/formDefinitions";

const formSchema = z.object({
  id: z.string(), // ID is read-only, but included for form structure
  description: z.string().optional(),
  schema: z.string().min(1, { message: "Schema is required." }).refine((val) => { // Changed from formSchema to schema
    try {
      JSON.parse(val);
      return true;
    } catch (e) {
      return false;
    }
  }, { message: "Invalid JSON schema." }),
});

export function FormDefinitionDetailPage() {
  const { formId } = useParams<{ formId: string; }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: formId || "",
      description: "",
      schema: "", // Changed from 'formSchema' to 'schema'
    },
  });

  useEffect(() => {
    if (!formId) {
      setError("Form ID is missing.");
      setLoading(false);
      return;
    }

    const fetchFormDefinition = async () => {
      try {
        setLoading(true);
        const data = await getFormDefinitionByName(formId);
        // console.log(data);
        form.reset({
          id: data.id,
          description: data.description || "",
          // Ensure formSchema is parsed if it's a string, then stringify for pretty printing
          schema: typeof data.schema === 'string'
            ? JSON.stringify(JSON.parse(data.schema), null, 2)
            : JSON.stringify(data.schema, null, 2),
        });
      } catch (err) {
        console.error(`Failed to fetch form definition ${formId}:`, err);
        setError(`Failed to load form definition "${formId}". It might not exist.`);
      } finally {
        setLoading(false);
      }
    };

    fetchFormDefinition();
  }, [formId, form]);

  /**
   * Handles form submission to update an existing form definition.
   * @param values The form data.
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    if (!formId) {
      setError("Form ID is missing for update operation.");
      return;
    }
    try {
      const updatedFormDefinition = {
        description: values.description,
        schema: JSON.parse(values.schema), // Changed from formSchema to schema
      };
      await updateFormDefinitionByName(formId, updatedFormDefinition);
      navigate("/forms"); // Redirect to form definitions list
    } catch (err) {
      console.error(`Failed to update form definition ${formId}:`, err);
      setError(`Failed to update form definition "${formId}". Please check your input and try again.`);
    }
  };

  /**
   * Handles the deletion of the current form definition.
   */
  const handleDelete = async () => {
    if (!formId) {
      setError("Form ID is missing for delete operation.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete form definition "${formId}"? This action cannot be undone.`)) {
      try {
        await deleteFormDefinitionByName(formId);
        navigate("/forms"); // Redirect to form definitions list
      } catch (err) {
        console.error(`Failed to delete form definition ${formId}:`, err);
        setError(`Failed to delete form definition "${formId}". Please try again.`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading form definition...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">{error}</div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6"> {/* Added div for header actions */}
        <h1 className="text-3xl font-bold">Form Definition: {formId}</h1>
        <div className="flex gap-2">
          {/* Back to Forms button */}
          <Link to="/forms">
            <Button variant="outline">Back to Forms</Button>
          </Link>
          {/* Link to View Submissions for this Form */}
          <Link to={`/forms/${formId}/submissions`}>
            <Button variant="outline">View Submissions</Button>
          </Link>
          {/* Link to Public Submission Page for this Form */}
          <Link to={`/forms/${formId}/submit`}>
            <Button variant="outline">Public Form</Button>
          </Link>
        </div>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Form</CardTitle> {/* Changed title for clarity */}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => {
                  // console.log("Field props:", field); // Debugging line
                  return (
                    <FormItem>
                      <FormLabel>Form ID</FormLabel>
                      <FormControl>
                        <Input type="text" value={field.value} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="A brief description of the form" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schema" // Changed from formSchema to schema
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>JSON Schema</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='{"type": "object", "properties": { ... }}'
                        className="min-h-[200px] font-mono"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-between">
                <Button type="submit">Update Form</Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Delete Form
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
