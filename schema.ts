import { list } from '@keystone-next/keystone';
import { checkbox, file, relationship, text, timestamp } from '@keystone-next/keystone/fields';
import { select } from '@keystone-next/keystone/fields';
import { parseCSV } from './lib/parse-csv';

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
  TaskUpload: list({
    ui: { hideCreate: true },
    fields: {
      file: file({}),
      createdAt: timestamp({
        validation: { isRequired: true },
        defaultValue: { kind: 'now' },
      }),
    },
    hooks: {
      afterOperation: async ({ inputData, context }) => {
        if (!inputData || !inputData.file || !inputData.file.upload) {
          return;
        }

        const file = await inputData.file.upload;
        const data = await parseCSV(file);

        const tasks = await context.query.Task.createMany({
          data: data.map((task) => ({
            ...task,
            isComplete: task.isComplete === 'TRUE',
            finishBy: new Date(task.finishBy),
            assignedTo: { connect: { id: task.assignedTo } },
          })),
          query: 'id label priority finishBy',
        });
      },
    },
  }),
};
