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
    res.status(500).json({error: "Error retrieving project data"})
  }
})

// POST PROJECTS

server.post('/api/projects', async (req, res) => {
  try {
    const [ id ] = await db('projects').insert(req.body)
    const project = await db('projects').where({ id }).first();
    res.status(201).json(project);
  } catch {
    res.status(500).json({error: "Error posting project data"})
  }
})

// GET ALL ACTIONS

server.get('/api/actions', async (req, res) => {
  try {
    const actions = await db('actions'); // all the projects from the table
    res.status(200).json(actions);
  } catch {
    res.status(500).json({error: "Error retrieving action data"})
  }
})

// POST ACTIONS

server.post('/api/actions', async (req, res) => {
  try {
    const [ id ] = await db('actions').insert(req.body)
    const action = await db('actions').where({ id }).first();
    res.status(201).json(action);
  } catch {
    res.status(500).json({error: "Error posting action data"})
  }
})

//GET PROJECT AND ACTIONS BY ID

server.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await db('projects').where({ id: req.params.id })
    .then(project => {
      db('actions')
      .where({ project_id: req.params.id })
      .then(action => {
        // console.log(action);
        return res.status(200).json({project, actions: action});
        })
      });

  } catch {
  res.status(500).json({ error: "Error retrieving all data for that particular project" })
  }
})

const port = process.env.PORT ||  6000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);