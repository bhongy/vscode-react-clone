'use strict';

/**
 * A centralize location that knows how to delegate all commands to the responsible entity.
 * The idea is not to have two concrete entities talk to each other directly
 * without going through this service to avoid adhoc coupling between concrete entities.
 *
 * ... feel like this is going to become a messy monolith quickly ... we'll see how it goes
 *
 * Do not put too much logic in this layer. It merely delegates to appropriate entities.
 *
 * Probably have commandsService be the only entity that "execute" command for the entities.
 */
