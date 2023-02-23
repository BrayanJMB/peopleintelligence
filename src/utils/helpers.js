const ADMIN_ROLE = 'Administrador';

/**
 * Returns true if the user is an admin.
 *
 * @param user
 * @returns {*|boolean}
 */
export const isAdmin = (user) => {
  if (!user || user.role.index === 0) {
    return false;
  }

  return user.role.some((role) => role === ADMIN_ROLE);
};

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