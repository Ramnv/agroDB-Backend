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
    response.status(200).json(results.rows)
  })
}

const addCultivar = (request, response) => {
  const { description, crop, ecotype } = request.body
  pool.query('INSERT INTO cultivar (id, description, crop, ecotype) VALUES (nextval(\'seq_cultivar_id\'),$1,$2,$3)', [description, crop, ecotype], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Cultivar added.' })
  })
}

const updateCultivar = (request, response) => {
  const { id, description, crop, ecotype } = request.body
  pool.query('UPDATE cultivar set description=$1, crop=$2, ecotype=$3 where id=$4', [description, crop, ecotype, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Cultivar updated.' })
  })
}

const deleteCultivar = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM cultivar where id = $1', [id], error => {
    if (error) {
      console.log(error);
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Cultivar deleted.' })
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

const addCultivar_variable = (request, response) => {
  const { variable, data_type, data_value } = request.body
  pool.query('INSERT INTO cultivar_variable (cultivar,variable, data_type, data_value) VALUES (nextval(\'seq_cultivar_id\'),$1, $2,$3)', [variable, data_type, data_value], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Cultivar_Variable added.' })
  })
}

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


// // // API CRUD CULTIVAR_MODEL_SIMULATION
// // const getCultivars_model_simulation = (request, response) => {
// //   pool.query('SELECT * FROM cultivar_model_simulation', (error, results) => {
// //     if (error) {
// //       throw error
// //     }
// //     response.status(200).json(results.rows)
// //   })
// // }

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
  const { ecotype, variable, model_simulation, data_type, data_value } = request.body
  pool.query('INSERT INTO ecotype_variable (ecotype, variable, model_simulation, data_type, data_value) VALUES ($1, $2, $3, $4 ,$5)', [ecotype, variable, model_simulation, data_type, data_value], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Ecotype_variable added.' })
  })
}

const updateEcotype_variable = (request, response) => {
  const { ecotype, variable, model_simulation, data_type, data_value } = request.body
  pool.query('UPDATE ecotype_variable set variable = $1, model_simulation= $2,  data_type= $3, data_value= $4 where ecotype = $5', [ecotype, variable, model_simulation, data_type, data_value], error => {
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

const addExperiment = (request, response) => {
  const { description, date, person, organization, date_start, date_end, model_simulation, start_days, days_weather, years_prognostics, time_start, time_end, initial_plant } = request.body
  pool.query('INSERT INTO experiment (id, description, date, person, organization, date_start, date_end, model_simulation, start_days, days_weather, years_prognostics, time_start, time_end, initial_plant) VALUES (nextval(\'seq_experiment_id\'),$1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)', [description, date, person, organization, date_start, date_end, model_simulation, start_days, days_weather, years_prognostics, time_start, time_end, initial_plant], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment added.' })
  })
}

const updateExperiment = (request, response) => {
  const { id, description, date, person, organization, date_start, date_end, model_simulation, start_days, days_weather, years_prognostics, time_start, time_end, initial_plant } = request.body
  pool.query('UPDATE experiment set description= $1, date= $2, person= $3, organization= $4, date_start= $5, date_end= $6, model_simulation= $7, start_days= $8,  days_weather= $9, years_prognostics= $10, time_start= $11, time_end= $12, initial_plant= $13 where id = $14', [description, date, person, organization, date_start, date_end, model_simulation, start_days, days_weather, years_prognostics, time_start, time_end, initial_plant, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment updated.' })
  })
}

const deleteExperiment = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM experiment where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment deleted.' })
  })
}

// API CRUD EXPERIMENT_CONDITION
const getExperiment_conditions = (request, response) => {
  pool.query('SELECT * FROM experiment_condition', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addExperiment_condition = (request, response) => {
  const { experiment, sequence, icbl, sh2o, snh4, sno3 } = request.body
  pool.query('INSERT INTO experiment_condition(id, experiment, sequence, icbl, sh2o, snh4, sno3) VALUES (nextval(\'experiment_condition_id_seq\'),$1, $2, $3, $4, $5, $6)', [experiment, sequence, icbl, sh2o, snh4, sno3], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_condition added.' })
  })
}

const updateExperiment_condition = (request, response) => {
  const { id, experiment, sequence, icbl, sh2o, snh4, sno3 } = request.body
  pool.query('UPDATE experiment_condition set experiment=$1, sequence=$2, icbl=$3, sh2o=$4, snh4=$5, sno3=$6 where id = $7', [experiment, sequence, icbl, sh2o, snh4, sno3, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_condition updated.' })
  })
}

const deleteExperiment_condition = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM experiment_condition where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_condition deleted.' })
  })
}

