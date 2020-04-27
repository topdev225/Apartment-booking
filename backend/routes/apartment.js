var express = require('express');
var router = express.Router();
var ApartmentController = require('../controllers/apartment');

router.get('/', ApartmentController.getAllApartments);
router.get('/:userID', ApartmentController.getApartmentsByUserID);
router.post('/', ApartmentController.addNewApartment);
router.put('/:apartmentID', ApartmentController.updateApartmentByID);
router.delete('/:apartmentID', ApartmentController.deleteApartmentByID)

module.exports = router;
