import {
    WebSocket,
    isWebSocketCloseEvent,
  } from "https://deno.land/std/ws/mod.ts";
  import { v4 } from "https://deno.land/std/uuid/mod.ts";
  import { camelize } from './utils/camelize.ts';

  const users = new Map<string, WebSocket>();

  function broadcast(message: string, senderId?: string) {
      if(!message) {return}

      debugger;

      for (const user of users.values()) {
          user.send(senderId ? `${senderId}: ${message}` : message)
      }
  }

  export async function chat(ws: WebSocket): Promise<void> {
      const userId = v4.generate();

      users.set(userId, ws);
      broadcast(`> User with id ${userId} is connected.`);

      for await (const event of ws) {
          const message = typeof event === 'string' 
            ? camelize(event) 
            : '';

          broadcast(message, userId);

          if(!message && isWebSocketCloseEvent(event)) {
              users.delete(userId);
              broadcast(`User with id ${userId} is disconnected`)
          }
      }
  }
