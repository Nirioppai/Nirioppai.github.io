import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { Box, Button, Grid, IconButton, Paper } from '@mui/material';
import type { ButtonProps, IconButtonProps } from '@mui/material';
import {
  ColDef,
  ColGroupDef,
  GridReadyEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import clsx from 'clsx';
import {
  Archive as ArchiveIcon,
  EyeArrowRight as EyeArrowRightIcon,
  Pencil as PencilIcon,
  PlusBox as PlusBoxIcon,
  Plus as PlusIcon,
} from 'mdi-material-ui';

import { agGridStyles } from './agGridStyles';

import {
  ArchiveDialog,
  ArchiveDialogProps,
  ContainedSearchbar,
  ErrorAlert,
  LoadingIndicator,
} from '~/components';
import { createHashMap } from '~/utils';

interface AddModalProps {
  open: boolean;
  onClose: () => void;
  [key: string]: any;
}

interface AddAnotherModalProps<T> extends AddModalProps {
  data: T;
  setData?: Dispatch<SetStateAction<T | null>>;
}

interface EditModalProps<T> extends AddModalProps {
  data: T;
  setData?: Dispatch<SetStateAction<T | null>>;
}

interface ViewModalProps<T> extends AddModalProps {
  data: T;
  setData?: Dispatch<SetStateAction<T | null>>;
}

interface DynamicAgGridProps<T> extends AgGridReactProps {
  // fetching states
  isLoading?: boolean;
  isError?: boolean;
  // CRUD
  actions?: {
    add?: boolean;
    addAnother?: boolean;
    edit?: boolean;
    view?: boolean;
    archive?: boolean;
  };
  addText?: string;
  addAnotherText?: string;
  actionsProps?: {
    add?: ButtonProps;
    addAnother: ButtonProps;
    edit?: IconButtonProps;
    view?: IconButtonProps;
    archive?: IconButtonProps;
  };
  ArchiveDialogProps?: ArchiveDialogProps;
  onArchive?: (row: T) => any | Promise<any>;
  selectedItemNameGetter?: (row: T) => string;
  AddModal?: FC<any>;
  AddAnotherModal?: FC<any>;
  EditModal?: FC<any>;
  ViewModal?: FC<any>;
  AddModalProps?: Partial<AddModalProps>;
  AddAnotherModalProps?: Partial<AddAnotherModalProps<T>>;
  EditModalProps?: Partial<EditModalProps<T>>;
  ViewModalProps?: Partial<ViewModalProps<T>>;
  // AG Grid
  rowData: T[];
  columnDefs: (ColDef | ColGroupDef)[];
  pinActionsColumn?: boolean;
  dynamicHeight?: boolean;
  heightTemplate?: 'no-sub' | 'tab';
  // permissions
  // disableWrite?: boolean;
  searchBarWidth?: number | string;
  onRowClicked?: (event: any) => void;
}

const DynamicAgGrid = <T extends { _id: string }>({
  rowData,
  columnDefs: columnDefsProp,
  pinActionsColumn,
  // fetching states
  isLoading,
  isError,
  // CRUD
  actions,
  addText = 'Add',
  addAnotherText = 'Add',
  actionsProps,
  AddModal,
  AddModalProps,
  AddAnotherModal,
  AddAnotherModalProps,
  EditModal,
  EditModalProps,
  ViewModal,
  ViewModalProps,
  ArchiveDialogProps,
  onArchive,
  selectedItemNameGetter,
  dynamicHeight,
  searchBarWidth = 400,
  onRowClicked,
  // permissions
  // disableWrite,
  // AG Grid extras
  ...rest
}: DynamicAgGridProps<T>) => {
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  // add modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  // add another modal
  const [addAnotherModalOpen, setAddAnotherModalOpen] = useState(false);
  const openAddAnotherModal = () => setAddAnotherModalOpen(true);
  const closeAddAnotherModal = () => setAddAnotherModalOpen(false);

  // edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const closeEditModal = () => setEditModalOpen(false);

  // view modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const closeViewModal = () => setViewModalOpen(false);

  // hash map for archives
  const indexedRowDataMap = createHashMap(rowData, '_id', (_, index) => ({
    index,
  }));

  // archive modal
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const closeArchiveModal = () => setArchiveModalOpen(false);

  // AG Grid
  const [gridApi, setGridApi] = useState<GridReadyEvent['api'] | null>(null);
  const [quickFilterText, setQuickFilterText] = useState('');

  interface ButtonRendererProps extends ICellRendererParams {
    onClick: (rowData: any) => void;
    data: any;
  }

  const ButtonRenderer: React.FC<ButtonRendererProps> = ({ data, onClick }) => {
    return (
      <span className='ag-custom-font-override'>
        <IconButton
          size='small'
          edge='end'
          aria-label='archive row'
          onClick={() => onClick(data)}
        >
          <PlusBoxIcon fontSize='small' />
        </IconButton>
      </span>
    );
  };

  const frameworkComponents = {
    buttonRenderer: ButtonRenderer,
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    if (dynamicHeight) {
      params.api.setDomLayout('autoHeight');
    }
  };

  const updateQuickFilterText = (e: ChangeEvent<HTMLInputElement>) => {
    setQuickFilterText(e.target.value);
    gridApi?.setQuickFilter(e.target.value);
  };

  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([]);

  useEffect(() => {
    const openEditModal = (row: T) => {
      setSelectedRow(row);
      setEditModalOpen(true);
    };

    const openViewModal = (row: T) => {
      setSelectedRow(row);
      setViewModalOpen(true);
    };

    const openArchiveModal = (row: T) => {
      setSelectedRow(row);
      setArchiveModalOpen(true);
    };

    // get actions column width
    const actionsCount =
      Number(!!actions?.edit) +
      Number(!!actions?.archive) +
      Number(!!actions?.view);

    const actionsColumnWidth = actionsCount ? 45 + actionsCount * 38 : 0;

    const actionsColumn = {
      headerName: '',
      field: 'actions',
      sortable: false,
      filter: false,
      pinned: pinActionsColumn ? 'right' : false,
      cellRenderer: ({ data }: { data: T }) => (
        <span className='ag-custom-font-override'>
          {actions?.view && (
            <IconButton
              size='small'
              aria-label='view row'
              onClick={() => openViewModal(data)}
              // disabled={disableWrite}
              {...actionsProps?.view}
            >
              <EyeArrowRightIcon fontSize='small' />
            </IconButton>
          )}
          {actions?.edit && (
            <IconButton
              size='small'
              aria-label='edit row'
              onClick={() => openEditModal(data)}
              // disabled={disableWrite}
              {...actionsProps?.edit}
            >
              <PencilIcon fontSize='small' />
            </IconButton>
          )}
          {actions?.archive && (
            <IconButton
              size='small'
              edge='end'
              aria-label='archive row'
              onClick={() => openArchiveModal(data)}
              // disabled={disableWrite}
              {...actionsProps?.archive}
            >
              <ArchiveIcon fontSize='small' />
            </IconButton>
          )}
        </span>
      ),
      minWidth: actionsColumnWidth,
      maxWidth: actionsColumnWidth,
    };

    setColumnDefs(
      // @ts-ignore
      actionsCount ? [...columnDefsProp, actionsColumn] : columnDefsProp
    );
  }, [columnDefsProp, actions, actionsProps, pinActionsColumn, gridApi]);

  if (isLoading) return <LoadingIndicator />;

  if (isError) return <ErrorAlert />;

  return (
    <>
      <>
        <Grid container spacing={2} style={{ marginBottom: '1rem' }}>
          <Grid xs item>
            <ContainedSearchbar
              maxWidth={searchBarWidth}
              value={quickFilterText}
              onChange={updateQuickFilterText}
              onClear={() => setQuickFilterText('')}
            />
          </Grid>
          {actions?.add && (
            <Grid item sm='auto'>
              <Button
                variant='contained'
                startIcon={<PlusIcon />}
                onClick={openAddModal}
                // disabled={!canModify}
                {...actionsProps?.add}
              >
                {addText}
              </Button>
            </Grid>
          )}
          {actions?.addAnother && (
            <Grid item sm='auto'>
              <Button
                variant='contained'
                startIcon={<PlusIcon />}
                onClick={openAddAnotherModal}
                // disabled={!canModify}
                {...actionsProps?.addAnother}
              >
                {addAnotherText}
              </Button>
            </Grid>
          )}
        </Grid>
        <Box sx={agGridStyles}>
          <Paper className={clsx(['ag-theme-material', 'ag-theme-custom'])}>
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              rowHeight={50}
              enterMovesDownAfterEdit
              undoRedoCellEditing
              undoRedoCellEditingLimit={50}
              onRowClicked={onRowClicked}
              frameworkComponents={frameworkComponents}
              defaultColDef={{
                sortable: true,
                flex: 1,
                minWidth: 100,
                filter: true,
                resizable: true,
                lockPosition: true,
              }}
              suppressDragLeaveHidesColumns
              tooltipShowDelay={500}
              onGridReady={onGridReady}
              {...rest}
            />
          </Paper>
        </Box>
      </>
      {AddModal && actions?.add && (
        <AddModal
          open={addModalOpen}
          onClose={closeAddModal}
          {...AddModalProps}
        />
      )}
      {AddAnotherModal && actions?.addAnother && (
        <AddAnotherModal
          open={addAnotherModalOpen}
          onClose={closeAddAnotherModal}
          {...AddAnotherModalProps}
        />
      )}
      {selectedRow && (
        <>
          {actions?.archive && (
            <ArchiveDialog
              open={archiveModalOpen}
              onClose={closeArchiveModal}
              onArchive={async () => {
                try {
                  await onArchive?.(selectedRow);
                } finally {
                  closeArchiveModal();
                }
              }}
              itemName={
                selectedItemNameGetter
                  ? selectedItemNameGetter(selectedRow)
                  : (() => {
                      const rowDataMapItem = indexedRowDataMap.get(
                        selectedRow._id
                      );

                      return (
                        // @ts-ignore
                        rowDataMapItem?.name ||
                        (rowDataMapItem?.index
                          ? `Row ${rowDataMapItem.index + 1}`
                          : '')
                      );
                    })()
              }
              {...ArchiveDialogProps}
            />
          )}
          {EditModal && actions?.edit && (
            <EditModal
              open={editModalOpen}
              onClose={closeEditModal}
              data={selectedRow}
              setData={setSelectedRow}
              {...EditModalProps}
            />
          )}

          {ViewModal && actions?.view && (
            <ViewModal
              open={viewModalOpen}
              onClose={closeViewModal}
              data={selectedRow}
              setData={setSelectedRow}
              {...ViewModalProps}
            />
          )}
        </>
      )}
    </>
  );
};

export default DynamicAgGrid;
