import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import MyCard from '../../../components/MyCard/MyCard';
import MyLoader from '../../../components/MyLoader/MyLoader';
import MyTable from '../../../components/MyTable/MyTable';

export default function DataAdministration(props) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleLeftButtonClick = (tabLabels) => {
    const newTab = currentTab === 0 ? tabLabels.length - 1 : currentTab - 1;
    setCurrentTab(newTab);
  };

  const handleRightButtonClick = (tabLabels) => {
    const newTab = currentTab === tabLabels.length - 1 ? 0 : currentTab + 1;
    setCurrentTab(newTab);
  };
  return (
    <MyCard sx={{ width: '100%' }}>
      {props.dataAdministration.map((value, adminIndex) => (
        <Box sx={{ width: '100%' }} key={adminIndex}>
          {value.nameAdministration === props.type &&
          value.tabsInformation.length > 0 ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'between',
                }}
              >
                {value.needMoveTabs && (
                  <IconButton
                    onClick={() => handleLeftButtonClick(value.tabsInformation)}
                  >
                    <ArrowLeftIcon />
                  </IconButton>
                )}
                <Tabs
                  sx={{
                    width: '90%',
                    justifyContent: 'center',
                  }}
                  value={currentTab}
                  onChange={(event, newValue) =>
                    handleTabChange(event, newValue)
                  }
                >
                  {value.tabsInformation.map((label, labelIndex) => (
                    <Tab
                      label={label.tabLabel}
                      id={`settings-tab-${labelIndex}`}
                      key={labelIndex}
                    />
                  ))}
                </Tabs>
                {value.needMoveTabs && (
                  <IconButton
                    onClick={() =>
                      handleRightButtonClick(value.tabsInformation)
                    }
                  >
                    <ArrowRightIcon />
                  </IconButton>
                )}
              </Box>
              {value.tabsInformation.map((tabValue, tabIndex) => (
                <div
                  hidden={currentTab !== tabIndex}
                  id={`settings-tab-${tabIndex}`}
                  key={tabIndex}
                >
                  {currentTab === tabIndex && (
                    <Box
                      sx={{
                        p: 3,
                      }}
                    >
                      {value.buttonCreateName !== null && (
                        <Stack
                          spacing={2}
                          direction="row-reverse"
                          sx={{
                            mb: 2,
                          }}
                        >
                          <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={tabValue.eventButton}
                          >
                            {tabValue.buttonCreateName}
                          </Button>
                        </Stack>
                      )}
                      {props.loading === true && <MyLoader />}
                      {props.loading === false && (
                        <MyTable
                          title={tabValue.title}
                          columns={tabValue.columns}
                          rows={tabValue.rows}
                        />
                      )}
                    </Box>
                  )}
                </div>
              ))}
            </>
          ) : (
            <>
              {value.nameAdministration === props.type && (
                <div id="settings-tabpanel-0">
                  <Box
                    sx={{
                      p: 3,
                    }}
                  >
                    {value.tableInformation.buttonCreateName !== null && (
                      <Stack
                        spacing={2}
                        direction="row-reverse"
                        sx={{
                          mb: 2,
                        }}
                      >
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={value.tableInformation.eventButton}
                        >
                          {value.tableInformation.buttonCreateName}
                        </Button>
                      </Stack>
                    )}
                    {props.loading === true && <MyLoader />}
                    {props.loading === false && (
                      <MyTable
                        title={value.tableInformation.title}
                        columns={value.tableInformation.columns}
                        rows={value.tableInformation.rows}
                      />
                    )}
                  </Box>
                </div>
              )}
            </>
          )}
        </Box>
      ))}
    </MyCard>
  );
}