// API CRUD EXPERIMENT_CONTROL
const getExperiment_controls = (request, response) => {
  pool.query('SELECT * FROM experiment_control', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addExperiment_control = (request, response) => {
  const { experiment, nitrogenio, disease, co2, water, step, mesom, m_organic, n_organic, simbiose, rows, plants_per_row } = request.body
  pool.query('INSERT INTO experiment_control(experiment, nitrogenio, disease, co2, water, step, mesom, m_organic, n_organic, simbiose, rows, plants_per_row) VALUES (nextval(\'???\'),$1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [experiment, nitrogenio, disease, co2, water, step, mesom, m_organic, n_organic, simbiose, rows, plants_per_row], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_control added.' })
  })
}

const updateExperiment_control = (request, response) => {
  const { nitrogenio, disease, co2, water, step, mesom, m_organic, n_organic, simbiose, rows, plants_per_row } = request.body
  pool.query('UPDATE experiment_control set nitrogenio=$1, disease=$2, co2=$3, water=$4, step=$5, mesom=$6, m_organic=$7, n_organic=$8, simbiose=$9, rows=$10, plants_per_row=$11 where id = $12', [nitrogenio, disease, co2, water, step, mesom, m_organic, n_organic, simbiose, rows, plants_per_row], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_control updated.' })
  })
}

const deleteExperiment_control = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM experiment_control where experiment = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_control deleted.' })
  })
}

// API CRUD EXPERIMENT_CULTIVAR
const getExperiment_cultivars = (request, response) => {
  pool.query('SELECT * FROM experiment_cultivar', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addExperiment_cultivar = (request, response) => {
  const { experiment, cultivar, complement } = request.body
  pool.query('INSERT INTO experiment_cultivar(experiment, cultivar, complement) VALUES ($1, $2, $3)', [experiment, cultivar, complement], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_cultivar added.' })
  })
}

const updateExperiment_cultivar = (request, response) => {
  const { experiment, cultivar, complement } = request.body
  pool.query('UPDATE experiment_cultivar set cultivar = $1, complement = $2 where experiment = $3', [experiment, cultivar, complement], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_cultivar updated.' })
  })
}

const deleteExperiment_cultivar = (request, response) => {
  const { experiment, cultivar } = request.body
  pool.query('DELETE FROM experiment_cultivar where experiment = $1 and where cultivar= $2'[experiment, cultivar], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_cultivar deleted.' })
  })
}

// // API CRUD EXPERIMENT_DATA
// const getExperiment_datas = (request, response) => {
//   pool.query('SELECT * FROM experiment_data', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const addExperiment_data = (request, response) => {
//   const { experiment, variable, data_type, data_value_simulated, data_value_observed, date_julian, date, time } = request.body
//   pool.query('INSERT INTO experiment_data(id,experiment, variable, data_type, data_value_simulated, data_value_observed, date_julian, date, time) VALUES (nextval(\'experiment_data_id_seq\'), $1, $2, $3,$4,$5,$6,$7,$8)', [experiment, variable, data_type, data_value_simulated, data_value_observed, date_julian, date, time], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_data added.' })
//   })
// }

// const updateExperiment_data = (request, response) => {
//   const { id, experiment, variable, data_type, data_value_simulated, data_value_observed, date_julian, date, time } = request.body
//   pool.query('UPDATE experiment_data set experiment= $1, variable= $2, data_type= $3, data_value_simulated= $4, data_value_observed= $5, date_julian= $6, date= $7, time = $8 where id = $9', [experiment, variable, data_type, data_value_simulated, data_value_observed, date_julian, date, time, id], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_data updated.' })
//   })
// }

