export class EntityDeletedResponse {
  public message:
    | `Successfully deleted '${string}' ${string} entity.`
    | `Successfully deleted ${string} entities.`
    | `Successfully updated ${string} entity.`;
  public affected: number;

  constructor(
    public readonly entityName: string,
    affected: number,
    id?: string | number,
  ) {
    this.affected = affected;
    if (affected > 1) {
      this.message = `Successfully deleted ${entityName} entities.`;
    } else {
      this.message = `Successfully deleted '${id}' ${entityName} entity.`;
    }
  }
}

export class EntityUpdatedResponse {
  public message:
    | `Successfully updated '${string}' ${string} entity.`
    | `Successfully updated ${string} entities.`
    | `Successfully updated ${string} entity.`;
  public affected: number;

  constructor(
    public readonly entityName: string,
    affected: number,
    id?: string | number,
  ) {
    this.affected = affected;
    if (affected > 1) {
      this.message = `Successfully updated ${entityName} entity.`;
    } else {
      this.message = `Successfully updated '${id}' ${entityName} entity.`;
    }
  }
}
