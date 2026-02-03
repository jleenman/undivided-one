import * as migration_20260203_111258_init from './20260203_111258_init';

export const migrations = [
  {
    up: migration_20260203_111258_init.up,
    down: migration_20260203_111258_init.down,
    name: '20260203_111258_init'
  },
];
