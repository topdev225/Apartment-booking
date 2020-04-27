var ApartmentModel = require('../models').Apartment;

var ApartmentController = {
    getAllApartments: (req, res) => {
        ApartmentModel.findAll()
            .then(apartments => {
                var sendData = [];
                apartments.forEach(apartment => {
                    sendData.push({
                        id: apartment.get().id,
                        userID: apartment.get().userID,
                        name: apartment.get().name,
                        slug: apartment.get().slug,
                        price: parseFloat(apartment.get().price),
                        size: parseFloat(apartment.get().size),
                        imageUrl: apartment.get().imageUrl,
                        roomCount: apartment.get().roomCount,
                        description: apartment.get().description,
                        createdAt: apartment.get().createdAt,
                        updatedAt: apartment.get().updatedAt,
                        longitude: apartment.get().longitude,
                        latitude: apartment.get().latitude,
                        status: apartment.get().status,
                    })
                });
                return res.status(200).json({
                    success: true,
                    data: sendData,
                });
            })
            .catch(error => {
                console.log('Get apartment list error :', error);
                return res.status(500).json({
                    success: false,
                    message: 'Server connection error.',
                });
            })
    },
    getApartmentsByUserID: (req, res) => {
        ApartmentModel.findAll({
            where: {
                userID: req.params.userID,
            }
        }).then(apartments => {
            var sendData = [];
            apartments.forEach(apartment => {
                sendData.push({
                    userID: apartment.get().userID,
                    name: apartment.get().name,
                    slug: apartment.get().slug,
                    price: parseFloat(apartment.get().price),
                    size: parseFloat(apartment.get().size),
                    imageUrl: apartment.get().imageUrl,
                    roomCount: apartment.get().roomCount,
                    description: apartment.get().description,
                    createdAt: apartment.get().createdAt,
                    updatedAt: apartment.get().updatedAt,
                    longitude: apartment.get().longitude,
                    latitude: apartment.get().latitude,
                    status: apartment.get().status,
                })
            });
            return res.status(200).json({
                success: true,
                data: sendData,
            });
        }).catch(error => {
            console.log('Get apartment list by user ID error:', error);
            return res.status(500).json({
                success: false,
                message: 'Server connection error.',
            });
        })
    },
    addNewApartment: (req, res) => {
        if (req.headers.role != 2) {
            var newApartmentData = {
                userID: req.body.userID,
                name: req.body.name,
                slug: req.body.slug,
                imageUrl: req.body.imageUrl,
                price: parseFloat(req.body.price),
                size: parseFloat(req.body.size),
                roomCount: req.body.roomCount,
                description: req.body.description,
                createdAt: new Date(),
                updatedAt: new Date(),
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                status: req.body.status,
            }
            ApartmentModel.create(newApartmentData)
                .then(apartment => {
                    var sendData = {
                        userID: apartment.get().userID,
                        name: apartment.get().name,
                        slug: apartment.get().slug,
                        imageUrl: req.body.imageUrl,
                        price: parseFloat(apartment.get().price),
                        size: parseFloat(apartment.get().size),
                        roomCount: apartment.get().roomCount,
                        description: apartment.get().description,
                        longitude: apartment.get().longitude,
                        latitude: apartment.get().latitude,
                        status: 0,
                    }
                    return res.status(200).json({
                        success: true,
                        data: sendData,
                    });
                })
                .catch(error => {
                    console.log('Add new Apartment error: ', error);
                })
        } else {
            return res.status(403).json({
                success: false,
                message: 'This user has not permission.'
            });
        }

    },
    updateApartmentByID: (req, res) => {
        if (req.headers.role != 2) {
            var updateData = {
                name: req.body.name,
                slug: req.body.slug,
                imageUrl: req.body.imageUrl,
                price: parseFloat(req.body.price),
                size: parseFloat(req.body.size),
                roomCount: req.body.roomCount,
                description: req.body.description,
                updatedAt: new Date(req.body.updatedAt),
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                status: req.body.status,
            };

            ApartmentModel.update(updateData, {
                where: {
                    id: req.body.id
                }
            }).then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Updated apartment info successfully.',
                });
            }).catch(error => {
                console.log('Update apartment detail by id error: ', error);
                return res.status(500).json({
                    success: false,
                    message: 'Server connection error.',
                });
            })
        } else {
            return res.status(403).json({
                success: false,
                message: 'This user has not permission.'
            });
        }
    },
    deleteApartmentByID: (req, res) => {
        if (req.headers.role != 2) {
            ApartmentModel.destroy({
                where: {
                    id: req.params.apartmentID
                }
            }).then(() => {
                return res.status(204).json({
                    success: true,
                    message: 'Updated user successfully.',
                });
            }).catch(error => {
                console.log('Delete the apartment error: ', error);
                res.status(500).json({
                    success: false,
                    message: 'Server connection error.',
                });
            })
        } else {
            return res.status(403).json({
                success: false,
                message: 'This user has not permission.'
            });
        }
    }
};

module.exports = ApartmentController;