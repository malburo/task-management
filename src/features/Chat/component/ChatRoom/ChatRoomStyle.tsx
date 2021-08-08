import { makeStyles } from "@material-ui/styles";

export default makeStyles({
    chatRoom: {        
        backgroundColor: 'rgb(37, 35, 41)',        
        height: '80vh',
        width: '100%',        
        color: 'white',
        overflowY: 'scroll',        
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3f51b5',            
        }

    },
    roomHeader: {
        backgroundColor: 'rgb(37, 35, 41) !important',
        width: '100%',
        height: '6vh',        
        boxShadow: 'rgb(31, 30, 35) 0px 3px',        
        color: 'white',
        paddingLeft: '6%',        
        zIndex: 1
    },
    roomTitle: {
        height: '6vh',
        lineHeight: '6vh',
    },
    messageSender: {        
        height: '14vh',          
        width: '100%',   
        backgroundColor: 'rgb(37, 35, 41)',    
        display: 'block'
    },
    messageInput: { 
        marginTop: '4vh',
        marginLeft: '5%',
        width: '90%',  
        backgroundColor: 'rgb(60, 57, 63)',        
        height: '6vh',        
        display: 'inline-block',        
        borderRadius: '10px',        
        overflow: 'hidden',
    },
    messageField: {                 
        display: 'flex',
        justifyContent: 'space-between',        
    },
    messageTextField: {        
        border: 'none',
        outline: 'none',
        width: '90%',
        backgroundColor: 'rgb(60, 57, 63)',
        color: 'white',
        paddingLeft: '1%'
    },
    messageSubmit: {
        height: '5vh',
        width: '5vh',        
        borderRadius: '10px',
        marginRight: '.5vh',
        marginTop: '.5vh',
    }
})