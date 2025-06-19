import api from '~/lib/api';

interface FormDefinition {
  id: string;
  schema: object; // Changed from 'formSchema' back to 'schema' to match backend
  description?: string;
}

/**
 * Creates a new form definition.
 * @param data - The form definition data.
 * @returns A promise that resolves with the created form definition.
 */
export const createFormDefinition = async (data: FormDefinition) => {
  const response = await api.post('/form-definitions', data);
  return response.data;
};

/**
 * Retrieves all form definitions.
 * @returns A promise that resolves with an array of form definitions.
 */
export const getAllFormDefinitions = async () => {
  const response = await api.get('/form-definitions');
  return response.data;
};

/**
 * Retrieves a single form definition by its name (ID).
 * @param name - The name (ID) of the form definition.
 * @returns A promise that resolves with the form definition.
 */
export const getFormDefinitionByName = async (name: string) => {
  const response = await api.get(`/form-definitions/${name}`);
  return response.data;
};

/**
 * Updates an existing form definition by its name (ID).
 * @param name - The name (ID) of the form definition to update.
 * @param data - The updated form definition data.
 * @returns A promise that resolves with the updated form definition.
 */
export const updateFormDefinitionByName = async (name: string, data: Partial<FormDefinition>) => {
  const response = await api.put(`/form-definitions/${name}`, data);
  return response.data;
};

/**
 * Deletes a form definition by its name (ID).
 * @param name - The name (ID) of the form definition to delete.
 * @returns A promise that resolves upon successful deletion.
 */
export const deleteFormDefinitionByName = async (name: string) => {
  const response = await api.delete(`/form-definitions/${name}`);
  return response.data;
};