// const deleteExperiment_data = (request, response) => {
//   const { id } = request.body
//   pool.query('DELETE FROM experiment_data where id = $1', [id], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_data deleted.' })
//   })
// }
// // API CRUD EXPERIMENT_DATE
// const getExperiment_dates = (request, response) => {
//   pool.query('SELECT * FROM experiment_date', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const addExperiment_date = (request, response) => {
//   const { experiment, day, month } = request.body
//   pool.query('INSERT INTO experiment_date(id, experiment, day, month) VALUES (nextval(\'id_experiment_date\'), $1, $2, $3)', [experiment, day, month], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_date added.' })
//   })
// }

// const updateExperiment_date = (request, response) => {
//   const { id, experiment, day, month } = request.body
//   pool.query('UPDATE experiment_date set experiment=$1, day=$2, month=$3 where id = $4', [experiment, day, month, id], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_date updated.' })
//   })
// }

// const deleteExperiment_date = (request, response) => {
//   const { id } = request.body
//   pool.query('DELETE FROM experiment_date where id = $1', [id], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_date deleted.' })
//   })
// }

// // API CRUD EXPERIMENT_FERTILIZER
// const getExperiment_fertilizers = (request, response) => {
//   pool.query('SELECT * FROM experiment_fertilizer', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const addExperiment_fertilizer = (request, response) => {
//   const { experiment, sequence, fmcd, facd, fdep, famn, famp, date } = request.body
//   pool.query('INSERT INTO experiment_fertilizer(id, experiment, sequence, fmcd, facd, fdep, famn, famp,date) VALUES (nextval(\'experiment_fertilizer_id_seq\'), $1, $2, $3,$4,$5,$6,$7,$8)', [experiment, sequence, fmcd, facd, fdep, famn, famp, date], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_fertilizer added.' })
//   })
// }

// const updateExperiment_fertilizer = (request, response) => {
//   const { id, experiment, sequence, fmcd, facd, fdep, famn, famp, date } = request.body
//   pool.query('UPDATE experiment_fertilizer set experiment=$1, sequence=$2, fmcd=$3, facd=$4, fdep=$5, famn=$6, famp=$7,date=$8 where id = $9', [experiment, sequence, fmcd, facd, fdep, famn, famp, date, id], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_fertilizer updated.' })
//   })
// }

// const deleteExperiment_fertilizer = (request, response) => {
//   const { id } = request.body
//   pool.query('DELETE FROM experiment_fertilizer where id = $1', [id], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_fertilizer deleted.' })
//   })
// }

// // API CRUD EXPERIMENT_INPUT

// const getExperiments_input = (request, response) => {
//   pool.query('SELECT * FROM experiment_input', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const addExperiment_input = (request, response) => {
//   const { experiment, variable, data_type, filename, text_search, start_position, length_field, value_conversation, sequence, start_date, length_date } = request.body
//   pool.query('INSERT INTO experiment_input(id, experiment, variable, data_type, filename, text_search, start_position, length_field, value_conversation, sequence, start_date, length_date) VALUES (nextval(\'id_experiment_input\'),$1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)', [experiment, variable, data_type, filename, text_search, start_position, length_field, value_conversation, sequence, start_date, length_date], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_input added.' })
//   })
// }

// const updateExperiment_input = (request, response) => {
//   const { xxx } = request.body
//   pool.query('UPDATE experiment_input set experiment= $1, variable= $2,data_type= $3, filename= $4, text_search= $5, start_position= $6, length_field= $7, value_conversation= $8, sequence= $9, start_date= $10, length_date = $11 where id = $12', [experiment, variable, data_type, filename, text_search, start_position, length_field, value_conversation, sequence, start_date, length_date, id], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_input updated.' })
//   })
// }

// const deleteExperiment_input = (request, response) => {
//   const { id } = request.body
//   pool.query('DELETE FROM experiment_input where id = $1', [id], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_input deleted.' })
//   })
// }

// // API CRUD EXPERIMENT_PEST

