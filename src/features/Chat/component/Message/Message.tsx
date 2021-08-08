
import React from "react";
import MessageStyle from "./MessageStyle";
import Typography from '@material-ui/core/Typography'

interface IMessagePros {
    name: string,
    postedDate: string,
    content: string
}

const Message: React.FC<IMessagePros> = ({name, postedDate, content}) => {
    const style = MessageStyle();
    return (
        <React.Fragment>
            <div className={style.message}>
                <div className={style.avatar}>
                    <img className={style.avatarImg} alt='none' src="https://znews-photo.zadn.vn/w660/Uploaded/ngogtn/2021_04_25/avatar_movie_Cropped.jpg"></img>
                </div>
                <div>
                    <div className={style.messageContent}>
                        <Typography variant="body2" color="initial">{content}</Typography>
                    </div>
                    <div className={style.accountInfor}>
                        <Typography variant="subtitle2" className={style.name}>{name}</Typography>
                        <Typography variant="subtitle2">{postedDate}</Typography>
                    </div>
                    
                </div>
            </div>


        </React.Fragment>
    )
}

export default Message;