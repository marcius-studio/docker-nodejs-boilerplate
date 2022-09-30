import Fastify from 'fastify'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '4000'

if (process.env.NODE_ENV == 'production') {
    console.log('"PRIVATE_KEY" from Docker:', process.env.PRIVATE_KEY)
    console.log('process.env:', process.env)
}

const app = Fastify({ logger: false })

// endpoint 
app.get('/', (request, reply) => {
    reply.send({ status: 'ok' })
})

app.listen({ port: PORT, host: HOST }).then(() => console.log(`http://${HOST}:${PORT}`))