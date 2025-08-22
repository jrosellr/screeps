import {loadColony} from "./core/colony.ts";

function cpu(): void {
  console.log(`CPU: ${Game.cpu.getUsed()}`);
}

declare global {
  interface CreepMemory {
    colony?: string;
  }
}

const MIN_WORKERS = 5;

export function loop(): void {
  const colonies = Object.values(Game.rooms)
    .filter((room) => {
      return room.controller !== undefined;
    })
    .map(loadColony);

  for (const colony of colonies) {
    if (colony.creeps.length < MIN_WORKERS) {
      if (colony.spawnFacility === undefined) {
        continue;
      }

      const status = colony.spawnFacility.spawn([WORK, CARRY, MOVE, MOVE], {
        colony: colony.name,
      });
      if (status !== OK) {
        console.log(`${colony.name} . Failed to spawn ${status}`);
      }
    }
  }

  cpu();
}
