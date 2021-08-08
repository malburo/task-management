import { Box, Drawer } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChatAppStyle from './ChatAppStyle';
import ChatRoom from "./component/ChatRoom/ChatRoom";
import SidebarAppChat from './component/Sidebar/SidebarAppChat';


const ChatFeature: React.FC = () => {
    const style = ChatAppStyle();
    return (
        <React.Fragment>
            <BrowserRouter>
                <Drawer
                  variant="permanent"
                  anchor="left"
                  className={style.sideBar}
                  classes={{paper: style.sideBar}}
                >
                    <SidebarAppChat />
                </Drawer>                    
                <Box className={style.chatRoom}>
                    <Switch>
                        <Route exact path='/appchat/room/:id' component={ChatRoom}>
                        </Route>
                    </Switch>
                </Box>


            </BrowserRouter>
        </React.Fragment>
    );
}

export default ChatFeature;
