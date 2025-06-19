import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { getFormDefinitionByName } from "~/services/formDefinitions";
import { submitForm } from "~/services/formSubmissions";

interface FormDefinition {
    id: string;
    schema: any;
    description?: string;
}

export function PublicFormSubmissionPage() {
    const { formId } = useParams<{ formId: string; }>();
    const [formDefinition, setFormDefinition] = useState<FormDefinition | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

    const form = useForm<{ formData: string; }>({
        resolver: zodResolver(z.object({
            formData: z.string().min(1, { message: "Form data is required." }).refine((val) => {
                try {
                    JSON.parse(val);
                    return true;
                } catch (e) {
                    return false;
                }
            }, { message: "Invalid JSON data." }),
        })),
        defaultValues: {
            formData: JSON.stringify({
                // Example default values based on schema
                name: 'John Doe',
                email: 'john.doe@example.com',
                message: 'Hello, I have a question.'
            }),
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
                setFormDefinition(data);
                // TODO: Dynamically set default form values based on fetched schema
            } catch (err) {
                console.error(`Failed to fetch form definition ${formId}:`, err);
                setError(`Failed to load form "${formId}". It might not exist.`);
            } finally {
                setLoading(false);
            }
        };

        fetchFormDefinition();
    }, [formId]);

    /**
     * Handles form submission for the public form.
     * @param values The form data.
     */
    const onSubmit = async (values: { formData: string; }) => {
        setError(null);
        setSubmissionSuccess(false);
        if (!formId) {
            setError("Form ID is missing for submission.");
            return;
        }
        try {
            const submissionData = {
                formId: formId,
                formData: JSON.parse(values.formData),
            };
            console.log("Submitting data:", submissionData); // Added console log for debugging
            // Submits the form data using the existing submitForm service.
            const response = await submitForm(submissionData);
            console.log("Form submission successful:", response); // Log successful response data
            setSubmissionSuccess(true);
            form.reset(); // Clear form after successful submission
            // Clear success message after 5 seconds
            setTimeout(() => setSubmissionSuccess(false), 5000);
        } catch (err) {
            console.error(`Failed to submit form ${formId}:`, err);
            setError(`Failed to submit form "${formId}". Please check your input and try again.`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">Loading form...</div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-8">{error}</div>
        );
    }

    if (!formDefinition) {
        return (
            <div className="text-center text-gray-500 mt-8">Form not found.</div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Submit Form: {formDefinition.id}</CardTitle>
                    <CardDescription>{formDefinition.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <h3 className="text-lg font-semibold mb-2">Form Schema (for reference):</h3>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm mb-4">
                        {JSON.stringify(formDefinition.schema, null, 2)}
                    </pre>

                    {/* API Submission Instructions */}
                    <div className="mt-8 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-lg font-semibold mb-2">API Submission</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                            Submit data to this form programmatically using the API endpoint below.
                            Include your API Key in the `X-API-KEY` header for authentication (found in your Dashboard/User Profile).
                        </p>
                        <p className="font-medium mb-2">Endpoint:</p>
                        <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md overflow-auto text-xs mb-4">
                            <code>{`POST ${import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:3000'}/form-submissions`}</code>
                        </pre>

                        <p className="font-medium mb-2">Example using cURL:</p>
                        <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md overflow-auto text-xs mb-4">
                            <code>{`curl -X POST \\
  '${import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:3000'}/form-submissions' \\
  -H 'Content-Type: application/json' \\
  -H 'X-API-KEY: YOUR_API_KEY' \\
  -d '${JSON.stringify(
                                {
                                    formId: formId,
                                    formData: JSON.parse((form.getValues("formData") || "").trim() !== '' ? (form.getValues("formData") as string) : "{}")
                                }
                            )}'`}</code>
                        </pre>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8"> {/* Added mt-8 for spacing */}
                            {/* TODO: Replace this generic textarea with dynamically rendered form fields */}
                            <FormField
                                control={form.control}
                                name="formData"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Form Data (JSON)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder='{"field1": "value1", "field2": "value2"}'
                                                className="min-h-[200px] font-mono"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {submissionSuccess && (
                                <p className="text-green-500 text-sm">Form submitted successfully!</p>
                            )}
                            <Button type="submit">Submit Form</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
