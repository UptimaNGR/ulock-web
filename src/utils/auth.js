import store from '../store'

/**
* Checks if a user is logged in
* @returns {Boolean} user loggedIn state
*/
export function isLoggedIn () {
  return store.getters.isLoggedIn
}

/**
* Auth guard that allows non-authenticated users only.
* @param to - the next route
* @param from - the previous route
* @param next - callback to transfer control to the next middleware
*/
export function noAuthOnly (to, from, next) {
  if (isLoggedIn()) {
    next({ path: '/' })
  } else {
    next()
  }
}

/**
* Auth guard allows authenticated users only.
* @param to - next route
* @param from - previous route
* @param next - callback to transfer control to the next middleware
*/
export function requireAuth (to, from, next) {
  // next()
  if (isLoggedIn()) {
    next()
  } else {
    next({ path: '/login' })
  }
}
