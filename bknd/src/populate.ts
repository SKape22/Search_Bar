import { Pool } from 'pg';

const pool = new Pool({
    user: 'your_username',
    host: 'postgres',
    database: 'userdb',
    password: 'your_password',
    port: 5432,
});

const dummyData = [
    {
        "name": "Liam Anderson",
        "email": "liam.anderson@example.com"
    },
    {
        "name": "Emma Brown",
        "email": "emma.brown@example.com"
    },
    {
        "name": "Noah Carter",
        "email": "noah.carter@example.com"
    },
    {
        "name": "Sophia Evans",
        "email": "sophia.evans@example.com"
    },
    {
        "name": "Logan Fisher",
        "email": "logan.fisher@example.com"
    },
    {
        "name": "Isabella Green",
        "email": "isabella.green@example.com"
    },
    {
        "name": "Lucas Harris",
        "email": "lucas.harris@example.com"
    },
    {
        "name": "Mia Jackson",
        "email": "mia.jackson@example.com"
    },
    {
        "name": "Elijah King",
        "email": "elijah.king@example.com"
    },
    {
        "name": "Ava Mitchell",
        "email": "ava.mitchell@example.com"
    },
    {
        "name": "Michael Brown",
        "email": "michael.brown@example.com"
    },
    {
        "name": "Emily Davis",
        "email": "emily.davis@example.com"
    },
    {
        "name": "David Miller",
        "email": "david.miller@example.com"
    },
    {
        "name": "Sophia Wilson",
        "email": "sophia.wilson@example.com"
    },
    {
        "name": "Matthew Taylor",
        "email": "matthew.taylor@example.com"
    },
    {
        "name": "Alex Johnson",
        "email": "alex.johnson@example.com"
    },
    {
        "name": "Olivia Davis",
        "email": "olivia.davis@example.com"
    },
    {
        "name": "Ethan Smith",
        "email": "ethan.smith@example.com"
    },
    {
        "name": "Ava Wilson",
        "email": "ava.wilson@example.com"
    },
    {
        "name": "William Taylor",
        "email": "william.taylor@example.com"
    }
];

async function check_create_table() {
    const connection = await pool.connect();
    connection.query(`SELECT 
        COUNT(table_name)
            FROM 
        information_schema.tables 
            WHERE 
                table_schema LIKE 'public' AND 
                table_type LIKE 'BASE TABLE' AND
                table_name = 'users';`, (err, res) => {
                    if (err) {
                        console.log(err);
                    }

                    if(res.rows[0].count ==='1') {
                        console.log('table exists');
                    } else {
                        console.log('table does not exists');

                        connection.query(`CREATE TABLE
                            users
                            (
                            id SERIAL PRIMARY KEY,
                            name TEXT NOT NULL,
                            email TEXT NOT NULL
                            );`
                        );
                        dummyData.forEach((users) => {
                            const result = connection.query(
                                'INSERT INTO users (name, email) values ($1,$2);',
                                [`${users.name}`, `${users.email}`]
                            )
                            console.log(result)
                        })
                    }
                });

    connection.release();
}


export default check_create_table;
