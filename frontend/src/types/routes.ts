import React from 'react';

export interface RouteEntry {
  path: string;
  exact?: boolean;
  component: React.FunctionComponent;
}
