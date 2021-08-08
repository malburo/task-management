import React, { useState } from 'react';
import { Box, Button, Slide, Typography} from '@material-ui/core';
import SidebarAppChatStyle from './SidebarAppChatStyle';
import ListRooms from '../ListRooms/ListRooms';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import SidebarAppChatFooter from '../SidebarFooter/SidebarAppChatFooter';

const SidebarAppChat: React.FC = () => {
    const [hideStatus, setHideStatus] = useState(true);
    const [idChanel, setIdChanel] = useState('0');
    
    const style = SidebarAppChatStyle();

    const getAvatar = (name: string) => {
        let lstName = name.split(' ');                
        return lstName.length > 1  ? lstName[0][0]+lstName[1][0] : lstName[0][0];
    }

    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        let chanel = e.currentTarget;
        setIdChanel((chanel as HTMLInputElement).value);
        setHideStatus(!hideStatus);
    }
    return (
        <React.Fragment>

            <div className={style.sidebar}>
                <Slide direction='right' timeout={{ enter: 400, exit: 200 }} in={hideStatus} unmountOnExit mountOnEnter>
                    <Box>
                        <Button
                            variant="contained"
                            className={style.backButton}
                        >
                            Chanels List
                        </Button>
                        <div className={style.searchField}>
                            <SearchIcon className={style.searchIcon}></SearchIcon>
                            <input type='text' placeholder='Search' className={style.searchInput}></input>
                        </div>
                        <div className={style.listChanels} >
                            <Button value={'kj13b124'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Chanel 3')}
                                </Typography>
                                Chanel 3
                            </Button>
                            <Button value={'mn7wtw0df7y9a'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Chanel 4')}
                                </Typography>
                                Chanel 4
                            </Button>
                            <Button value={'Frontend Developer'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Frontend Developer')}
                                </Typography>
                                Frontend Developer
                            </Button>
                            <Button value={'kj13b124'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Chanel 3')}
                                </Typography>
                                Chanel 3
                            </Button>
                            <Button value={'mn7wtw0df7y9a'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Chanel 4')}
                                </Typography>
                                Chanel 4
                            </Button>
                            <Button value={'Frontend Developer'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Frontend Developer')}
                                </Typography>
                                Frontend Developer
                            </Button>
                            <Button value={'kj13b124'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Chanel 3')}
                                </Typography>
                                Chanel 3
                            </Button>
                            <Button value={'mn7wtw0df7y9a'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Chanel 4')}
                                </Typography>
                                Chanel 4
                            </Button>
                            <Button value={'Frontend Developer'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Frontend Developer')}
                                </Typography>
                                Frontend Developer
                            </Button>
                            <Button value={'kj13b124'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Chanel 3')}
                                </Typography>
                                Chanel 3
                            </Button>
                            <Button value={'mn7wtw0df7y9a'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Chanel 4')}
                                </Typography>
                                Chanel 4
                            </Button>
                            <Button value={'Frontend Developer'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Frontend Developer')}
                                </Typography>
                                Frontend Developer
                            </Button>
                            <Button value={'kj13b124'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Chanel 3')}
                                </Typography>
                                Chanel 3
                            </Button>
                            <Button value={'mn7wtw0df7y9a'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Chanel 4')}
                                </Typography>
                                Chanel 4
                            </Button>
                            <Button value={'Frontend Developer'} variant="contained" className={style.chanelLink} onClick={clickHandler}>
                                <Typography variant="subtitle1" className={style.avatar}>
                                    {getAvatar('Frontend Developer')}
                                </Typography>
                                Frontend Developer
                            </Button>
                        </div>

                    </Box>
                </Slide>
                <Slide direction='left' timeout={{ enter: 400, exit: 0 }} in={!hideStatus} unmountOnExit mountOnEnter>
                    <Box>
                        <Button
                            variant="contained"
                            className={style.backButton}
                            onClick={() => setHideStatus(!hideStatus)}
                            startIcon={<ArrowBackIosIcon></ArrowBackIosIcon>}
                        >
                            All Chanels
                        </Button>
                        <ListRooms idChanel={idChanel} />
                    </Box>
                </Slide>
            </div>            
            <SidebarAppChatFooter />
        </React.Fragment>

    );
}

export default SidebarAppChat;
