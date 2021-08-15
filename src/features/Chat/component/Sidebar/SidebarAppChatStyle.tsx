import { makeStyles } from "@material-ui/styles";

export default makeStyles({
    sidebar:{        
        backgroundColor: 'rgb(18, 15, 19)',
        height: '90vh',
        width: '100%',        
        color: 'white',
    },    
    backButton: {
        backgroundColor: 'rgb(18, 15, 19) !important',
        width: '100%',
        height: '6vh',
        boxShadow: 'rgb(11, 10, 15) 0px 3px',
        color: 'white',
        paddingLeft: '6%',
        zIndex: 0,
        
        justifyContent: 'flex-start  !important',
        textTransform: 'none',        
        '&:hover': {
            backgroundColor: 'rgb(18, 15, 19)',
            boxShadow: 'rgb(11, 10, 15) 0px 3px',
        }
    },
    searchField: {
        margin: '3vh 7.5% 3vh 7.5%',
        border: 'none',
        outline: 'none',        
        backgroundColor: 'rgb(60, 57, 63)',
        color: 'white',        
        height: '6vh',
        borderRadius: '10px',    
        display: 'flex',    
    },
    searchInput: {        
        border: 'none',
        outline: 'none',        
        backgroundColor: 'rgb(60, 57, 63)',
        color: 'white',                
        borderRadius: '10px',  
        width: '70%'      
    },
    searchIcon:{
        height: '6vh!important',
        marginLeft: '10px',
        color:'gray',        
    },
    listChanels: {
        height: '70vh',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '0.2em'
        },
        '&::-webkit-scrollbar-track': {
            
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3f51b5',            
        }               
    },
    chanelLink: {        
        display: 'flex  !important',        
        width: '85%  !important',
        margin: '3vh 7.5% 3vh 7.5%  !important',        
        padding: '5px 2px 5px 2px  !important',
        justifyContent: 'flex-start  !important',
        backgroundColor: 'rgb(18, 15, 19)  !important',        
        color: 'white',
        boxShadow: 'none !important ',
        textAlign: 'left',
        '&:hover': {
            backgroundColor: 'rgb(37, 35, 41)',    
            color: 'white',
        }
    },
    avatar: {
        backgroundColor: 'gray',
        padding: '.25em ',
        width: '12%',
        borderRadius: '5px',
        textTransform: 'uppercase',
        marginRight: '1em  !important',
        textAlign: 'center'
    },
})