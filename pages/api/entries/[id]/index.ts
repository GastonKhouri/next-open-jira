import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { EntryModel, IEntry } from '../../../../models';

type Data =
    | { message: string; }
    | IEntry;

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    // const { id } = req.query;

    // if ( !mongoose.isValidObjectId( id ) ) {
    //     return res.status( 400 ).json( { message: `The ID ${ id } is not valid` } );
    // }

    switch ( req.method ) {
        case 'GET':
            return getEntry( req, res );

        case 'PUT':
            return updateEntry( req, res );

        default:
            return res.status( 400 ).json( { message: 'Endpoint doesnt exist' } );
    }

}

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    try {

        await db.connect();

        const entryToUpdate = await EntryModel.findById( id );

        if ( !entryToUpdate ) {
            await db.disconnect();
            return res.status( 400 ).json( { message: `The entry with ID ${ id } does not exist` } );
        }

        const {
            description = entryToUpdate.description,
            status = entryToUpdate.status,
        } = req.body;

        const updatedEntry = await EntryModel.findByIdAndUpdate( id, {
            description,
            status,
        }, { runValidators: true, new: true } );

        await db.disconnect();

        return res.status( 200 ).json( updatedEntry! );

    } catch ( error: any ) {

        db.disconnect();
        console.log( error );

        return res.status( 400 ).json( { message: error.errors.status.message } );

    }

};

const getEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    try {

        await db.connect();

        const entry = await EntryModel.findById( id );

        await db.disconnect();

        if ( !entry ) {
            return res.status( 400 ).json( { message: `The entry with ID ${ id } does not exist` } );
        }

        return res.status( 200 ).json( entry );

    } catch ( error: any ) {

        db.disconnect();
        console.log( error );

        return res.status( 400 ).json( { message: error.errors.status.message } );

    }

};