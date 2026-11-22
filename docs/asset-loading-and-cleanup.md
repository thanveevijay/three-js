# Asset Loading and Cleanup Lifecycle

## Loading
- Load models and textures through the project's established asset-loading utilities.
- Show a useful loading state for assets that take noticeable time to arrive.
- Handle load failures with a fallback or a clear error message.
- Avoid starting duplicate requests for the same shared asset when reuse is possible.

## Resource ownership
Make it clear which component or scene owns each geometry, material, and texture. Shared resources should not be disposed while another object still uses them.

## Cleanup
When an object is permanently removed:
1. Detach it from the scene.
2. Dispose of resources owned exclusively by that object.
3. Remove event listeners and interaction handlers.
4. Clear references that would otherwise keep large objects in memory.

## Validation
- Load and unload the same scene repeatedly.
- Check that renderer memory statistics do not grow without bound.
- Test missing and corrupted assets.
- Confirm that shared materials and textures remain available to their other consumers.

A deliberate resource lifecycle helps prevent memory leaks and makes complex scenes easier to maintain.
