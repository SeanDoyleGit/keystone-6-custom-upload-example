import React from 'react';
import {
  NavItem,
  ListNavItems,
  NavigationContainer,
} from '@keystone-next/keystone/admin-ui/components';

export function CustomNavigation({ lists, authenticatedItem }) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists} />
      <NavItem href="/custom-page">Custom Page</NavItem>
    </NavigationContainer>
  );
}
