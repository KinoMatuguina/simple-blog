import React, {useContext} from 'react';
import Drawer from '../HOC/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Form from '../Organisms/Form';
import { store } from '../Store/Store'
import { useHistory, useParams} from 'react-router-dom';

const useStyles = makeStyles({
    wrapper: {
        padding: 25,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const Create = () => {
    const classes = useStyles();
    const {state, dispatch} = useContext(store);
    let history = useHistory();
    let { id } = useParams();

    const initialFormData = () => {
        if (id) {
            let data = state.filter((curr) => {
                return curr.id == id
            })
            
            data = data[0]

            return data;
        } else {
            return {
                id: 0,
                name: "",
                title: "",
                content: ""
            }
        }
    }

    const handleSubmit = (form) => () => {
        dispatch({ payload: form, type: 'add'})
        history.push('/')
    }

    const handleEdit = (form) => () => {
        dispatch({type: 'edit', id: id, payload: form})
        history.push('/')
    }

    return (
        <div className={classes.wrapper}>
            <Form initialFormData={initialFormData} handleSubmit={(id) ? handleEdit : handleSubmit} />
        </div>
    )
}

export default Drawer(Create);