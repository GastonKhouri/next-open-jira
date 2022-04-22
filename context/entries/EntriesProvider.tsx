import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: Labore elit aute dolor proident et tempor aliqua consectetur.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'En-progreso: Lorem nulla ullamco anim aliqua.',
            status: 'in-progress',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'Finalizado: Nostrud et sit mollit minim amet tempor officia est ex dolore laborum pariatur.',
            status: 'finished',
            createdAt: Date.now()
        },
    ]
};

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: FC<Props> = ( { children } ) => {

    const [ state, dispatch ] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE );

    const addNewEntry = ( description: string ) => {

        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            status: 'pending',
            createdAt: Date.now()
        };

        dispatch( { type: '[Entry] Add-Entry', payload: newEntry } );

    };

    const updateEntry = ( entry: Entry ) => {
        dispatch( { type: '[Entry] Entry-Updated', payload: entry } );
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