# REST API test matrix

Use this matrix as a starting point for testing the member-management API. Adjust endpoint names to match the routes currently implemented.

| Scenario | Expected behavior |
|---|---|
| Valid request with required fields | Successful response and persisted record |
| Missing required field | Client error with field guidance |
| Malformed JSON | Client error without server traceback |
| Unknown member identifier | Not-found response |
| Unsupported HTTP method | Method-not-allowed response |
| Oversized image upload | Payload-too-large response |
| Non-image upload renamed as image | Rejected after content validation |
| Database unavailable | Safe server error and useful server-side log |

## Additional checks
- Confirm CORS allows only intended frontend origins in deployment.
- Verify upload paths cannot be controlled by the client.
- Check that error responses do not disclose filesystem paths or secrets.
- Ensure update and delete routes enforce authorization if authentication is added.
- Use isolated test data and clean it up after each run.
