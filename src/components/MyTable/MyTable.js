import React, { Fragment, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';

import MyConfirmation from '../MyConfirmation/MyConfirmation';


/**
 * Descending comparator.
 *
 * @param a
 * @param b
 * @param orderBy
 * @returns {number}
 */
function descendingComparator(a, b, orderBy) {
  const index = a.findIndex((item) => item.column === orderBy);

  if (index === -1) {
    return 0;
  }

  if (b[index].value < a[index].value) {
    return -1;
  }
  if (b[index].value > a[index].value) {
    return 1;
  }
  return 0;
}

/**
 * Get comparator.
 *
 * @param order
 * @param orderBy
 * @returns {{(*, *): number, (*, *): number}}
 */
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * Enhanced table head.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box
                  component="span"
                  sx={visuallyHidden}
                >
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

/**
 * My Table Component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MyTable = ({ title, rows, columns }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentDialog, setCurrentDialog] = useState({});

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * Handle click delete.
   */
  const handleClickDelete = ({ id }) => {
    setOpenDeleteDialog(true);
    setCurrentDialog(id);
  };

  /**
   * Handle on close delete dialog.
   *
   * @param shouldDelete
   * @param id
   * @param handleDelete
   */
  const handleOnCloseDeleteDialog = (shouldDelete, { id, handleDelete }) => {
    setOpenDeleteDialog(false);

    if (shouldDelete) {
      handleDelete(id);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* title */}
        <Toolbar
          sx={{
            pl: {
              sm: 2,
            },
            pr: {
              xs: 1,
              sm: 1,
            },
          }}
        >
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        </Toolbar>

        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
            }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
            />
            <TableBody>
              {rows.slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                  >
                    {row.map((item, itemIndex) => (
                      <Fragment
                        key={itemIndex}
                      >
                        {item.column.includes('id') === true && (
                          <TableCell
                            component="th"
                            scope="row"
                            padding="normal"
                          >
                            {item.value}
                          </TableCell>
                        )}
                        {item.column.includes('id') === false && (
                          <TableCell
                            align="left"
                            padding="normal"
                          >
                            {item.column.includes('options') === true && (
                              <Stack
                                direction="row"
                                alignItems="center"
                              >
                                {item.payload.handleDelete !== undefined && (
                                  <Fragment>
                                    <IconButton
                                      onClick={() => handleClickDelete(item.payload)}
                                      size="small"
                                    >
                                      <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                    {currentDialog === item.payload.id && (
                                      <MyConfirmation
                                        onClose={(shouldDelete) => handleOnCloseDeleteDialog(shouldDelete, item.payload)}
                                        title="Eliminar registro"
                                        message="¿Está seguro que desea eliminar este registro?"
                                        open={openDeleteDialog}
                                      />
                                    )}
                                  </Fragment>
                                )}
                                {item.payload.handleEdit !== undefined && (
                                  <IconButton
                                    size="small"
                                    onClick={() => item.payload.handleEdit(item.payload.id)}
                                  >
                                    <EditIcon fontSize="inherit" />
                                  </IconButton>
                                )}
                                {item.payload.handleView !== undefined && (
                                  <IconButton
                                    size="small"
                                    onClick={() => item.payload.handleView(item.payload.id)}
                                  >
                                    <VisibilityIcon fontSize="inherit" />
                                  </IconButton>
                                )}
                              </Stack>
                            )}

                            {item.column.includes('options') === false && (
                              item.value
                            )}
                          </TableCell>
                        )}
                      </Fragment>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>
    </Box>
  );
};

MyTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        column: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        payload: PropTypes.object,
      })
    )
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

MyTable.defaultProps = {};

export default MyTable;