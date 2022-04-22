import { EntriesState } from './';
import { Entry } from '../../interfaces';

type EntriesAction =
    | { type: '[Entry] Add-Entry'; payload: Entry; }
    | { type: '[Entry] Entry-Updated'; payload: Entry; };

export const entriesReducer = ( state: EntriesState, action: EntriesAction ): EntriesState => {

    switch ( action.type ) {
        case '[Entry] Add-Entry':
            return {
                ...state,
                entries: [ ...state.entries, action.payload ]
            };

        case '[Entry] Entry-Updated':
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if ( entry._id === action.payload._id ) {
                        return action.payload;
                    }
                    return entry;
                } )
            };

        default:
            return state;
    }

};