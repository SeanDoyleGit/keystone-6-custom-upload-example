/** @jsxRuntime classic */
/** @jsx jsx */
import { PageContainer } from '@keystone-next/keystone/admin-ui/components';
import { jsx, Heading } from '@keystone-ui/core';

export default function CustomPage() {
  return (
    <PageContainer header={<Heading type="h3">Custom Page</Heading>}>
      <h1 css={{ width: '100%' }}>
        Upload Tasks
      </h1>
      <p>
        It can be accessed via the route <a href="/custom-page">/custom-page</a>
      </p>
    </PageContainer>
  );
}

