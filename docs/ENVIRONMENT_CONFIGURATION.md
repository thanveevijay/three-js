# Environment configuration practices

Keep environment-specific settings outside source code so local development and deployment can use different values safely.

## Configuration checklist
- Read database connection details from environment variables.
- Keep session secrets and API credentials out of the repository.
- Provide safe development defaults only for non-sensitive settings.
- Fail clearly when a required production setting is missing.
- Avoid printing credentials or full connection strings in logs.

## Deployment checks
- Configure allowed frontend origins explicitly rather than allowing every origin by default.
- Use HTTPS in deployed environments.
- Set upload size and file-type limits at the application and reverse-proxy layers.
- Store user uploads in a controlled location with appropriate access rules.
- Review dependency versions and update vulnerable packages.

## Local setup
Document required variable names and example non-secret values in a separate example environment file. Never commit a populated local environment file.
