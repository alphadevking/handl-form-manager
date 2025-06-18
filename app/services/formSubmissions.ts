import api from '~/lib/api';

interface FormSubmission {
  formId: string;
  formData: object;
}

/**
 * Submits a new form entry.
 * @param data - The form submission data.
 * @returns A promise that resolves with the created form submission.
 */
export const submitForm = async (data: FormSubmission) => {
  const response = await api.post('/form-submissions', data);
  return response.data;
};

/**
 * Retrieves all form entries.
 * @returns A promise that resolves with an array of form submissions.
 */
export const getAllFormSubmissions = async () => {
  const response = await api.get('/form-submissions');
  return response.data;
};

/**
 * Retrieves a single form entry by its ID.
 * @param id - The ID of the form entry.
 * @returns A promise that resolves with the form submission.
 */
export const getFormSubmissionById = async (id: string) => {
  const response = await api.get(`/form-submissions/${id}`);
  return response.data;
};

/**
 * Deletes a form entry by its ID.
 * @param id - The ID of the form entry to delete.
 * @returns A promise that resolves upon successful deletion.
 */
export const deleteFormSubmissionById = async (id: string) => {
  const response = await api.delete(`/form-submissions/${id}`);
  return response.data;
};
