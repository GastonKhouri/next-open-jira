import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {

    const { addNewEntry } = useContext( EntriesContext );
    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext );

    const [ inputValue, setInputValue ] = useState( '' );
    const [ touched, setTouched ] = useState( false );

    const onTextFieldChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( e.target.value );
    };

    const onSave = () => {

        if ( inputValue.length <= 0 ) return;

        addNewEntry( inputValue );
        setInputValue( '' );
        setIsAddingEntry( false );
        setTouched( false );

    };

    const onCancel = () => {

        setIsAddingEntry( false );
        setInputValue( '' );

    };

    return (
        <Box sx={ { marginBottom: 2, paddingX: 2 } }>

            {
                isAddingEntry
                    ? (
                        <>
                            <TextField
                                fullWidth
                                sx={ { marginTop: 2, marginBottom: 1 } }
                                placeholder='Nueva entrada'
                                autoFocus
                                multiline
                                label='Nueva entrada'
                                helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
                                error={ inputValue.length <= 0 && touched }
                                value={ inputValue }
                                onChange={ onTextFieldChange }
                                onBlur={ () => setTouched( true ) }
                            />

                            <Box display='flex' justifyContent='space-between'>

                                <Button
                                    variant='text'
                                    onClick={ onCancel }
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    endIcon={ <SaveOutlinedIcon /> }
                                    onClick={ onSave }
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </>
                    )
                    : (
                        <Button
                            fullWidth
                            variant='outlined'
                            startIcon={ <AddIcon /> }
                            onClick={ () => setIsAddingEntry( true ) }
                        >
                            Agregar Tarea
                        </Button>
                    )
            }

        </Box>
    );
};
