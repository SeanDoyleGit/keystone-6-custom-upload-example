/** @jsxRuntime classic */
/** @jsx jsx */
import { gql, useApolloClient } from '@apollo/client';
import { PageContainer } from '@keystone-next/keystone/admin-ui/components';
import { jsx, Heading, Stack, Text } from '@keystone-ui/core';
import { Button } from '@keystone-ui/button';
import stringify from 'csv-stringify/lib/sync';

export default function CustomPage() {
  const apolloClient = useApolloClient();

  const handleFileDownload = async () => {
    const {
      data: { tasks },
    } = await apolloClient.query({ query: GET_TASKS, variables: { where: {} } });

    const records = [['label', 'priority', 'isComplete', 'assignedTo', 'finishBy']];
    tasks.forEach((task) =>
      records.push([task.label, task.priority, task.isComplete ? 'TRUE' : 'FALSE', task.assignedTo.id, task.finishBy])
    );

    const data = stringify(records);
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + data);

    const element = document.createElement('a');
    element.setAttribute('href', encodedUri);
    element.setAttribute('download', `tasks-${new Date().toISOString()}.csv`);
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  };

  return (
    <PageContainer header={<Heading type="h3">Download Tasks (.csv)</Heading>}>
      <Stack gap="small" paddingY="large" align="left">
        <Heading type="h1">Download Tasks</Heading>
        <Text>Export all tasks into a .csv file</Text>
        <Text>The file will have the headings "label", "priority", "isComplete", "assignedTo", and "finishBy"</Text>
      </Stack>
      <Stack gap="small">
        <Button onClick={handleFileDownload}>Download Tasks</Button>
      </Stack>
    </PageContainer>
  );
}

const GET_TASKS = gql`
  query GetTasks($where: TaskWhereInput!) {
    tasks(where: $where) {
      label
      priority
      isComplete
      assignedTo {
        id
      }
      finishBy
    }
  }
`;
