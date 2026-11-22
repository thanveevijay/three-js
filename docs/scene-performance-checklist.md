# 3D Scene Performance Checklist

## Rendering
- Reuse geometries and materials when objects share the same appearance.
- Avoid creating new GPU resources inside the animation loop.
- Dispose of geometries, materials, and textures when they are no longer needed.
- Keep shadow casting and receiving enabled only where it contributes to the scene.

## Animation
- Use the frame delta to make movement independent of refresh rate.
- Pause or reduce animation work when the scene is not visible, where appropriate.
- Avoid repeated allocations in per-frame update functions.

## Assets
- Prefer appropriately sized textures.
- Compress large models and textures when the asset pipeline supports it.
- Load non-critical assets progressively.
- Provide a fallback for missing or failed assets.

## Diagnostics
- Track frame rate and renderer resource counts during development.
- Test on both high- and lower-powered devices.
- Profile before and after each optimization to confirm that it helps.

Optimize based on measured bottlenecks rather than reducing visual quality indiscriminately.
