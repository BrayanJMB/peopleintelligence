const ADMIN_ROLE = 'Administrador';
const JOURNEY_ROLE = 'Journey';

/**
 * Returns true if the user is an admin.
 *
 * @param user
 * @returns {*|boolean}
 */
export const isAdmin = (user) => {
  if (!user || !user.role) {
    return false;
  }

  return user.role.some((role) => role === ADMIN_ROLE);
};

/**
 * Returns true if the user is a journey.
 *
 * @param user
 * @returns {*|boolean}
 */
export const isJourney = (user) => {
  if (!user || !user.role) {
    return false;
  }

  return user.role.some((role) => role === JOURNEY_ROLE);
}

/**
 * Chunk an array.
 *
 * @param arr
 * @param chunkSize
 * @returns {*}
 */
export const  chunkArray = (arr, chunkSize) => {
  return arr.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!result[chunkIndex]) {
      result[chunkIndex] = [];
    }
    result[chunkIndex].push(item);

    return result;
  }, []);
}