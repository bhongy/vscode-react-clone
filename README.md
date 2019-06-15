# Visual Studio Code React Clone

When I think of projects with best UX, VSCode always come to mind first. This is a project to clone VSCode using React (reactive view) - for my own learning in architectural/design for large, complex, interactive application (and the extension model).

## Development

```base
yarn start
```

Webpack is used to develop and build primarily because I want HMR when working on UI (components and styles).

Note: currently the folder structure as `main` versus `renderer` is dictated by `electron-webpack`. I'll probably find time to fork it at some point so that I can fully customize webpack.


## Architecture (High-level Design)

- **Events** are facts. They are what has _already_ happened in the system.
  - They are immutable. You cannot change the facts ... after the fact.
  - They are append only.
  - **Aggregates** are snapshots of events. They are how we read "state". We do not use shared mutable objects across services.
- **Commands** are intents. They are objects representing "requests" of things we want to happen.
  - use imperative verb i.e. intent something to be done
  - All commands do not cause function calls. They always cause two of the things to happen: an event being emitted from a domain object or nothing happens at all.
  - Any part of the system can issue command.
  - All parts of the system always "react" to the events being emitted from the domain objects.
  - The domain objects contain all the business logic.
  - I think of them as messages in the Actor model.
  - Note though there're strong correlation (but hopefully low coupling) between the command and the events.
- Not sure about the design on ...

- Currently, my plan is to have a centralized command handler that delegates (knows) about all domain objects.
  - not sure it's a good idea - want to explore a design that domain objects have more autonomy and command service is just an aggregator of all events (possibly only for logging perposes)
  - not sure it's a good idea also because the entity that issues the command knows a lot about the command so it's already couple to the service that it's sending to

- Example:
  - QuickOpenAction command is sent from any part of the system to the CommandsService
  - CommandsService delegates to WorkbenchService
  - WorkbenchService accepts the command (could also reject because it's a request) resulting in an emission of a new event (fact) that the QuickOpen is "enabled" (or "opened") note that this does not call a function to "change" the UI
  - The UI components that care about this event (registered to the event) reacts autonomously (the UI component itself defines what I'd do when the event happens). For example, QuickOpen component might now be visible and another higher-level UI manager will "give" focus to the QuickOpen component.

- **Services** ... abstraction layer for interacting to a business domain. We don't care if it's in process or remote calls. We always treat it as communicating across boundary of services and must embrace that it could fail, unavailable, delayed, eventually consistent (cannot guarantee strong consistency), be non-deterministic.
  - Embrace that the service I'm talking to might be down/fail and that (service failure) should just be an event (nothing exceptional)
  - I think of them as the "mailboxes" to receive messages in the Actor model.
  - probably the same as domain object for now - I'm not sure the difference yet
  - Can they all be stateless? Just a business logic layer and the event store (state) is somewhere else.
- **Domain Object**

- one of the key idea is autonomy - the service listen to the event have an autonomy what it allows to happens (it can also decide to ignore the event) - receive & react
  - autonomy: it can only promise its own behavior / make information local
- do we want to allow an event triggering another event? want to be very careful here

Inspiration:
- https://youtu.be/1hwuWmMNT4c
- https://youtu.be/AG3KuqDbmhM


## Design ideas (Old Concrete-Design)

- **Commands** defines what happens (handlers) within Code. Commands can be executed by other entities like KeybindingsService or MenuService. It will not be invoked by other modules but rather having an "index" (actor pattern) that other entities will push command messages (requests) to. It should not couple to keybindings.
- **KeyInputsService** are just a global singleton service that listen to user keyboard inputs and broadcast such events. It's just a boundary entity (imperative shell) that bridges I/O to the data stream in the system. It should not make decision (aim for zero logic). It should be *de*coupled from keybindings service and context service.
- **ContextService** is a stateful service. First support came to mind is to combine with keybindings result to support issuing different commands based on "where" or "when" like "when `editorTextFocus`".
- **KeybindingsService** depends on KeyInputsService and ContextService. It's just a simple map - given event stream of key inputs and current context, issue a command (handler). Probably aim for every keybinding will map to a command - never an adhoc function.


## Glossary (TBD)

### Command
A data structure (not side-effect). This is how to "request" vscode to "do" something.
TODO: we might need a command interpreter where side-effect happens so that the commands being passed around is a serializable object (functional core) not ones that contain a function.

### Key Combo (keyCombo)
A data structure representing a set of keys (like `⇧⌘P`) pressed in the same time.

### Keybinding
A mapping of a key combo to a command - i.e. when a key combo is pressed, what command it will issue.


## Todos

- [ ] Use implicit use strict in tsconfig
- [ ] Audit `tsconfig.json -> compilerOptions` and see if there're stricter rules that should be added
- [ ] Dockerize dev env because I ran into node version mismatch and electron needs to be rebuild a few times already
- [ ] See if any of the services belong to electron's "main" rather than "renderer" (need to read more)
- [ ] Setup [devtron](https://github.com/electron/devtron) and ensure that it works with webpack - i.e. `__dirname`
- [ ] Setup tslint after ts, webpack and jest setups are all good.
- [ ] Organize project by features (e.g. editor, quickopen) rather than by types (e.g. components, services)
