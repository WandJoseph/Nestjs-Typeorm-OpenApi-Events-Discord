import { Repository } from 'typeorm';

interface IBaseFactory<Entity, CreateDto> {
  create(data?: Partial<CreateDto>): Entity | Promise<Entity>;
  build(data?: Partial<CreateDto>): Entity;
  stub(data?: Partial<CreateDto>): CreateDto;
}

export abstract class BaseFactory<Entity, CreateDto>
  implements IBaseFactory<Entity, CreateDto>
{
  constructor(private __repo: Repository<Entity>) {}

  abstract stub(data?: Partial<CreateDto>): CreateDto;

  create(dto?: Partial<CreateDto>): Promise<Entity> {
    const entity = this.build(dto);
    return this.__repo.save(entity);
  }
  build(dto?: Partial<CreateDto>): Entity {
    const data = this.stub();
    return this.__repo.create({
      ...data,
      ...dto,
    } as unknown as Entity) as Entity;
  }
}
