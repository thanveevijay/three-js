# GPU Resource Disposal

Dispose geometries, materials, textures, render targets, and controls when they are no longer needed. Shared resources should be reference-counted or owned by a clear scene-level manager to avoid disposing objects still in use.