const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')
const { request, response } = require('express')

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
const getOrganizations = (request, response) => {
  pool.query('SELECT * FROM organization', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addOrganization = (request, response) => {
  const { description, symbol } = request.body
  pool.query('INSERT INTO organization (id, description, symbol) VALUES (nextval(\'seq_organization_id\'),$1,$2)', [description, symbol], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Organization added.' })
  })
}

const updateOrganization = (request, response) => {
  const { id, description, symbol } = request.symbol
  pool.query('UPDATE organization set description= 1$, symbol= $2 where id= $3',
    [description, symbol, id], error => {
      if (error) {
        console.log(error);
        throw error
      }
      response.status(201).json({ status: 'success', message: 'Organization updated.' })
    })
}

const deleteOrganization = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM organization where id = $1', [id], error => {
    if (error) {
      console.log(error);
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Organization deleted.' })
  })
}

// API CRUD CITY
const getCities = (request, response) => {
  pool.query('SELECT * FROM city', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addCity = (request, response) => {
  const { description, state, population, altitude, symbol, latitude, longitude, latitute } = request.body
  pool.query('INSERT INTO city (id, description, state, population, altitude, symbol, latitude, longitude, latitute ) VALUES (nextval(\'seq_city_id\'),$1,$2,$3,$4,$5,$6,$7,$8)', [description, state, population, altitude, symbol, latitude, longitude, latitute], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'City added.' })
  })
}

const updateCity = (request, response) => {
  const { id, description, state, population, altitude, symbol, latitude, longitude, latitute } = request.body
  pool.query('UPDATE city set description=$1, state=$2, population=$3, altitude=$4, symbol=$5, latitude=$6, longitude=$7, latitute=$8 where id=$9', [description, state, population, altitude, symbol, latitude, longitude, latitute, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'City updated.' })
  })
}

const deleteCity = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM city where id = $1', [id], error => {
    if (error) {
      console.log(error);
      throw error
    }
    response.status(201).json({ status: 'success', message: 'City deleted.' })
  })
}

// API CRUD COUNTRY
const getCountries = (request, response) => {
  pool.query('SELECT * FROM country', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addCountry = (request, response) => {
  const { description } = request.body
  pool.query('INSERT INTO country (id, description) VALUES (nextval(\'id_country\'),$1)', [description], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Country added.' })
  })
}

const updateCountry = (request, response) => {
  const { id, description } = request.body
  pool.query('UPDATE country set description=$1 where id=$2', [description, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Country updated.' })
  })
}

const deleteCountry = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM country where id = $1', [id], error => {
    if (error) {
      console.log(error);
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Country deleted.' })
  })
}

// API MODEL_SIMULATION
const getModel_simulations = (request, response) => {
  pool.query('SELECT * FROM model_simulation', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addModel_simulation = (request, response) => {
  const { description, package, symbol_crop } = request.body
  pool.query('INSERT INTO model_simulation (id, description, package, symbol_crop ) VALUES (nextval(\'seq_model_simulation_id\'),$1,$2,$3)', [description, package, symbol_crop], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Model_simulation added.' })
  })
}

// ?
const updateModel_simulation = (request, response) => {
  const { id, description, package, symbol_crop } = request.body
  pool.query('UPDATE model_simulation set description=$1, package=$2, symbol_crop=$3 where id=$4', [description, package, symbol_crop, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Model_simulation updated.' })
  })
}

const deleteModel_simulation = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM model_simulation where id = $1', [id], error => {
    if (error) {
      console.log(error);
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Model_simulation deleted.' })
  })
}

// API CRUD CULTIVAR
const getCultivars = (request, response) => {
  pool.query('SELECT * FROM cultivar', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.row)
  })
}

const addCultivar = (request, response) => {
  const { description, crop, ecotype } = request.body
  pool.query('INSERT INTO cultivar (id, description, crop, ecotype) VALUES (nextval(\'seq_cultivar_id\'),$1,2$,3$)', [description, crop, ecotype], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Cultivar added.' })
  })
}

const updateCultivar = (request, response) => {
  const { id, description, crop, ecotype } = request.body
  pool.query('UPDATE cultivar set description=$1 crop=$2, ecotype=$3 where id=$4', [description, crop, ecotype, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Cultivar updated.' })
  })
}

const deleteCultivar = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM cutlivar where id = $1', [id], error => {
    if (error) {
      console.log(error);
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Cultivar deleted.' })
  })
}

// API CRUD CULTIVAR_MODEL_SIMULATION
const getCultivars_model_simulation = (request, response) => {
  pool.query('SELECT * FROM cultivar_model_simulation', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// API CRUD CULTIVAR_VARIABLE
const getCultivars_variable = (request, response) => {
  pool.query('SELECT * FROM cultivar_variable', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// const addCultivar_variable = (request, response) => {
//   const { variable, data_type, data_value } = request.body
//   pool.query('INSERT INTO cultivar_variable (cultivar,variable, data_type, data_value) VALUES (nextval(\'seq_variable_type_id\'),$1, $2,$3)', [variable, data_type, data_value], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Cultivar_Variable added.' })
//   })
// }

const updateCultivar_variable = (request, response) => {
  const { variable, data_type, data_value } = request.body
  pool.query('UPDATE cultivar_variable set description = $1, data_type = $2, data_value= $3 where cultivar = $4', [variable, data_type, data_value, cultivar], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Cultivar_Variable updated.' })
  })
}

const deleteCultivar_variable = (request, response) => {
  const { cultivar } = request.body
  pool.query('DELETE FROM cultivar_variable where cultivar = $1', [cultivar], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Cultivar_Variable deleted.' })
  })
}

// API CRUD DATA_TYPE
const getData_types = (request, response) => {
  pool.query('SELECT * FROM data_type', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addData_type = (request, response) => {
  const { description, observed } = request.body
  pool.query('INSERT INTO data_type (id, description, observed) VALUES (nextval(\'seq_data_type_id\'),$1, $2)', [description, observed], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Data_type added.' })
  })
}

const updateData_type = (request, response) => {
  const { id, description, observed } = request.body
  pool.query('UPDATE data_type set description = $1, observed = $2 where id = $3', [description, observed, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Data_type updated.' })
  })
}

const deleteData_type = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM data_type where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Data_type deleted.' })
  })
}

