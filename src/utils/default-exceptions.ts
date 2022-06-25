export class Exception extends Error {
  name: string;
  constructor(...args: any[]) {
    super(...args);
    this.name = this.constructor.name;
  }
}

export class EntityNotFoundException extends Exception {
  constructor(public readonly entityName: string) {
    super(`${entityName || 'Entity'} not found.`);
    this.name = 'EntityNotFoundException';
  }
}

export class EntityConflictException extends Exception {
  constructor(public readonly entityName: string) {
    super(`${entityName || 'Entity'} already exists.`);
    this.name = 'EntityConflictException';
  }
}
