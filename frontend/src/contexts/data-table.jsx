import React, { createContext, useEffect, useMemo, useState } from 'react';

const DataTableContext = createContext(null);

const TableProviderProps = {
  data: [],
  total: 0,
  headCells: [],
  isLoading: false,
  onPagination: (pageNumber, numberRowsPerPage) => {},
  children: null,
  showCheckbox: false,
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const DataTableProvider = ({
  data,
  headCells,
  onPagination,
  isLoading,
  showCheckbox,
  total,
  children,
} = TableProviderProps) => {
  const [visibleRows, setVisibleRows] = useState(data);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('created');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getComparator = useMemo(() => {
    return (order, orderBy) => {
      const descComparatorFn = headCells.find(
        (headCell) => headCell.id === orderBy
      )?.descComparatorFn;

      if (!descComparatorFn) return (a, b) => 0;

      return order === 'desc'
        ? (a, b) => descComparatorFn(a, b)
        : (a, b) => -descComparatorFn(a, b);
    };
  }, [headCells]);

  useEffect(() => {
    const sortedVisibleRows = stableSort(
      data,
      getComparator(order, orderBy)
    ).slice(0, rowsPerPage);
    setVisibleRows(sortedVisibleRows);
  }, [data, rowsPerPage, order, orderBy, getComparator]);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectRow = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const changePageHandler = (event, newPage) => {
    setPage(newPage);

    onPagination(newPage, rowsPerPage);
  };

  const changeRowsPerPageHandler = (event) => {
    const numRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(numRowsPerPage);
    setPage(0);

    onPagination(0, numRowsPerPage);
  };


  const value = {
    data,  // Dữ liệu hiện tại của bảng
    visibleRows, // Các dòng dữ liệu hiển thị trên trang hiện tại
    page, // Số trang hiện tại
    order, // Sắp xếp theo chiều tăng (asc) hoặc giảm (desc)
    orderBy,// Thuộc tính để sắp xếp
    handleRequestSort,// Hàm để yêu cầu sắp xếp dữ liệu
    rowsPerPage,// Số dòng dữ liệu trên mỗi trang
    headCells,// Các cột của bảng
    selected,// Các dòng dữ liệu đã được chọn
    setSelected,// Hàm để chọn các dòng dữ liệu
    setPage,// Hàm để thiết lập trang hiện tại
    isSelected,// Hàm kiểm tra xem một dòng dữ liệu có được chọn hay không
    isLoading,// Trạng thái tải dữ liệu
    changePageHandler,// Hàm xử lý sự kiện chuyển trang
    changeRowsPerPageHandler,// Hàm xử lý sự kiện thay đổi số dòng dữ liệu trên mỗi trang
    handleSelectRow,// Hàm để chọn một dòng dữ liệu
    handleSelectAll,// Hàm để chọn tất cả dòng dữ liệu
    total,// Tổng số dòng dữ liệu
    showCheckbox // phân biệt có checkbox hay ko
  };

  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
};

export default DataTableContext;
