## Custom Upload/Download pages for the Admin UI in Keystone 6

This project is forked from the [Custom Admin UI Pages](https://github.com/keystonejs/keystone/tree/main/examples/custom-admin-ui-pages) project.

It demonstrates how to build a custom Upload Tasks page and a custom Download Tasks page in the Admin UI for Keystone 6.

It builds on the [Task Manager](../task-manager) starter project.

### Upload Tasks Page

Navigate to [localhost:3000/upload-tasks](localhost:3000/upload-tasks)

The upload tasks page allows you to create large number of tasks by uploading `.csv` file. The `.csv` file needs to have the headings `label`, `priority`, `isComplete`, `assignedTo`, and `finishBy`.

All files that are uploaded added to the `TaskUpload` list and are stored locally under `public/files`.

### Download Tasks Page

Navigate to [localhost:3000/download-tasks](localhost:3000/download-tasks)

The download tasks page allows you to export all the tasks that are stored in the database into `.csv` file . The `.csv` file will have the headings `label`, `priority`, `isComplete`, `assignedTo`, and `finishBy`.

## Instructions

To run this project, clone the Keystone repository locally then navigate to this directory and run:

```shell
yarn dev
```

This will start the Admin UI at [localhost:3000](http://localhost:3000).

You can use the Admin UI to create items in your database.

You can also access a GraphQL Playground at [localhost:3000/api/graphql](http://localhost:3000/api/graphql), which allows you to directly run GraphQL queries and mutations.

🚀 Congratulations, you're now up and running with Keystone!
