# Handl Form Manager

A robust and scalable form management application built with React Router, designed to streamline the creation, management, and submission of forms.

## Features

- **Form Definition Management**: Create, view, edit, and delete custom form definitions.
- **Form Submission Handling**: Public-facing form submission page, with capabilities to view all submissions and individual submission details.
- **API Key Authentication**: Secure API endpoint for programmatic form submissions using API keys.
- **User Authentication**: Secure sign-on and sign-up processes for user management.
- **Dashboard**: Centralized dashboard for an overview and management of forms and submissions.
- **Dynamic Form Rendering**: (Planned) Future support for dynamically rendering form fields based on defined schemas.
- **Server-Side Rendering (SSR)**: Enhanced performance and SEO with server-side rendering.
- **Hot Module Replacement (HMR)**: Fast development cycles with instant updates.
- **Asset Bundling and Optimization**: Optimized for production deployments.
- **TypeScript**: Strong typing for improved code quality and maintainability.
- **Tailwind CSS**: Utility-first CSS framework for rapid and consistent styling.
- **React Router**: Powerful routing library for seamless navigation.

## API Endpoints

### Form Submission

Submit form data programmatically to the following endpoint:

-   **Endpoint**: `POST /form-submissions`
-   **Content-Type**: `application/json`
-   **Headers**:
    -   `X-API-KEY`: Your API Key (required for authentication)
-   **Request Body**:
    ```json
    {
      "formId": "your-form-id",
      "formData": {
        "field1": "value1",
        "field2": "value2"
      }
    }
    ```
-   **Example cURL Request**:
    ```bash
    curl -X POST \
      'http://localhost:3000/form-submissions' \
      -H 'Content-Type: application/json' \
      -H 'X-API-KEY: YOUR_API_KEY' \
      -d '{
            "formId": "contact-us",
            "formData": {
              "name": "John Doe",
              "email": "john.doe@example.com",
              "message": "This is a test message."
            }
          }'
    ```

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
