export class SpawnFacility {
  private readonly _structures: StructureSpawn[];
  private _energy: number;

  private constructor(spawns: StructureSpawn[], energy: number) {
    this._structures = spawns;
    this._energy = energy;
  }

  public static From(
    spawns: StructureSpawn[],
    energy: number,
  ): SpawnFacility | undefined {
    if (spawns.length === 0) {
      return undefined;
    }

    return new SpawnFacility(spawns, energy);
  }

  public spawn(
    body: BodyPartConstant[],
    memory?: Partial<CreepMemory>,
  ): ScreepsReturnCode {
    const structure = this._structures.find((structure) => {
      return !structure.spawning;
    });
    if (structure === undefined) {
      return ERR_BUSY;
    }

    const cost = this.calculateCost(body);
    if (cost > this._energy) {
      return ERR_NOT_ENOUGH_ENERGY;
    }

    const status = structure.spawnCreep(body, this.generateName(), {
      memory: memory,
    });

    if (status === OK) {
      this._energy -= cost;
    }

    return status;
  }

  private generateName(): string {
    return `creep-${Date.now().toString(32)}`;
  }

  private calculateCost(body: BodyPartConstant[]): number {
    return body.reduce((acc, curr) => {
      return acc + BODYPART_COST[curr];
    }, 0);
  }
}
