import { FC, useContext } from 'react';
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';

import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui/UIContext';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ( { entry } ) => {

    const { endDragging, startDragging } = useContext( UIContext );

    const onDragStart = ( e: React.DragEvent<HTMLDivElement> ) => {
        e.dataTransfer.setData( 'text', entry._id );
        startDragging();
    };

    const onDragEnd = ( e: React.DragEvent<HTMLDivElement> ) => {
        e.preventDefault();
        endDragging();
    };

    return (
        <Card
            sx={ { marginBottom: 1 } }
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={ { whiteSpace: 'pre-line' } }>{ entry.description }</Typography>
                </CardContent>

                <CardActions sx={ { display: 'flex', justifyContent: 'end', paddingRight: 2 } }>
                    <Typography variant='body2'>hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};
