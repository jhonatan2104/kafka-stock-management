/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable array-callback-return */
import { Kafka, Message } from 'kafkajs'
// import ip from 'ip'

// const host: string = process.env.HOST_IP ?? ip.address()

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['host.docker.internal:9094']
})

const producer = kafka.producer()

const sendMessage = async (message: Message): Promise<void> => {
  await producer.send({
    topic: 'eventmedicine',
    messages: [
      message
    ]
  })
}

export async function kafkaSendMessage (message: Message): Promise<void> {
  console.log('Send Kafka')
  await producer.connect()

  await Promise.all([sendMessage(message)])
}

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map((type: string): void => {
  process.on(type, async (e: any): Promise<any> => {
    try {
      kafka.logger().info(`process.on ${type}`)
      kafka.logger().error(e.message, { stack: e.stack })
      await producer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.map((type: any): void => {
  process.once(type, async () => {
    console.log('')
    kafka.logger().info('[example/producer] disconnecting')
    await producer.disconnect()
  })
})
