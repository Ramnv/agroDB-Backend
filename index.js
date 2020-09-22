const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


// API Endpoint /
const getAPI = (request, response) => {
  textOutput = "<a href='http://localhost:3002/api/crops'>CROPS API Endpoint GET</a>"
  textOutput += "<br/><a href='http://localhost:3002/api/people'>People API Endpoint GET</a>"
  response.status(200).send(textOutput)
}


// API CRUD CROPS
const getCrops = (request, response) => {
  pool.query('SELECT * FROM crop', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addCrop = (request, response) => {
  const { description, scientific_name } = request.body
  console.log('crop do request ' + description)
  pool.query('INSERT INTO crop (id, description, scientific_name) VALUES (nextval(\'seq_crop_id\'),$1, $2)', [description, scientific_name], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Crop added.' })
  })
}

const updateCrop = (request, response) => {
  const { id, description, scientific_name } = request.body
  console.log('crop do request ' + description)
  pool.query('UPDATE crop set description = $1, scientific_name = $2 where id = $3', [description, scientific_name, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Crop updated.' })
  })
}

const deleteCrop = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM crop where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Crop deleted.' })
  })
}


// API CRUD PEOPLE
const getPeople = (request, response) => {
  pool.query('SELECT * FROM people', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addPeople = (request, response) => {
  const { name, sex, adress, complement, district, zip_code, telephone, celular, e_mail, profession, login, password, city, people_type } = request.body
  pool.query('INSERT INTO people (name, sex, adress, complement, district, zip_code , telephone, celular,  e_mail, profession, login, password, city, people_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
    [name, sex, adress, complement, district, zip_code, telephone, celular, e_mail, profession, login, password, city, people_type], error => {
      if (error) {
        console.log(error)
        throw error
      }
      response.status(201).json({ status: 'success', message: 'People added.' })
    })
}

const updatePeople = (request, response) => {
  const { id, name, sex, adress, complement, district, zip_code, telephone, celular, e_mail, profession, login, password, city, people_type } = request.body
  pool.query('UPDATE people set name = $1, sex = $2, adress = $3, complement = $4, district = $5, zip_code = $6 , telephone = $7, celular = $8,  e_mail = $9, profession = $10, login = $11, password = $12, city = $13, people_type = $14 where id = $15',
    [name, sex, adress, complement, district, zip_code, telephone, celular, e_mail, profession, login, password, city, people_type, id], error => {
      if (error) {
        console.log(error)
        throw error
      }
      response.status(201).json({ status: 'success', message: 'People updated.' })
    })
}

const deletePeople = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM people where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'People deleted.' })
  })
}

// API CRUD ORGANIZATION
const getOrganization = (request, response) => {
  pool.query('SELECT * FROM organization', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// API Endpoint
app
  .route('/')
  // GET endpoint
  .get(getAPI)

// API END Point CROPS
app
  .route('/api/crops')
  // GET endpoint
  .get(getCrops)
  // POST endpoint
  .post(addCrop)
  // PUT
  .put(updateCrop)
  // delete
  .delete(deleteCrop)


// API END Point People  
app
  .route('/api/people')
  // GET endpoint
  .get(getPeople)
  // POST endpoint
  .post(addPeople)
  // PUT
  .put(updatePeople)
  // delete
  .delete(deletePeople)

// API END Point Organization
app
  .route('/api/organization')
  // GET endpoint
  .get(getOrganization)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})