// API CRUD ECOTYPE
const getEcotypes = (request, response) => {
  pool.query('SELECT * FROM ecotype', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addEcotype = (request, response) => {
  const { id, name } = request.body
  pool.query('INSERT INTO ecotype(id, name) VALUES ($1, $2)', [id, name], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Ecotype added.' })
  })
}

const updateEcotype = (request, response) => {
  const { id, name } = request.body
  pool.query('UPDATE ecotype set name = $1 where id = $2', [name, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Ecotype updated.' })
  })
}

const deleteEcotype = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM ecotype where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Ecotype deleted.' })
  })
}

// API CRUD ECOTYPE_VARIABLE
const getEcotype_variables = (request, response) => {
  pool.query('SELECT * FROM ecotype_variable', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addEcotype_variable = (request, response) => {
  const { ecotype, variable, mode_simulation, data_type, data_value } = request.body
  pool.query('INSERT INTO ecotype_variable (ecotype, variable, model_simulation,  data_type, data_value) VALUES ($1, $2, $3, $4 ,$5)', [ecotype, variable, mode_simulation, data_type, data_value], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Ecotype_variable added.' })
  })
}

const updateEcotype_variable = (request, response) => {
  const { ecotype, variable, mode_simulation, data_type, data_value } = request.body
  pool.query('UPDATE ecotype_variable set variable = $1, model_simulation= $2,  data_type= $3, data_value= $4 where ecotype = $5', [ecotype, variable, mode_simulation, data_type, data_value], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Ecotype_variable updated.' })
  })
}

const deleteEcotype_variable = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM ecotype_variable where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'xxx deleted.' })
  })
}

// API CRUD EXPERIMENT
const getExperiments = (request, response) => {
  pool.query('SELECT * FROM experiment', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// const addExperiment = (request, response) => {
//   const { description, date, person, organization, date_start, date_end, model_simulation, start_days, days_weather, years_prognostics, time_start, time_end, initial_plant} = request.body
//   pool.query('INSERT INTO experiment (id, description, date, person, organization, date_start, date_end, model_simulation, start_days, days_weather, years_prognostics, time_start, time_end, initial_plant) VALUES (nextval(\'seq_crop_id\'),$1, $2)', [description, date, person, organization, date_start, date_end, model_simulation, start_days, days_weather, years_prognostics, time_start, time_end, initial_plant], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Crop added.' })
//   })
// }



// API CRUD
// API CRUD
// API CRUD
// API CRUD
// API CRUD
// API CRUD
// API CRUD

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
  .get(getOrganizations)
  // POST endpoint
  .post(addOrganization)
  // PUT
  .put(updateOrganization)
  // Delete
  .delete(deleteOrganization)

// API END Point City
app
  .route('/api/city')
  // GET endpoint
  .get(getCities)
  .post(addCity)
  .put(updateCity)
  .delete(deleteCity)

// API END Point Country
app
  .route('/api/country')
  // GET endpoint
  .get(getCountries)
  .post(addCountry)
  .put(updateCountry)
  .delete(deleteCountry)



// API END Point Cultivar
app
  .route('/api/cultivar')
  .get(getCultivars)
  .post()
  .put()
  .delete()

// API END Point Cultivar_Model_Simulation
app
  .route('/api/cultivar_model_simulation')
  .get(getCultivars_model_simulation)
  .post()
  .put()
  .delete()

// API END Point Model_Simulation
app
  .route('/api/model_simulation')
  .get(getModel_simulations)
  .post(addModel_simulation)
  .put(updateModel_simulation)
  .delete(deleteModel_simulation)

// API END Point Cultivar_Variable
app
  .route('/api/cultivar_variable')
  .get(getCultivars_variable)
  //.post(addCultivar_variable)
  .put(updateCultivar_variable)
  .delete(deleteCultivar_variable)

// API END Point Data_Type
app
  .route('/api/data_type')
  // GET endpoint
  .get(getData_types)
  .post(addData_type)
  .put(updateData_type)
  .delete(deleteData_type)

// API END Point Ecotype
app
  .route('/api/ecotype')
  // GET endpoint
  .get(getEcotypes)
  .post(addEcotype)
  .put(updateEcotype)
  .delete(deleteEcotype)

// API END Point Ecotype_variable
app
  .route('/api/ecotype_variable')
  // GET endpoint
  .get(getEcotype_variables)
  .post(addEcotype_variable)
  .put(updateEcotype_variable)
  .delete(deleteEcotype_variable)

// API END Experiment
app
  .route('/api/experiment')
  .get(getExperiments)

// API END Point
app
  .route('/api/')
  .get()
  .post()
  .put()
  .delete()


// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})