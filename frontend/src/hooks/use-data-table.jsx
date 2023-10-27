import { useContext } from 'react';
import DataTableContext from '../contexts/data-table';

const useDataTable = () => {
  return useContext(DataTableContext);
};

export default useDataTable;
