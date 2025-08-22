import { SpawnFacility } from "./spawn-facility";

function loadEnergy(room: Room): EnergyStore {
  return {
    available: room.energyAvailable,
    capacity: room.energyCapacityAvailable,
  };
}

export interface Colony {
  name: string;
  level: number;
  energy: EnergyStore;
  creeps: Creep[];
  spawnFacility: SpawnFacility | undefined;
}

export interface EnergyStore {
  available: number;
  capacity: number;
}

export function loadColony(room: Room): Colony {
  if (room.controller === undefined) {
    throw new Error("Invalid room.");
  }

  const energy = loadEnergy(room);
  const spawns = room.find(FIND_MY_SPAWNS);
  return {
    name: room.name,
    level: room.controller.level,
    energy: energy,
    creeps: room.find(FIND_MY_CREEPS),
    spawnFacility: SpawnFacility.From(spawns, energy.available),
  };
}
