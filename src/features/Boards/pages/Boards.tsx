import { Container, Grid, Pagination, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import boardApi from 'api/boardApi';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { IBoard } from 'models/board';
import { IParams } from 'models/common';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import AddBoard, { AddBoardFormValues } from '../components/board/AddBoard';
import BoardCard from '../components/board/BoardCard';
import BoardFilter from '../components/BoardFilter';
import BoardSkeleton from '../components/skeleton/BoardSkeleton';
import Empty from 'images/Empty.svg';
import EmptyData from 'components/EmptyData';

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
      limit: Number(params.limit) || 12,
      type: params.type || 'myBoards',
    };
  }, [location.search]);

  useEffect(() => {
    const fetchBoardsData = async () => {
      try {
        setIsLoading(true);
        if (queryParams.type === 'myBoards') {
          const { data } = await boardApi.getMyBoards(queryParams);
          setBoardList(data.boards as IBoard[]);
          setPagination(data.pagination);
        }
        if (queryParams.type === 'myBoardsJoined') {
          const { data } = await boardApi.getMyBoardsJoined(queryParams);
          setBoardList(data.boards as IBoard[]);
          setPagination(data.pagination);
        }
        if (queryParams.type === 'public') {
          const { data } = await boardApi.getAll(queryParams);
          setBoardList(data.boards as IBoard[]);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchBoardsData();
  }, [queryParams]);

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

  const handleTypeChange = (type: 'myBoards' | 'myBoardsJoined' | 'public') => {
    const filters = {
      ...queryParams,
      type,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleAddBoard = async (value: AddBoardFormValues) => {
    await boardApi.create(value);
    const fetchBoardsData = async () => {
      try {
        setIsLoading(true);
        const { data } = await boardApi.getMyBoards(queryParams);
        setBoardList(data.boards as IBoard[]);
        setPagination(data.pagination);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchBoardsData();
  };

  return (
    <>
      <Header />
      <Paper>
        <Container sx={{ minHeight: 'calc(100vh - 80px)', paddingTop: '100px' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom="24px">
            <BoardFilter handleTypeChange={handleTypeChange} type={queryParams.type} />
            <AddBoard onSubmit={handleAddBoard} />
          </Stack>

          <Grid container spacing={4}>
            {isLoading ? (
              [...new Array(Number(queryParams.limit) || 12)].map((data, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <BoardSkeleton />
                </Grid>
              ))
            ) : boardList.length === 0 ? (
              <EmptyData />
            ) : (
              boardList.map((board) => (
                <Grid item xs={6} sm={4} md={3} key={board._id}>
                  <BoardCard data={board} />
                </Grid>
              ))
            )}
          </Grid>
          {Math.ceil(pagination.total / parseInt(pagination.limit)) > 1 && (
            <Box marginTop="48px" display="flex" justifyContent="center" paddingBottom="48px">
              <Pagination
                color="primary"
                count={Math.ceil(pagination.total / parseInt(pagination.limit)) || 0}
                page={parseInt(pagination.page)}
                onChange={handlePageChange}
                shape="rounded"
              />
            </Box>
          )}
        </Container>
      </Paper>
      <Footer />
    </>
  );
};

export default Boards;
