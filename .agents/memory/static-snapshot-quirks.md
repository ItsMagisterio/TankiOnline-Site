---
name: Imported static snapshot quirks
description: Durable pitfalls when serving archived static sites imported from old CMS or WordPress exports.
---

Legacy static exports should be checked for files that contain an HTML 404 page despite having a `.js` extension, and for enumerable helpers added to built-in prototypes. Both can cause browser runtime failures even when the page itself renders.

**Why:** Old pages often rely on `for…in` over arrays and assume every referenced asset is valid JavaScript; modern hosting exposes these archive inconsistencies immediately.

**How to apply:** Before changing the page structure, validate locally referenced scripts and keep compatibility shims minimal and isolated when preserving the original archive is the goal.