// const getExperiments_pest = (request, response) => {
//   pool.query('SELECT * FROM experiment_pest', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const addExperiment_pest = (request, response) => {
//   const { experiment, pest, complement } = request.body
//   pool.query('INSERT INTO experiment_pest(experiment, variable,data_type, filename, text_search, start_position, length_field, value_conversation, sequence, start_date, length_date) VALUES (nextval(\'id_experiment_pest\'),$1, $2, $3)', [experiment, pest, complement], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_pest added.' })
//   })
// }

// const updateExperiment_pest = (request, response) => {
//   const { experiment, pest, complement } = request.body
//   pool.query('UPDATE experiment_pest set pest= $1,complement= $2 where experiment = $3', [experiment, pest, complement], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_pest updated.' })
//   })
// }

// const deleteExperiment_pest = (request, response) => {
//   const { experiment } = request.body
//   pool.query('DELETE FROM experiment_pest where experiment = $1', [experiment], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_pest deleted.' })
//   })
// }

// // API CRUD EXPERIMENT_STATION

// const getExperiments_station = (request, response) => {
//   pool.query('SELECT * FROM experiment_station', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// const addExperiment_station = (request, response) => {
//   const { station, experiment, soil, weather_simulation, weather_disease } = request.body
//   pool.query('INSERT INTO station, expriment, soil, weather_simulation, weather_disease) VALUES ($1, $2, $3,$4,$5)', [tation, experiment, soil, weather_simulation, weather_disease], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_station added.' })
//   })
// }

// const updateExperiment_station = (request, response) => {
//   const { station, experiment, soil, weather_simulation, weather_disease } = request.body
//   pool.query('UPDATE experiment_station set experiment= $1, soil= $2, weather_simulation= $3, weather_disease= $4 where station = $5', [station, experiment, soil, weather_simulation, weather_disease], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_station updated.' })
//   })
// }

// const deleteExperiment_station = (request, response) => {
//   const { experiment } = request.body
//   pool.query('DELETE FROM experiment_station where station = $1', [experiment], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Experiment_station deleted.' })
//   })
// }

// API CRUD EXPERIMENT_VIRUS
const getExperiments_virus = (request, response) => {
  pool.query('SELECT * FROM experiment_virus', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addExperiment_virus = (request, response) => {
  const { experiment, virus_position, micro_position, viral_titer } = request.body
  pool.query('INSERT INTO  experiment_virus (experiment, virus_position, micro_position, viral_titer) VALUES ($1, $2, $3,$4)', [experiment, virus_position, micro_position, viral_titer], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_virus added.' })
  })
}

const updateExperiment_virus = (request, response) => {
  const { experiment, virus_position, micro_position, viral_titer } = request.body
  pool.query('UPDATE experiment_virus set virus_position= $1, micro_position= $2, viral_titer= $3 where experiment = $4', [experiment, virus_position, micro_position, viral_titer], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_virus updated.' })
  })
}

const deleteExperiment_virus = (request, response) => {
  const { experiment } = request.body
  pool.query('DELETE FROM experiment_virus where experiment = $1', [experiment], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_virus deleted.' })
  })
}

// API CRUD EXPERIMENT_WEATHER
const getExperiments_weather = (request, response) => {
  pool.query('SELECT * FROM experiment_weather', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addExperiment_weather = (request, response) => {
  const { experiment, weather_simulation } = request.body
  pool.query('INSERT INTO experiment_weather (experiment, weather_simulation) VALUES ($1, $2)', [experiment, weather_simulation], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_weather added.' })
  })
}

const updateExperiment_weather = (request, response) => {
  const { experiment, weather_simulation } = request.body
  pool.query('UPDATE experiment_weather set weather_simulation= $1 where experiment = $2', [experiment, weather_simulation], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_weather updated.' })
  })
}

const deleteExperiment_weather = (request, response) => {
  const { experiment } = request.body
  pool.query('DELETE FROM experiment_weather where experiment = $1', [experiment], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_weather deleted.' })
  })
}

// API CRUD EXPERIMENT_YEAR
const getExperiments_year = (request, response) => {
  pool.query('SELECT * FROM experiment_year', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addExperiment_year = (request, response) => {
  const { experiment, year } = request.body
  pool.query('INSERT INTO experiment_year ( experiment, year) VALUES ($1, $2)', [experiment, year], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_year added.' })
  })
}

const updateExperiment_year = (request, response) => {
  const { experiment, year } = request.body
  pool.query('UPDATE experiment_year set experiment= $1 where year = $2', [experiment, year], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_year updated.' })
  })
}

