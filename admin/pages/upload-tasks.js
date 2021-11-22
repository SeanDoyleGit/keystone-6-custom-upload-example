/** @jsxRuntime classic */
/** @jsx jsx */
import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { PageContainer } from '@keystone-next/keystone/admin-ui/components';
import { Button } from '@keystone-ui/button';
import { jsx, Heading, Stack, Text } from '@keystone-ui/core';
import { Notice } from '@keystone-ui/notice';
import { useToasts } from '@keystone-ui/toast';
import parse from 'csv-parse/lib/sync';

import { FileInput } from '../components/FileInput';

function validateFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileData = new Uint8Array(e.target.result);
      const data = parse(fileData);

      const errors = [];
      const headings = data[0];

      ['label', 'priority', 'isComplete', 'assignedTo', 'finishBy'].forEach((headingName) => {
        if (!headings.find((heading) => heading === headingName)) {
          errors.push(`Error: File is missing heading "${headingName}"`);
        }
      });

      headings.forEach((heading) => {
        if (!['label', 'priority', 'isComplete', 'assignedTo', 'finishBy'].includes(heading)) {
          errors.push(`Error: Found invalid heading "${heading}"`);
        }
      });

      resolve(errors);
    };
    reader.readAsArrayBuffer(file);
  });
}

export default function CustomPage() {
  const [file, setFile] = useState();
  const [errors, setErrors] = useState([]);
  const [uploadFile] = useMutation(CREATE_FILE_UPLOAD);
  const { addToast } = useToasts();

  useEffect(() => {
    setErrors([]);
  }, [file]);

  const handleFileChange = (value) => {
    setFile(value);
  };

  const handleFileUpload = async () => {
    try {
      const fileErrors = await validateFile(file);
      if (fileErrors.length) {
        setErrors(fileErrors);
        return;
      }

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
        <Button isDisabled={!file || errors.length} onClick={handleFileUpload}>
          Upload Tasks
        </Button>
        {errors && (
          <Stack gap="small">
            {errors.map((error) => (
              <Notice tone="negative" key={error}>
                {error}
              </Notice>
            ))}
          </Stack>
        )}
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
