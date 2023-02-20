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