const deleteExperiment_year = (request, response) => {
  const { experiment } = request.body
  pool.query('DELETE FROM experiment_year where experiment = $1', [experiment], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Experiment_year deleted.' })
  })
}

// API CRUD TRAP
const getTraps = (request, response) => {
  pool.query('SELECT * FROM trap', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addTrap = (request, response) => {
  const { lenght, width, trap_type, latitude, longitude, height, station, description, profundity } = request.body
  pool.query('INSERT INTO trap(lenght, width, trap_type, latitude, longitude, height, station, description, profundity) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9)', [lenght, width, trap_type, latitude, longitude, height, station, description, profundity], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Trap added.' })
  })
}

const updateTrap = (request, response) => {
  const { id, lenght, width, trap_type, latitude, longitude, height, station, description, profundity } = request.body
  pool.query('UPDATE trap set lenght= $1, width= $2, trap_type= $3, latitude= $4, longitude= $5, height= $6, station= $7, description= $8, profundity= $9 where id = $10', [lenght, width, trap_type, latitude, longitude, height, station, description, profundity, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Trap updated.' })
  })
}

const deleteTrap = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM trap where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Trap deleted.' })
  })
}

// API CRUD STATION
const getStations = (request, response) => {
  pool.query('SELECT * FROM station', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addStation = (request, response) => {
  const { description, city, nickname, google, organization, code_organization, station_type, latitude, longitude, altitude, active } = request.body
  pool.query('INSERT INTO station (xxx) VALUES (nextval(\'___\'),$1, $2)', [xxx], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'xxxx added.' })
  })
}

const updateStation = (request, response) => {
  const { xxx } = request.body
  pool.query('UPDATE xxx set description = $,  where id = $', [xxx], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'xxxx updated.' })
  })
}

const deleteStation = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM xxx where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'xxx deleted.' })
  })
}


// API CRUD TRAP_TYPE
const getTrap_types = (request, response) => {
  pool.query('SELECT * FROM trap_type', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addTrap_type = (request, response) => {
  const { description } = request.body
  pool.query('INSERT INTO trap_type(description) VALUES (nextval(\'id_trap_type\'),$1)', [description], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Trap_type added.' })
  })
}

const updateTrap_type = (request, response) => {
  const { id, description } = request.body
  pool.query('UPDATE trap_type set description = $1,  where id = $2', [description, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Trap_type updated.' })
  })
}

const deleteTrap_type = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM trap_type where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Trap_type deleted.' })
  })
}

// API TREATMENT
const getTreatments = (request, response) => {
  pool.query('SELECT * FROM treatment', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addTreatment = (request, response) => {
  const { cultivar, start_simulation, experiment, station, soil, weather_simulation, description, observation_date, number_days, observation_id, initial_plant } = request.body
  pool.query('INSERT INTO treatment(id, cultivar, start_simulation, experiment, station, soil, weather_simulation, description, observation_date, number_days, observation_id, initial_plant) VALUES (nextval(\'id_treatment\'),$1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)', [cultivar, start_simulation, experiment, station, soil, weather_simulation, description, observation_date, number_days, observation_id, initial_plant], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Treatment added.' })
  })
}

const updateTreatment = (request, response) => {
  const { cultivar, start_simulation, experiment, station, soil, weather_simulation, description, observation_date, number_days, observation_id, initial_plant, id } = request.body
  pool.query('UPDATE treatment set cultivar= $1, start_simulation= $2, experiment= $3, station= $4, soil= $5, weather_simulation= $6, description= $7, observation_date= $8, number_days= $9, observation_id= $10, initial_plant= $11 ,  where id = $12', [cultivar, start_simulation, experiment, station, soil, weather_simulation, description, observation_date, number_days, observation_id, initial_plant, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Treatment updated.' })
  })
}

const deleteTreatment = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM treatment where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Treatment deleted.' })
  })
}

