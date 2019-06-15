const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// END POINTS //

// GET ALL PROJECTS

server.get('/api/projects', async (req, res) => {
  try {
    const projects = await db('projects'); // all the projects from the table
    res.status(200).json(projects);
  } catch {
    res.status(500).json({error: "Error retrieving data"})
  }
})

// POST PROJECTS

server.post('/api/projects', async (req, res) => {
  try {
    const [ id ] = await db('projects').insert(req.body)
    const project = await db('projects').where({ id }).first();
    res.status(201).json(project);
  } catch {
    res.status(500).json({error: "Error posting data"})
  }
})

// GET ALL ACTIONS

server.get('/api/actions', async (req, res) => {
  try {
    const actions = await db('actions'); // all the projects from the table
    res.status(200).json(actions);
  } catch {
    res.status(500).json({error: "Error retrieving data"})
  }
})

// POST ACTIONS

server.post('/api/actions', async (req, res) => {
  try {
    const [ id ] = await db('actions').insert(req.body)
    const action = await db('actions').where({ id }).first();
    res.status(201).json(action);
  } catch {
    res.status(500).json({error: "Error posting data"})
  }
})

const port = process.env.PORT ||  6000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);