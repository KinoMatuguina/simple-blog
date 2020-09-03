import React, {useContext, useState} from 'react';
import Drawer from '../HOC/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import BlogCard from '../Organisms/BlogCard'
import {store} from '../Store/Store';
import { useHistory, useParams } from 'react-router-dom';
import { red } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ConfirmationDialog from '../Organisms/ConfirmationDialog'

const useStyles = makeStyles({
    wrapper: {
        padding: 25,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    grid: {
        display: 'flex',
        justifyContent: "center"
    },
    card: {
        width: '100%',
        alignItems: 'center',
        maxWidth: 600,
        paddingBottom: 64,
        justifyContent: 'center',
        position: 'relative',
      },
      avatar: {
        backgroundColor: red[500],
      },
      actions: {
        position: 'absolute',
        bottom:0,
        left: 0
      },
      content: {
        overflowWrap: 'anywhere'
      },
      fab: {
        right: 20,
        position: 'fixed',
        bottom: 20,
        color: '#FFF'
      }
})

const View = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(store);
    const [dialog, setDialog] = useState(false);
    let history = useHistory()
    let { id } = useParams();
    let data = state.filter((curr) => {
        return curr.id == id
    })

    data = data[0]
    
    const onEdit = () => {
        history.push(`/create/${id}`);
    }

    const handleDelete = () => {
        dispatch({type: 'delete', id: id})
        history.push(`/`);
    }

    const handleCreate = () => {
        history.push(`/create`);
    }

    const handleToggle = () => {
        setDialog(!dialog)
    }


    return (
        <div className={classes.wrapper}>
            <ConfirmationDialog 
                open={dialog}
                handleClose={handleToggle}
                text={`Deleting this blog will permanently remove it. Are you sure you want to remove this?`}
                handleNo={handleToggle}
                btnNoText={`No, Keep the blog`}
                handleYes={handleDelete}
                btnYesText={`Yes, Delete blog`}
            />
            <Grid container spacing={3} justify="center">
               <Grid key={id} item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
                    <BlogCard overflowWrap={true} singlePost={classes.card} onEdit={() => onEdit()} onDelete={handleToggle} name={data.name} title={data.title} content={data.content} />
                </Grid>
            </Grid>
            <Fab color="primary" onClick={handleCreate} aria-label="add" className={classes.fab}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default Drawer(View);