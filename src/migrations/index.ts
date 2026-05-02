import * as migration_20260203_111258_init from './20260203_111258_init';
import * as migration_20260406_204611_add_site_settings from './20260406_204611_add_site_settings';
import * as migration_20260502_212500_add_logo_text_to_site_settings from './20260502_212500_add_logo_text_to_site_settings';

export const migrations = [
  {
    up: migration_20260203_111258_init.up,
    down: migration_20260203_111258_init.down,
    name: '20260203_111258_init',
  },
  {
    up: migration_20260406_204611_add_site_settings.up,
    down: migration_20260406_204611_add_site_settings.down,
    name: '20260406_204611_add_site_settings'
  },
  {
    up: migration_20260502_212500_add_logo_text_to_site_settings.up,
    down: migration_20260502_212500_add_logo_text_to_site_settings.down,
    name: '20260502_212500_add_logo_text_to_site_settings'
  },
];
