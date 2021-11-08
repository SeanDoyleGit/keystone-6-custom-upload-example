import { config } from '@keystone-next/keystone';
import { lists } from './schema';

export default config({
  db: {
    provider: 'sqlite',
    url: process.env.DATABASE_URL || 'file:./keystone-example.db',
  },
  files: {
    upload: 'local',
    local: {
      storagePath: 'public/files',
      baseUrl: '/files',
    },
  },
  lists,
});
