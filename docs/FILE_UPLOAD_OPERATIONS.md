# File upload operations guidance

## Safe handling
- Enforce file-size limits before processing.
- Validate actual file content rather than trusting the extension or request header.
- Generate storage names on the server and prevent path traversal.
- Store uploads outside executable application directories where possible.
- Restrict access to uploaded content and avoid predictable private-file URLs.

## Failure handling
- Remove partial files when a request fails.
- Return consistent client errors for unsupported or oversized uploads.
- Log a request identifier and safe error category, not file contents or private paths.
- Set sensible timeouts and limits at both the application and proxy layers.

## Maintenance
- Define retention and deletion behavior for abandoned uploads.
- Monitor disk usage.
- Back up required user content securely.
- Test malformed, empty, oversized, and misleadingly named files after changes to upload handling.
