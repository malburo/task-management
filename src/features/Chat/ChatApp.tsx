import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatRoom from './component/ChatRoom/ChatRoom';
import SidebarAppChat from './component/Sidebar/SidebarAppChat';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { setMenuOpen } from './ReduxSlice/SidebarAppChatSlice';
import { Hidden } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  chatRoom: {
    // eslint-disable-next-line
    ['@media (min-width: 900px)']: {
      width: '80%',
      marginLeft: '20%',
    },
    // eslint-disable-next-line
    ['@media (max-width: 900px)']: {
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
  const dispatch = useDispatch<AppDispatch>();
  const [anyRoom, menuOpen] = useSelector((state: RootState) => [state.appchatUI.anyRoom, state.appchatUI.menuOpen]);
  const styles = useStyles();

  return (
    <React.Fragment>
      {/* For Small Size */}
      <Hidden smUp>
        <Drawer
          variant="temporary"
          anchor="left"
          className={styles.background}
          open={menuOpen}
          classes={{ paper: styles.sideBarSmall, root: styles.background }}
        >
          <SidebarAppChat />
          {anyRoom && (
            <button className={styles.floatingButton} onClick={() => dispatch(setMenuOpen(false))}>
              <CloseIcon />
            </button>
          )}
        </Drawer>
      </Hidden>
      {/* For Large Size */}
      <Hidden mdDown>
        <Drawer variant="permanent" anchor="left" classes={{ paper: styles.sideBarLarge }}>
          <SidebarAppChat />
        </Drawer>
      </Hidden>

      <div className={styles.chatRoom}>
        <Switch>
          <Route exact path="/appchat/room/:id">
            <ChatRoom />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default ChatFeature;
