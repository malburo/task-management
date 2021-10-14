import { Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import boardApi from 'api/boardApi';
import Footer from 'components/Footer';
import { IBoard } from 'models/board';
import { IParams } from 'models/common';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import BoardCard from '../components/BoardCard';
import AddBoard, { AddBoardFormValues } from '../components/form/AddBoard';

const Boards = () => {
  const [boardList, setBoardList] = useState<IBoard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = useLocation();
  const history = useHistory();
  const [pagination, setPagination] = useState<IParams>({
    limit: '0',
    page: '0',
  });

  const queryParams = useMemo<any>(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 8,
    };
  }, [location.search]);

  useEffect(() => {
    const fetchBoardsData = async () => {
      try {
        setIsLoading(true);
        const { data } = await boardApi.getAll(queryParams);
        setBoardList(data.boards as IBoard[]);
        setPagination(data.pagination);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchBoardsData();
  }, [queryParams, boardList.length]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    const filters = {
      ...queryParams,
      page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleAddBoard = async (value: AddBoardFormValues) => {
    await boardApi.create(value);
    setBoardList([]);
  };
  return (
    <>
      <Container sx={{ height: '100vh', marginTop: '100px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom="24px">
          <Typography variant="regular6">All Boards</Typography>
          <AddBoard onSubmit={handleAddBoard} />
        </Stack>
        <Grid container spacing={4}>
          {isLoading
            ? 'fetch data'
            : boardList.map((board) => (
                <Grid item xs={6} sm={4} md={3} key={board._id}>
                  <BoardCard data={board} />
                </Grid>
              ))}
        </Grid>
        <Box marginTop="48px" display="flex" justifyContent="center">
          <Pagination
            color="primary"
            count={Math.ceil(pagination.total / parseInt(pagination.limit)) || 0}
            page={parseInt(pagination.page)}
            onChange={handlePageChange}
            shape="rounded"
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Boards;
