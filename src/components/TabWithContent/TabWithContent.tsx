import { FC, ReactNode, SyntheticEvent, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { AppBar, Tab } from '@mui/material';

export interface TabWithContentProps {
  tabItems: {
    name: string;
    content: ReactNode;
  }[];
}

export const TabWithContent: FC<TabWithContentProps> = ({ tabItems }) => {
  const [currentTabValue, setCurrentTabValue] = useState('0');

  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    setCurrentTabValue(newValue);
  };

  return (
    <TabContext value={currentTabValue}>
      <AppBar position='static' color='transparent' elevation={0}>
        <TabList
          onChange={handleTabChange}
          aria-label='tabs'
          variant='scrollable'
        >
          {tabItems.map((tabItem, index) => (
            <Tab key={index} label={tabItem.name} value={index.toString()} />
          ))}
        </TabList>
      </AppBar>
      {tabItems.map((tabItem, index) => (
        <TabPanel key={index} value={index.toString()}>
          {tabItem.content}
        </TabPanel>
      ))}
    </TabContext>
  );
};
