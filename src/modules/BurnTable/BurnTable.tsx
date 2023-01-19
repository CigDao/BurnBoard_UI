import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter, GridValueGetterParams } from '@mui/x-data-grid';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import { useCanister, useConnect } from '@connect2ic/react';
import { _SERVICE as _TAXCOLLECTOR_ACTOR } from '../../declarations/taxcollector';
import { bigIntToDecimalPrettyString } from '@utils/util';
import { AvatarGenerator } from 'random-avatar-generator';
import { theme } from '@misc/theme';


export default function BurnTable() {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(50);
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState<any[]>([]);

	const [_taxcollectorActor] = useCanister('taxcollector');
	const taxCollectorActor = _taxcollectorActor as unknown as _TAXCOLLECTOR_ACTOR;
  const [rowCountState, setRowCountState] = React.useState (0);
  const generator = new AvatarGenerator();
	const { principal } = useConnect();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const columns: GridColDef[] = [
    { field: 'rank', headerName: 'Rank', 
    width: 10, sortable: false, 
    renderCell: (params) => <Typography variant="button" display="block" gutterBottom>{params.value}</Typography> },
    { field: 'avatar', headerName: 'Avatar',
    width: 65, filterable: false, sortable: false, renderCell: (params) => <img width="50" src={params.value} /> },
    { field: 'principal', headerName: 'Principal', 
    width: isSmallScreen ? 100 : 500, sortable: false, renderCell: (params) => isSmallScreen ? params.value.slice(0, 4) + "..." + params.value.slice(params.value.length - 3, params.value.length) : params.value},
    { field: 'earnedAmount', headerName: 'Earned', filterable: false, 
    width: isSmallScreen ? 100 : 180, sortable: false },
    { field: 'burnedAmount', headerName: 'Burned', filterable: false,
     width: isSmallScreen ? 100 : 180, sortable: false }
  ];
  
  React.useEffect(() => {
    intialize().then(()=> {
      setLoading(false);
    });
  }, []);


  async function intialize() {
    const burnerCount = await taxCollectorActor.getBurnerCount();
    setRowCountState(Number(burnerCount));
    await nextPage(0);
  }


  async function nextPage(page: number) {
    const start = page === 0 ? 0 : page + pageSize;
    const burnerPage = await taxCollectorActor.fetchBurners(BigInt(start), BigInt(pageSize));
    const innerRow: any[] = [];
    for (let index = 0; index < burnerPage.length; index++) {
      const burner = burnerPage[index];
      const principal = burner[0];
      const burnedAmount = burner[1].burnedAmount;
      const earnedAmount = burner[1].earnedAmount;
      if (principal.toString() !== "6ox57-5aaaa-aaaap-qaw4q-cai") {
        innerRow.push({
          rank: index + 1,
          principal: principal.toString(), 
          earnedAmount: bigIntToDecimalPrettyString(earnedAmount) + ' YC', 
          burnedAmount: bigIntToDecimalPrettyString(burnedAmount) + ' YC',
          avatar: generator.generateRandomAvatar(principal.toString())
        });
      }
    }
    setRows(innerRow);
  }

  function pageChange(inPage: number) {
    setLoading(true);
    console.log(inPage)
    nextPage(inPage).then(() => {
      setPage(inPage);
      setLoading(false);
    });
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
        <GridToolbarColumnsButton />
      </GridToolbarContainer>
    );
  }

  return (
      <Paper className='mui-button-override' sx={{ bgcolor: 'white', height: 1200, width: '100%' }}>
        <DataGrid
          rowHeight={75}
          getRowId={(row) => row.principal}
          paginationMode="server"
          rows={rows}
          columns={columns}
          loading={loading}
          rowCount={rowCountState}
          rowsPerPageOptions={[50]}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                avatar: !isSmallScreen,
                rank: !isSmallScreen,
              },
            },
          }}
          components={{ Toolbar: CustomToolbar }}
          getRowClassName={(params) => {
            return params.id === principal ? "selected-row" : "";
          }}
          pagination
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => pageChange(newPage)}
        />
      </Paper>
    );
}

