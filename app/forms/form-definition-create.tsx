import { useState } from "react";
import { useNavigate } from "react-router";
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
import { createFormDefinition } from "~/services/formDefinitions";

const formSchema = z.object({
    id: z.string().min(1, { message: "ID is required." }),
    description: z.string().optional(),
    schema: z.string().min(1, { message: "Schema is required." }).refine((val) => { // Ensure this is 'schema'
        try {
            JSON.parse(val);
            return true;
        } catch (e) {
            return false;
        }
    }, { message: "Invalid JSON schema." }),
});

export function FormDefinitionCreatePage() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            description: "",
            schema: JSON.stringify({ // Ensure this is 'schema'
                type: "object",
                properties: {
                    name: { type: "string", title: "Name" },
                    email: { type: "string", format: "email", title: "Email" },
                    message: { type: "string", title: "Message" },
                },
                required: ["name", "email", "message"],
            }, null, 2), // Pre-fill with a basic schema
        },
    });

    /**
     * Handles form submission to create a new form definition.
     * @param values The form data.
     */
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setError(null);
        try {
            const newFormDefinition = {
                id: values.id,
                description: values.description,
                schema: JSON.parse(values.schema), // Ensure this is 'schema'
            };
            await createFormDefinition(newFormDefinition);
            navigate("/forms"); // Redirect to form definitions list
        } catch (err) {
            console.error("Failed to create form definition:", err);
            setError("Failed to create form definition. Please check your input and try again.");
        }
    };

    return (
        <div className="container mx-auto py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Create New Form Definition</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Form ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., contact-us" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
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
                                name="schema" // Ensure this is 'schema'
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
                            <Button type="submit">Create Form</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
