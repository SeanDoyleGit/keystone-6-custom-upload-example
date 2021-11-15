import React from 'react';
import { NavItem, ListNavItems, NavigationContainer } from '@keystone-next/keystone/admin-ui/components';
import { Divider } from '@keystone-ui/core';

export function CustomNavigation({ lists, authenticatedItem }) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <Divider marginY="small" />
      <NavItem href="/upload-tasks">Upload Tasks</NavItem>
      <NavItem href="/download-tasks">Download Tasks</NavItem>
      <Divider marginY="small" />
      <ListNavItems lists={lists} />
    </NavigationContainer>
  );
}
