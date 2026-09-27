---
"zunoui": patch
---

`zunoui add` now prints the right import path for compositions: items of type `registry:component` (such as `date-picker` or `password-input`) point to `aliases.components` instead of `aliases.ui`.
