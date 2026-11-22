# 3D Interaction Design Notes

## Camera controls
- Choose a useful initial camera position and target.
- Set reasonable minimum and maximum zoom distances.
- Prevent camera movement from exposing unintended parts of the scene.
- Keep controls predictable across mouse, touch, and keyboard input where supported.

## Object interaction
- Use raycasting or the interaction mechanism already adopted by the project.
- Make interactive objects visually distinguishable.
- Provide feedback for hover, selection, and unavailable actions.
- Avoid triggering multiple actions from a single pointer event.

## Accessibility and usability
- Do not make essential information available only through color.
- Provide text labels or a complementary HTML interface for important controls.
- Ensure instructions explain how to rotate, pan, zoom, and reset the view.
- Keep a clear route back to the default camera state.

## Validation
Test interaction with different viewport sizes, pointer devices, and keyboard navigation where implemented.
