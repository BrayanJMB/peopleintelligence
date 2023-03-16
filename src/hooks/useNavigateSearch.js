import { createSearchParams, useNavigate } from 'react-router-dom';

/**
 * Use navigate hook with search params.
 *
 * @returns {function(*, *): void}
 */
const useNavigateSearch = () => {
  const navigate = useNavigate();

  return (pathname, params) => {
    const to = {
      pathname,
      search: `?${createSearchParams(params)}`,
    };

    return navigate(to);
  };
};

export default useNavigateSearch;
