/** @jsxRuntime classic */
/** @jsx jsx */
import { useRef } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { PageContainer } from '@keystone-next/keystone/admin-ui/components';
import { jsx, Heading, Stack, Text } from '@keystone-ui/core';
import { Button } from '@keystone-ui/button';
import stringify from 'csv-stringify/lib/sync';

export default function CustomPage() {
  const downloadLink = useRef();
  const apolloClient = useApolloClient();

  const handleFileDownload = async () => {
    const {
      data: { tasks },
    } = await apolloClient.query({ query: GET_TASKS, variables: { where: {} }, fetchPolicy: 'no-cache' });

    const records = [['label', 'priority', 'isComplete', 'assignedTo', 'finishBy']];
    tasks.forEach((task) =>
      records.push([task.label, task.priority, task.isComplete ? 'TRUE' : 'FALSE', task.assignedTo.id, task.finishBy])
    );

    const data = stringify(records);
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + data);

    downloadLink.current.setAttribute('href', encodedUri);
    downloadLink.current.setAttribute('download', `tasks-${new Date().toISOString()}.csv`);
    downloadLink.current.click();
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
        <Button ref={downloadLink} as="a" css={{ display: 'none' }} />
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
