const { Pool } = require('pg');

const pool = new Pool({
  user: 'development',
  password: 'development',
  host: 'localhost',
  database: 'bootcampx',
});

const cohortName = process.argv[2] || 'JUL02';

const queryString = `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name = $1
  ORDER BY teacher;
  `;

const values = [cohortName];

pool
  .query(queryString, values)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch(err => console.error('Query Error', err.stack));

// pool
//   .query(
//     `
// SELECT id, name, cohort_id
// FROM students
// LIMIT 5;
// `
//   )
//   .then(res => {
//     //console.log(res);
//     console.log(res.rows);
//   })
//   .catch(err => console.error('query error', err.stack));
