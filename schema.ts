import { list } from '@keystone-next/keystone';
import { checkbox, file, relationship, text, timestamp } from '@keystone-next/keystone/fields';
import { select } from '@keystone-next/keystone/fields';

export const lists = {
  Task: list({
    fields: {
      label: text({ validation: { isRequired: true } }),
      priority: select({
        type: 'enum',
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ],
      }),
      isComplete: checkbox(),
      assignedTo: relationship({ ref: 'Person.tasks', many: false }),
      finishBy: timestamp(),
    },
  }),
  Person: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      tasks: relationship({ ref: 'Task.assignedTo', many: true }),
    },
  }),
  FileUpload: list({
    fields: {
      file: file({}),
      createdAt: timestamp({
        validation: { isRequired: true },
        defaultValue: { kind: 'now' },
      }),
    },
    hooks: {
      beforeOperation: async ({ resolvedData, context }) => {},
    },
  }),
};
