'use strict';

var express = require('express');
var controller = require('./theatre-mapping.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
// router.get('/:movie', controller.getMovie);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
