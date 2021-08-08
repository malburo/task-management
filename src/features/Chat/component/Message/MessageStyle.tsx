import { makeStyles } from "@material-ui/styles";

export default makeStyles({
    message: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        marginTop: '4vh',
        marginBottom: '4vh',
        paddingLeft: '6%',
        paddingRight: '30%'            
    },
    avatar:{
        height: '5vh',        
        marginRight: '2%'
    },
    avatarImg: {
        height: '5vh',
        width: '5vh',  
        borderRadius: '5px'  
    },
    accountInfor: {
        display: 'flex',
        height: '20px',
        marginBottom: '1%'
    },
    name: {
        margin: '0 3% 0 2%'
    },
    messageContent: {        
        backgroundColor: 'black',
        padding: '1rem',
        borderRadius: '20px',     
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    }
})