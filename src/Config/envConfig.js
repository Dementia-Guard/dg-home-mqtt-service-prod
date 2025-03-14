import dotenv from 'dotenv';

// Load environment variables from `.env` file
dotenv.config();

export default {
    mqtt: {
        brokerUrl: process.env.MQTT_BROKER_URL,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        topic: process.env.MQTT_TOPIC,
        qos: parseInt(process.env.MQTT_QOS, 10),
    },
    // firebase: {
    //     apiKey: process.env.FIREBASE_API_KEY ,
    //     authDomain: process.env.FIREBASE_AUTH_DOMAIN ,
    //     projectId: process.env.FIREBASE_PROJECT_ID ,
    //     storageBucket: process.env.FIREBASE_STORAGE_BUCKET ,
    //     databaseURL: process.env.FIREBASE_DATABASE_URL ,
    //     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ,
    //     appId: process.env.FIREBASE_APP_ID ,
    //     measurementId: process.env.FIREBASE_MEASUREMENT_ID ,
    // },
    mongo: {
        uri: process.env.MONGO_URL,
    },
    sub_port:process.env.SUB_PORT
};
