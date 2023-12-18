export interface IGenericRepository<Entity> {
  findOne(id: string): Promise<Entity>;
  createOne(entity: Entity): Promise<Entity>;
  updateOne(id: string, entity: Partial<Entity>): void;
  find(): Promise<Entity[]>;
  deleteOne(id: string): void;
}
