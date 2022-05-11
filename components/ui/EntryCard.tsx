import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';

import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui/UIContext';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ( { entry } ) => {

    const { endDragging, startDragging } = useContext( UIContext );
    const router = useRouter();

    const onDragStart = ( e: React.DragEvent<HTMLDivElement> ) => {
        e.dataTransfer.setData( 'text', entry._id );
        startDragging();
    };

    const onDragEnd = ( e: React.DragEvent<HTMLDivElement> ) => {
        e.preventDefault();
        endDragging();
    };

    const onClick = () => {
        router.push( `/entries/${ entry._id }` );
    };

    return (
        <Card
            sx={ { marginBottom: 1 } }
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
            onClick={ onClick }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={ { whiteSpace: 'pre-line' } }>{ entry.description }</Typography>
                </CardContent>

                <CardActions sx={ { display: 'flex', justifyContent: 'end', paddingRight: 2 } }>
                    <Typography variant='body2'>{ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};
