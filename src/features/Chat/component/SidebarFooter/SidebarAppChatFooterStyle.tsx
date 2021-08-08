import { makeStyles } from "@material-ui/styles";

export default makeStyles({
    profileButton: {        
        backgroundColor: 'rgb(10, 7, 9)',        
        padding: '0',
        borderRadius: '0',
        width: '20vw',
        height: '10vh',
        zIndex: 0,
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'flex-start',
        textTransform: 'none', 
        overflow: 'hidden',       
        '&:hover': {
            backgroundColor: 'rgb(10, 7, 9)',             
        }
    },
    profileOptionList: {    
        backgroundColor: 'rgb(37, 35, 41)',
        borderRadius: '10px',
        padding: '5px'
    },
    profileOptionIcon: {
        marginRight: '0.5em'
    },
    profileOptionHr: {
        height: '.5px',
        backgroundColor:'gray',
        border: 'none',
        width:'80%',
        marginLeft: '10%'
    },
    profileNormalOptionItem: {
        color:'white', 
        padding: '10px',
        margin: '0 10px 0 10px',      
        borderRadius: '10px',   
        '&:hover': {
            backgroundColor: 'rgb(57, 55, 61)',
        }       
    },
    profileLogOutOptionItem: {
        color:'red', 
        padding: '10px',
        margin: '0 10px 0 10px',
        borderRadius: '10px',           
        '&:hover': {
            backgroundColor: 'rgb(57, 55, 61)',
        }       
    },
    avatarImg: {      
        marginLeft: '7.5%',  
        height: '6vh',
        width: '6vh',  
        borderRadius: '5px'
    },
    roomName: {        
        lineHeight: '6vh',
        marginLeft: '5%',
        color: 'white'
    }
})