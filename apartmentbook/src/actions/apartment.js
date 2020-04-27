/**
 * We will use the following prefixes.
 * add: When adding something to the database.
 * delete: When deleting something from the database.
 * update: When updating something in the database.
 * fetch: When pulling something from the database.
 * search: When searching something in the database.
 * select: When setting reducers, not handling with database, just handling only reducers.
 */

import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  /**
   * get Apartments
  */
  getApartmentsRequest: [],
  getApartmentsSuccess: ['response'],
  getApartmentsFailure: null,

  /**
   * Update Apartment
  */
  updateApartmentRequest: ['payload'],
  updateApartmentSuccess: ['response'],
  updateApartmentFailure: null,

  /**
   * Remove Apartment
  */
 removeApartmentRequest: ['payload'],
 removeApartmentSuccess: ['response'],
 removeApartmentFailure: null,

   /**
   * Create Apartment
  */
 createApartmentRequest: ['payload'],
 createApartmentSuccess: ['response'],
 createApartmentFailure: null,
})

export const ApartmentTypes = Types
export default Creators
