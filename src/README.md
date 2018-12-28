# Electron Top-level Modules

Keep it to be only 3 top-level modules:

1. `src/common`: common constants, configurations, modules? to share between main modules and renderer modules. Keep it thin - only things that are really need to share between main and renderer.
2. `src/main`: source code for electron main process (nodejs environment).
3. `src/renderer`: source code for electron renderer process (browser environment).

## Glossary

### Command
A data structure (not side-effect). This is how to "request" vscode to "do" something.
TODO: we might need a command interpreter where side-effect happens so that the commands being passed around is a serializable object (functional core) not ones that contain a function.

### Key Combo (keyCombo)
A data structure representing a set of keys (like `⇧⌘P`) pressed in the same time.

### Keybinding
A mapping of a key combo to a command - i.e. when a key combo is pressed, what command it will issue.
