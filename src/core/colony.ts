function loadEnergy(room: Room): EnergyState {
  return {
    available: room.energyAvailable,
    capacity: room.energyCapacityAvailable,
  };
}

export interface ColonyState {
  name: string;
  level: number;
  energy: EnergyState;
  creeps: Id<Creep>[];
  spawns: Id<StructureSpawn>[];
}

export interface EnergyState {
  available: number;
  capacity: number;
}

export function loadColony(room: Room): ColonyState {
  if (room.controller === undefined) {
    throw new Error("Invalid room.");
  }

  const state: ColonyState = {
    name: room.name,
    level: room.controller.level,
    energy: loadEnergy(room),
    creeps: room.find(FIND_MY_CREEPS).map((x) => x.id),
    spawns: room.find(FIND_MY_SPAWNS).map((x) => x.id),
  };

  room.memory.colony = state;

  return state;
}
