# Electron Top-level Modules

Keep it to be only 3 top-level modules:

1. `src/common`: common constants, configurations, modules? to share between main modules and renderer modules. Keep it thin - only things that are really need to share between main and renderer.
2. `src/main`: source code for electron main process (nodejs environment).
3. `src/renderer`: source code for electron renderer process (browser environment).
