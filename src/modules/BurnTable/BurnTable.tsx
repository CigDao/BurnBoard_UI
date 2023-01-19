import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import { useCanister } from '@connect2ic/react';
import { _SERVICE as _TAXCOLLECTOR_ACTOR } from '../../declarations/taxcollector';
import { bigIntToDecimalPrettyString } from '@utils/util';
import { AvatarGenerator } from 'random-avatar-generator';

const columns: GridColDef[] = [
  { field: 'avatar', headerName: 'Avatar', width: 65, sortable: false, renderCell: (params) => <img width="50" src={params.value} /> },
  { field: 'principal', headerName: 'Principal', width: 500, sortable: false },
  { field: 'earnedAmount', headerName: 'Earned Amount', width: 130, sortable: false },
  { field: 'burnedAmount', headerName: 'Burned Amount', width: 130, sortable: false }
];


export default function BurnTable() {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState<any[]>([]);

	const [_taxcollectorActor] = useCanister('taxcollector');
	const taxCollectorActor = _taxcollectorActor as unknown as _TAXCOLLECTOR_ACTOR;
  const [rowCountState, setRowCountState] = React.useState (0);
  const generator = new AvatarGenerator();

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

  return (
      <Paper sx={{ bgcolor: 'white', height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.principal}
          paginationMode="server"
          rows={rows}
          columns={columns}
          loading={loading}
          rowCount={rowCountState}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => pageChange(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </Paper>
    );
}