// API PEOPLE_ORGANIZATION
const getPeople_organizations = (request, response) => {
  pool.query('SELECT * FROM people_organization', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addPeople_organization = (request, response) => {
  const { people, organization } = request.body
  pool.query('INSERT INTO people_organization(people, organization) VALUES ($1, $2)', [people, organization], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'People_organization added.' })
  })
}

// const updatePeople_organization = (request, response) => {
//   const { people, organization } = request.body
//   pool.query('UPDATE people_organization set people=$, organization = $,  where id = $', [xxx], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'People_organization updated.' })
//   })
// }

// const deletePeople_organization = (request, response) => {
//   const { id } = request.body
//   pool.query('DELETE FROM people_organization where id = $1', [id], error => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'People_organization deleted.' })
//   })
// }

// API SOIL
const getSoils = (request, response) => {
  pool.query('SELECT * FROM soil', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addSoil = (request, response) => {
  const { description, organization, station, class_soil, io, latitude, longitude, country, descountry, desfamily } = request.body
  pool.query('INSERT INTO soil(description, organization, station, class_soil, io, latitude, longitude, country, descountry, desfamily) VALUES (nextval(\'seq_soil_id\'),$1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [description, organization, station, class_soil, io, latitude, longitude, country, descountry, desfamily], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Soil added.' })
  })
}

const updateSoil = (request, response) => {
  const { id, description, organization, station, class_soil, io, latitude, longitude, country, descountry, desfamily } = request.body
  pool.query('UPDATE soil set description= $, organization= $, station= $, class_soil= $, io= $, latitude= $, longitude= $, country= $, descountry= $, desfamily = $,  where id = $', [description, organization, station, class_soil, io, latitude, longitude, country, descountry, desfamily, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Soil updated.' })
  })
}

const deleteSoil = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM xxx where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Soil deleted.' })
  })
}

