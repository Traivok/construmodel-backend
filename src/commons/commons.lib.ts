import { ClassConstructor, plainToInstance } from 'class-transformer';

export function IsNil(arg: any): boolean {
  return arg === null || arg === undefined;
}

export function entitiesToDTOs<DTO, ENT>(entities: ENT[], cls: ClassConstructor<DTO>): DTO[] {
  return entities?.map(e => plainToInstance(cls, e, { excludeExtraneousValues: true })) ?? [];
}
