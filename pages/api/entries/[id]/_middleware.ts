import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware( req: NextRequest, ev: NextFetchEvent ) {

    const id = req.page.params?.id || '';

    const checkMongoIdRegExp = new RegExp( "^[0-9a-fA-F]{24}$" );

    if ( !checkMongoIdRegExp.test( id ) ) {
        // return res.status( 400 ).json( { message: `The ID ${ id } is not valid` } );
        return new Response( JSON.stringify( { message: `The ID ${ id } is not valid` } ), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        } );
    }

    return NextResponse.next();

}