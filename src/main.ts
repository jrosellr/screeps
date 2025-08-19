import { type ColonyState, loadColony } from "./core/colony.ts";

declare global {
  interface RoomMemory {
    colony?: ColonyState;
  }
}

function cpu(): void {
  console.log(`CPU: ${Game.cpu.getUsed()}`);
}

const MIN_WORKERS: number = 5;

export function loop(): void {
  const colonies = Object.values(Game.rooms)
    .filter((room) => {
      return room.controller !== undefined;
    })
    .map(loadColony);

  for (const colony of colonies) {
    if (colony.creeps.length < MIN_WORKERS) {
      const spawns = colony.spawns
        .map((id) => {
          return Game.getObjectById(id);
        })
        .filter((object) => {
          return object !== null;
        });

      const spawn = spawns.find((spawn) => {
        return spawn.spawning === null;
      });

      if (spawn !== undefined) {
        const creepCost =
          BODYPART_COST[WORK] + BODYPART_COST[CARRY] + BODYPART_COST[MOVE] * 2;
        if (creepCost <= colony.energy.available) {
          spawn.spawnCreep(
            [WORK, CARRY, MOVE, MOVE],
            `creep-${Date.now().toString(32)}`,
          );
        }
      }
    }
  }

  cpu();
}
