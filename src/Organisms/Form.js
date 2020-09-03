import React, { useState, useRef } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    card: {
        width: '100%',
        maxWidth: 600,
        padding: 20
    },
    form: {
        width: '100%',
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        marginBottom: 10
    },
    button: {
        color: '#FFF'
    }
})


const Form = (props) => {
    const classes = useStyles();
    const form = useRef(null);
    const [formData, setFormData] = useState(props.initialFormData);

    const handlefields = (field) => (event) => {
        setFormData({...formData, [field]: event.target.value, id: Math.floor(Math.random() * 1000000000)})
    }

    return (
        <Card className={classes.card} >
            <ValidatorForm ref={form} onSubmit={props.handleSubmit(formData)} className={classes.form} onError={errors => console.log(errors)}>
                <TextValidator inputProps={{ maxLength: 30 }} onChange={handlefields('title')} value={formData.title} id="title" fullWidth={true} label="Title" name="title" className={classes.textField} validators={['required']} errorMessages={['this field is required']} />
                <TextValidator inputProps={{ maxLength: 30 }} onChange={handlefields('name')} value={formData.name} id="name" fullWidth={true} label="Name" name="name" className={classes.textField} validators={['required']} errorMessages={['this field is required']} name="true" />
                <TextValidator
                    fullWidth={true}
                    id="content"
                    label="Content"
                    name="content"
                    multiline
                    rows={5}
                    value={formData.content}
                    onChange={handlefields('content')}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    className={classes.textField}
                />

                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Submit
                </Button>
            </ValidatorForm>
        </Card>
        
    )
}

export default Form