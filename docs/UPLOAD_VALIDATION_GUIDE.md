# Member image upload validation guide

This guide describes expected checks for the member image upload endpoint.

## Validation expectations
- Accept only explicitly supported image formats.
- Validate both the declared content type and the decoded file content; a filename extension alone is not sufficient.
- Enforce a conservative upload-size limit before persisting the file.
- Generate a server-side filename rather than trusting a client-supplied path.
- Store uploads outside executable/static application code where practical.
- Return a safe validation error without exposing local filesystem paths.

## Test cases
- Valid JPEG and PNG images within the configured size limit.
- A text file renamed with an image extension.
- An image with a misleading content-type header.
- Empty files, truncated images, and oversized payloads.
- Filenames containing path separators or unusual Unicode characters.
- Requests with no file attached.

## Operational notes
Use a non-production upload directory for tests. Review retention and deletion behavior for uploaded images, and ensure the application does not expose private uploads through predictable public URLs.
