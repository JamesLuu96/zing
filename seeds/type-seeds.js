const { Type } = require('../models');

const userdata = [
  {
    type_name: 'alesmonde0'
    
  },
  {
    type_name: 'jwilloughway1'
    
  },
  {
    type_name: 'iboddam2'
    
  },
  {
    type_name: 'dstanmer3'
  },
  {
    type_name: 'djiri4'
  },
  {
    type_name: 'msprague5'
  },
  {
    type_name: 'mpergens6'
  },
  {
    type_name: 'tpenniell7'
  },
  {
    type_name: 'msabbins8'
  },
  {
    type_name: 'jmacarthur9'
  }
];

const seedType = () => Type.bulkCreate(userdata, {individualHooks: true});

module.exports = seedType;
