import { FC, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: []
};

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: FC<Props> = ( { children } ) => {

    const { enqueueSnackbar } = useSnackbar();

    const [ state, dispatch ] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE );

    useEffect( () => {

        refreshEntries();

    }, [] );

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>( '/entries' );
        dispatch( { type: '[Entry] Refresh-Data', payload: data } );
    };

    const addNewEntry = async ( description: string ) => {

        const { data } = await entriesApi.post<Entry>( '/entries', { description } );

        dispatch( { type: '[Entry] Add-Entry', payload: data } );

    };

    const updateEntry = async ( entry: Entry, showSanckbar = false ) => {

        try {

            const { data } = await entriesApi.put<Entry>( `/entries/${ entry._id }`, entry );

            dispatch( { type: '[Entry] Entry-Updated', payload: data } );

            if ( showSanckbar ) {

                enqueueSnackbar( 'Entrada Actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                } );

            }

        } catch ( error ) {

            console.log( { error } );

        }


    };

    return (
        <EntriesContext.Provider value={ {
            ...state,
            addNewEntry,
            updateEntry
        } }>
            { children }
        </EntriesContext.Provider>
    );
};