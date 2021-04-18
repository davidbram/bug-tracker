import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBugs } from '../../Controllers/Redux/bugSlice';
import BugCard from '../Components/Bug Card/bugCard';
import BugView from '../Components/Bug view/bugView.jsx';
import bugModel from '../../Models/bugModel';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const BUG_TRACKER_SERVER = process.env.REACT_APP_BUG_TRACKER_SERVER;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="page-container" style={{ position: 'static' }}>
      <AppBar
        position="static"
        style={{
          backgroundColor: '#264e70',
          width: 330,
          height: 50,
          position: 'absolute',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Open Bugs" style={{ position: 'static' }} />
          <Tab label="Completed Bugs" style={{ position: 'static' }} />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        position="static"
        style={{ paddingTop: 50 }}
      >
        <SortedBugs mode="open" />
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        position="static"
        style={{ paddingTop: 50 }}
      >
        <SortedBugs mode="completed" />
      </TabPanel>
    </div>
  );
};

function SortedBugs(props) {
  const [bugs, setBugs] = useState([]);

  const [DISPLAY_BUG, SET_DISPLAY_BUG] = useState({
    name: '',
    isDisplayed: false,
  });

  useEffect(() => {
    axios.get(BUG_TRACKER_SERVER + '/api/bug').then((response) => {
      var data = response.data.map((bug) => new bugModel(bug));
      data = data.filter((bug) => bug.status == props.mode);
      const sorted = data.sort((a, b) => {
        return a.priority - b.priority;
      });
      setBugs(sorted);
    });
  }, []);

  useEffect(() => {
    axios.get(BUG_TRACKER_SERVER + '/api/bug').then((response) => {
      var data = response.data.map((bug) => new bugModel(bug));
      data = data.filter((bug) => bug.status == props.mode);
      const sorted = data.sort((a, b) => {
        return a.priority - b.priority;
      });
      setBugs(sorted);
    });
  }, [bugs.length]);

  // useEffect(()=> {
  //     dispatch(getBugs("/api/bug"));
  // },[bugs.length < 1]);

  function BugClicked(name) {
    SET_DISPLAY_BUG({
      isDisplayed: !DISPLAY_BUG.isDisplayed,
      name: name,
    });
  }

  return (
    <div className="page-container">
      {bugs.map((bug, key) => (
        <BugCard key={key} bug={bug} clicked={BugClicked} />
      ))}
      {DISPLAY_BUG.isDisplayed && (
        <BugView
          clicked={BugClicked}
          bug={bugs.filter((bug) => bug.name === DISPLAY_BUG.name)[0]}
        />
      )}
    </div>
  );
}