// API WEATHER_DATA
const getWeather_datas = (request, response) => {
  pool.query('SELECT * FROM weather_data', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addWeather_data = (request, response) => {
  const { date_import, time_import, io, station } = request.body
  pool.query('INSERT INTO weather_data(date_import, time_import, io, station) VALUES (nextval(\'___\'),$1, $2,$3,$4)', [date_import, time_import, io, station], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Weather_data added.' })
  })
}

const updateWeather_data = (request, response) => {
  const { id, date_import, time_import, io, station } = request.body
  pool.query('UPDATE weather_data set date_import= $, time_import= $, io= $, station = $,  where id = $', [date_import, time_import, io, station, id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Weather_data updated.' })
  })
}

const deleteWeather_data = (request, response) => {
  const { id } = request.body
  pool.query('DELETE FROM weather_data where id = $1', [id], error => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Weather_data deleted.' })
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

// API END Point Model_Simulation
app
  .route('/api/model_simulation')
  .get(getModel_simulations)
  .post(addModel_simulation)
  .put(updateModel_simulation)
  .delete(deleteModel_simulation)


// API END Point Cultivar
app
  .route('/api/cultivar')
  .get(getCultivars)
  .post(addCultivar)
  .put(updateCultivar)
  .delete(deleteCultivar)

// API END Point Cultivar_Variable
app
  .route('/api/cultivar_variable')
  .get(getCultivars_variable)
  .post(addCultivar_variable)
  .put(updateCultivar_variable)
  .delete(deleteCultivar_variable)

// API END Point Cultivar_Model_Simulation
// app
//   .route('/api/cultivar_model_simulation')
//   .get(getCultivars_model_simulation)
// .post(addCultivars_model_simulation)
// .put(updateCultivars_model_simulation)
// .delete(deleteCultivars_model_simulation)


// API END Point Data_Type
app
  .route('/api/data_type')
  // GET endpoint
  .get(getData_types)
  .post(addData_type)
  .put(updateData_type)
  .delete(deleteData_type)

// API END Point Ecotype_variable
app
  .route('/api/ecotype_variable')
  // GET endpoint
  .get(getEcotype_variables)
  .post(addEcotype_variable)
  .put(updateEcotype_variable)
  .delete(deleteEcotype_variable)

// API END Point Ecotype
app
  .route('/api/ecotype')
  // GET endpoint
  .get(getEcotypes)
  .post(addEcotype)
  .put(updateEcotype)
  .delete(deleteEcotype)


// API END Experiment
app
  .route('/api/experiment')
  .get(getExperiments)
  .post(addExperiment)
  .put(updateExperiment)
  .delete(deleteExperiment)

// API END Experiment_condition
app
  .route('/api/experiment_condition')
  .get(getExperiment_conditions)
  .post(addExperiment_condition)
  .put(updateExperiment_condition)
  .delete(deleteExperiment_condition)

// API END Experiment_control
app
  .route('/api/experiment_control')
  .get(getExperiment_controls)
  .post(addExperiment_control)
  .put(updateExperiment_control)
  .delete(deleteExperiment_control)

// API END Experiment_cultivar
app
  .route('/api/experiment_cultivar')
  .get(getExperiment_cultivars)
  .post(addExperiment_cultivar)
  .put(updateExperiment_cultivar)
  .delete(deleteExperiment_cultivar)

// // API END Experiment_data
// app
//   .route('/api/experiment_data')
//   .get(getExperiment_datas)
//   .post(addExperiment_data)
//   .put(updateExperiment_data)
//   .delete(deleteExperiment_data)

// // API END Experiment_date
// app
//   .route('/api/experiment_date')
//   .get(getExperiment_dates)
//   .post(addExperiment_date)
//   .put(updateExperiment_date)
//   .delete(deleteExperiment_date)

// // API END Experiment_fertilizer
// app
//   .route('/api/experiment_fertilizer')
//   .get(getExperiment_fertilizers)
//   .post(addExperiment_fertilizer)
//   .put(updateExperiment_fertilizer)
//   .delete(deleteExperiment_fertilizer)

// // API END Experiment_input
// app
//   .route('/api/experiment_input')
//   .get(getExperiments_input)
//   .post(addExperiment_input)
//   .put(updateExperiment_input)
//   .delete(deleteExperiment_input)

// // API END Experiment_pest
// app
//   .route('/api/experiment_pest')
//   .get(getExperiments_pest)
//   .post(addExperiment_pest)
//   .put(updateExperiment_pest)
//   .delete(deleteExperiment_pest)

// // API END Experiment_station
// app
//   .route('/api/experiment_station')
//   .get(getExperiments_station)
//   .post(addExperiment_station)
//   .put(updateExperiment_station)
//   .delete(deleteExperiment_station)

// API END Experiment_virus
app
  .route('/api/experiment_virus')
  .get(getExperiments_virus)
  .post(addExperiment_virus)
  .put(updateExperiment_virus)
  .delete(deleteExperiment_virus)

// API END Experiment_weather
app
  .route('/api/experiment_weather')
  .get(getExperiments_weather)
  .post(addExperiment_weather)
  .put(updateExperiment_weather)
  .delete(deleteExperiment_weather)

// API END Experiment_year
app
  .route('/api/experiment_year')
  .get(getExperiments_year)
  .post(addExperiment_year)
  .put(updateExperiment_year)
  .delete(deleteExperiment_year)

// API END Trap
app
  .route('/api/trap')
  .get(getTraps)
  .post(addTrap)
  .put(updateTrap)
  .delete(deleteTrap)

// API END Station
app
  .route('/api/station')
  .get(getStations)
  .post(addStation)
  .put(updateStation)
  .delete(deleteStation)

// API END Trap_type
app
  .route('/api/trap_type')
  .get(getTrap_types)
  .post(addTrap_type)
  .put(updateTrap_type)
  .delete(deleteTrap_type)

// API END Treatment
app
  .route('/api/treatment')
  .get(getTreatments)
  .post(addTreatment)
  .put(updateTreatment)
  .delete(deleteTreatment)

// API END People_organization
app
  .route('/api/people_organization')
  .get(getPeople_organizations)
  .post(addPeople_organization)
  .put(updatePeople_organization)
  .delete(deletePeople_organization)

// API END Soil
app
  .route('/api/soil')
  .get(getSoils)
  .post(addSoil)
  .put(updateSoil)
  .delete(deleteSoil)

  // API END Weather_data
app
  .route('/api/weather_data')
  .get(getWeather_datas)
  .post(addWeather_data)
  .put(updateWeather_data)
  .delete(deleteWeather_data)

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