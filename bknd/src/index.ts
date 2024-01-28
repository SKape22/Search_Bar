import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors'
import { Pool } from 'pg';
import check_create_table from './populate'

const app: FastifyInstance = fastify({ logger: true });

app.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
})

const pool = new Pool({
  user: 'your_username',
  host: 'postgres',
  database: 'userdb',
  password: 'your_password',
  port: 5432,
});

interface IQuerystring {
  description: string
}

interface IHeaders {
  'h-Custom': string;
}

interface User {
  id: number;
  username: string;
  email: string;
}



app.get<{
  Querystring: IQuerystring,
  Headers: IHeaders,
}>('/users', async (request, reply) => {
  try {
    const connection = await pool.connect();
    const { description } = request.query;
    const result = await connection.query<User>(
      'SELECT * FROM users WHERE name ILIKE $1',
      [`%${description}%`]
    );
    connection.release();
    reply.code(200).send({result : result.rows});
  } catch (error : any) {
    reply.status(500).send(error);
  }
});

// app.get('/users/:id', async (request, reply) => {
//   try {
//     const { id } = request.params;
//     const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//     reply.send(result.rows[0]);
//   } catch (error) {
//     reply.status(500).send(error);
//   }
// });

// app.post('/users', async (request, reply) => {
//   try {
//     const { name, email } = request.body;
//     const result = await pool.query(
//       'INSERT INTO users (nameemail) VALUES ($1, $2) RETURNING *',
//       [name, email]
//     );
//     reply.send(result.rows[0]);
//   } catch (error) {
//     reply.status(500).send(error);
//   }
// });

const ADDRESS = '0.0.0.0';
const PORT = '3000' 

check_create_table();

app.listen({ host: ADDRESS, port: parseInt(PORT, 10) }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})


// const start = async () => {
//   try {
//     await app.listen({port:8080});
//     app.log.info(`Server is listening on http://localhost:8080`);
//   } catch (err) {
//     app.log.error(err);
//     process.exit(1);
//   }
// };

// start();
