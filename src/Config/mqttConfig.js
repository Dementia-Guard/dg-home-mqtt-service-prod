import mqtt from 'mqtt';
import envConfig from './envConfig.js';

export const connectMQTT = ({ clientId }) => {
    const { brokerUrl, username, password } = envConfig.mqtt;
    const client = mqtt.connect(brokerUrl, {
        clientId,
        username,
        password,
    });

    client.on('connect', () => {
        console.log(`Subscriber connected with client ID: ${clientId}`);
    });

    client.on('error', (error) => {
        console.error('MQTT connection error:', error);
    });

    return client;
};
