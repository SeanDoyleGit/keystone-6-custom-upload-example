/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from 'react';
import { PageContainer } from '@keystone-next/keystone/admin-ui/components';
import { jsx, Heading } from '@keystone-ui/core';
import { Button } from '@keystone-ui/button';
import { gql, useMutation } from '@apollo/client';

import { FileInput } from '../components/FileInput';

export default function CustomPage() {
  const [file, setFile] = useState();
  const [uploadFile] = useMutation(CREATE_FILE_UPLOAD)

  const handleFileChange = (value) => {
    setFile(value);
  }

  const handleFileUpload = async () => {
    console.log('handleFileUpload', file);
    await uploadFile({ variables: { data: { file: { upload: file } } } });
  };

  return (
    <PageContainer header={<Heading type="h3">Custom Page</Heading>}>
      <h1 css={{ width: '100%' }}>
        Upload Tasks
      </h1>
      <FileInput value={file} onChange={handleFileChange} />
      <Button onClick={handleFileUpload}>Upload File</Button>
      <p>
        It can be accessed via the route <a href="/custom-page">/custom-page</a>
      </p>
    </PageContainer>
  );
}

const CREATE_FILE_UPLOAD = gql`
  mutation($data: FileUploadCreateInput!) {
    createFileUpload(data: $data) {
      file {
        filename
      }
    }
  }
`;
