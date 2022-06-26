import { SetMetadata } from '@nestjs/common';
import { DISCORD_GROUPS_METADATA_KEY } from '../discord.constantas';

class GroupOptions {
  name: string;
}
export const getGroups = (): GroupOptions[] =>
  Reflect.getMetadata(DISCORD_GROUPS_METADATA_KEY, GroupOptions) || [];

const setGroups = (groups: GroupOptions[]) =>
  Reflect.defineMetadata(DISCORD_GROUPS_METADATA_KEY, groups, GroupOptions);

const GroupDecorator = (options: GroupOptions) => {
  const groups = getGroups();
  groups.push(options);
  setGroups(groups);
  return groups;
};

export const Group = (options: GroupOptions) =>
  SetMetadata(DISCORD_GROUPS_METADATA_KEY, GroupDecorator(options));
