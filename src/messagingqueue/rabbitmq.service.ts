import amqp, { Channel, Connection } from 'amqplib';

class RabbitMQService {
    private static instance: RabbitMQService;
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    private constructor() {}

    public static getInstance(): RabbitMQService {
        if (!RabbitMQService.instance) {
            RabbitMQService.instance = new RabbitMQService();
        }
        return RabbitMQService.instance;
    }

    async connect() {
        this.connection = await amqp.connect(process.env.RABBITMQ_URI||'amqp://localhost',{ heartbeat: 30 });
        this.channel = await this.connection.createChannel();
    }

    async publishMessage(queue: string, message: string) {
        if (!this.channel) {
            throw new Error('RabbitMQ channel not established');
        }
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    }

    async consumeMessages(queue: string, callback: (msg: any) => Promise<void>) {
        if (!this.channel) {
            throw new Error('RabbitMQ channel not established');
        }
        await this.channel.assertQueue(queue, { durable: true });
        await this.channel.prefetch(1);
        await this.channel.consume(queue, async (msg) => {
            if (msg) {
                await callback(msg);
                this.channel!.ack(msg);
            }
        });
        console.log("RabbitMQ connected  successfully")
    }
}

export default RabbitMQService;