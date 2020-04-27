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
   * get Users
  */
  getUsersRequest: [],
  getUsersSuccess: ['response'],
  getUsersFailure: null,

  /**
   * Update User
  */
  updateUserRequest: ['payload'],
  updateUserSuccess: ['response'],
  updateUserFailure: null,

  /**
   * Remove User
  */
 removeUserRequest: ['payload'],
 removeUserSuccess: ['response'],
 removeUserFailure: null,

   /**
   * Create User
  */
 createUserRequest: ['payload'],
 createUserSuccess: ['response'],
 createUserFailure: null,
})

export const UserTypes = Types
export default Creators
