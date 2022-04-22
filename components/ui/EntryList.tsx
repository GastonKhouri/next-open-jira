import { Paper, List } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

import { EntryCard } from './';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ( { status } ) => {

    const { entries, updateEntry } = useContext( EntriesContext );
    const { isDragging, endDragging } = useContext( UIContext );

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ] );

    const allowDrop = ( e: React.DragEvent<HTMLDivElement> ) => {
        e.preventDefault();
    };

    const onDropEntry = ( e: React.DragEvent<HTMLDivElement> ) => {

        const entryId = e.dataTransfer.getData( 'text' );

        if ( entryId ) {
            const entry = entries.find( entry => entry._id === entryId );
            if ( entry ) {
                entry.status = status;
                updateEntry( entry );
            }
        }

        endDragging();

    };

    return (
        <div
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className={ isDragging ? styles.dragging : '' }
        >
            <Paper
                sx={ {
                    height: 'calc(100vh - 160px)',
                    overflow: 'scroll',
                    backgroundColor: 'transparent',
                    padding: '3px 5px',
                    '&::-webkit-scrollbar': { display: 'none' }
                } }>

                <List sx={ { opacity: isDragging ? 0.2 : 1, transition: 'all .3s' } }>
                    {
                        entriesByStatus.map( entry => (
                            <EntryCard key={ entry._id } entry={ entry } />
                        ) )
                    }
                </List>

            </Paper>
        </div>
    );
};
