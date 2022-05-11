import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnection = {
    isConnected: 0
};

export const connect = async () => {

    if ( mongoConnection.isConnected ) {
        console.log( 'MongoDB is already connected' );
        return;
    }

    if ( mongoose.connections.length > 0 ) {

        mongoConnection.isConnected = mongoose.connections[ 0 ].readyState;

        if ( mongoConnection.isConnected === 1 ) {
            console.log( 'Using previous connection' );
            return;
        }

        await mongoose.disconnect();

    }

    mongoConnection.isConnected = 2;

    try {

        await mongoose.connect( process.env.MONGODB_URI || '' );

        mongoConnection.isConnected = 1;

        console.log( 'Connected to MongoDB:', process.env.MONGODB_URI );

    } catch ( err ) {

        console.log( 'MongoDB connection error:', err );
        mongoConnection.isConnected = 0;

    }

};

export const disconnect = async () => {

    if ( process.env.NODE_ENV === 'development' ) return;

    if ( mongoConnection.isConnected === 0 ) {
        console.log( 'MongoDB is not connected' );
        return;
    }

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;

    console.log( 'Disconnected from MongoDB' );

};