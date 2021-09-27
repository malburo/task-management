import { Drawer, Hidden } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChatRoom from './component/ChatRoom/ChatRoom';
import SidebarAppChat from './component/Sidebar/SidebarAppChat';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { setMenuOpen } from './ReduxSlice/SidebarAppChatSlice';

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
  const dispatch = useDispatch<AppDispatch>();
  const [anyRoom, menuOpen] = useSelector((state: RootState) => [state.appchatUI.anyRoom, state.appchatUI.menuOpen]);
  const styles = useStyles();

  return (
    <React.Fragment>
      <BrowserRouter>
        {/* For Small Size */}
        <Hidden mdUp>
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
      </BrowserRouter>
    </React.Fragment>
  );
};

export default ChatFeature;
