/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { PageContainer } from '@keystone-next/keystone/admin-ui/components';
import { jsx, Heading, Stack, Text } from '@keystone-ui/core';
import { Button } from '@keystone-ui/button';
import { useToasts } from '@keystone-ui/toast';

import { FileInput } from '../components/FileInput';

export default function CustomPage() {
  const [file, setFile] = useState();
  const [uploadFile] = useMutation(CREATE_FILE_UPLOAD);
  const { addToast } = useToasts();

  const handleFileChange = (value) => {
    setFile(value);
  };

  const handleFileUpload = async () => {
    try {
      await uploadFile({ variables: { data: { file: { upload: file } } } });
      addToast({ title: 'Successfully uploaded tasks', tone: 'positive' });
      setFile(null);
    } catch (err) {
      addToast({ title: err.message, tone: 'negative' });
    }
  };

  return (
    <PageContainer header={<Heading type="h3">Upload Tasks (.csv)</Heading>}>
      <Stack gap="small" paddingY="large" align="left">
        <Heading type="h1">Upload Tasks</Heading>
        <Text>Upload a .csv file containing the tasks you with to upload.</Text>
        <Text>Make sure the file has the headings "label", "priority", "isComplete", "assignedTo", and "finishBy"</Text>
      </Stack>
      <Stack gap="small">
        <FileInput accept=".csv" value={file} onChange={handleFileChange} />
        <Button isDisabled={!file} onClick={handleFileUpload}>
          Upload Tasks
        </Button>
      </Stack>
    </PageContainer>
  );
}

const CREATE_FILE_UPLOAD = gql`
  mutation ($data: TaskUploadCreateInput!) {
    createTaskUpload(data: $data) {
      file {
        filename
      }
    }
  }
`;
