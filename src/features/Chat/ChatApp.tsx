import { Drawer, Hidden } from '@material-ui/core';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChatRoom from './component/ChatRoom/ChatRoom';
import SidebarAppChat from './component/Sidebar/SidebarAppChat';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    chatRoom: {
      // eslint-disable-next-line
      ['@media (min-width:780px)']: {
        width: '80%',
        marginLeft: '20%',
      },
      // eslint-disable-next-line
      ['@media (max-width:780px)']: {
        width: '100%',
        marginLeft: '0%',
      },
    },
    sideBarLarge: {
      width: '20%',
      border: 'none !important',
    },
    sideBarSmall: {
    width: '100%',
    border: 'none !important',
  },
    background: {
      '& > .MuiBackdrop-root': {
        backgroundColor: 'transparent !important',
      },
    },
    floatingButton: {
      position: 'absolute',
      border: 'none',
      height: '6vh',
      width: '20%',
      left: '80%',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      color: 'white',
      '&:hover': {
        backgroundColor: 'red!important',
      },
    },
    floatingButtonLabel: {
      height: '100%',
    },
});

const ChatFeature: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anyRoom, setAnyRoom] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    if (!anyRoom) setSidebarOpen(true);
  }, [anyRoom]);
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* For Small Size */}
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            className={styles.background}
            open={sidebarOpen}
            classes={{ paper: styles.sideBarSmall, root: styles.background }}
          >
            <SidebarAppChat setMenuState={setSidebarOpen} />
            {anyRoom && (
              <button className={styles.floatingButton} onClick={() => setSidebarOpen(false)}>
                <CloseIcon />
              </button>
            )}
          </Drawer>
        </Hidden>
        {/* For Large Size */}
        <Hidden mdDown>
          <Drawer variant="permanent" anchor="left" classes={{ paper: styles.sideBarLarge }}>
            <SidebarAppChat setMenuState={setSidebarOpen} />
          </Drawer>
        </Hidden>

        <div className={styles.chatRoom}>
          <Switch>
            <Route exact path="/appchat/room/:id">
              <ChatRoom setMenuState={setSidebarOpen} setAnyRoomState={setAnyRoom} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default ChatFeature;
