import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableRow, TableHead, TableContainer, TableBody, Paper } from '@mui/material';
// import { useTranslation, useLanguageQuery, LanguageSwitcher } from 'next-export-i18n';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#B9BBBD4D',
    color: '#A60363',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '16px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width: '50%',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    // hide last border
  },
  '&:last-child td, &:last-child th': {
    border: 1,
  },
}));

function createData(question, answer) {
  return { question, answer };
}

const ProfileTable = ({ user }) => {
  // const { t: translations } = useTranslation();
  const rows = [
    createData(
      `I Speak:`,
      user?.languages?.length
        ? user?.languages?.map((item, i) => (
          <span key={i}>
            {item || item.label}
            {i !== user?.languages?.length - 1 && <>, </>}
          </span>
        ))
        : `No Answer`,
    ),
    createData(`Education:`, user?.education ? user?.education : `No Answer`),
    createData(`Occupation:`, user?.occupation ? user?.occupation : `No Answer`),
    createData(`Religion:`, user?.religion ? user?.religion : `No Answer`),
    createData(`Marital Status:`, user?.martialStatus ? user?.martialStatus : `No Answer`),
    createData(`Kids:`, user?.kids ? user?.kids : `No Answer`),
    createData(`I Smoke:`, user?.smoking ? user?.smoking : `No Answer`),
    createData(`I Drink:`, user?.drink ? user?.drink : `No Answer`),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: { sm: 700, xs: '100%' } }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Questions</StyledTableCell>
            <StyledTableCell>Answers</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" width={100}>
                {row.question}
              </StyledTableCell>
              <StyledTableCell>{row.answer}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProfileTable;
