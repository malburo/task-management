import { Grid, Pagination, Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';
import whiteboardApi from 'api/whiteboardApi';
import SideBar from 'components/SideBar';
import BoardSkeleton from 'features/Boards/components/skeleton/BoardSkeleton';
import { IParams } from 'models/common';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useParams } from 'react-router-dom';
import AddWhiteboard from '../components/AddWhiteboard';
import WhiteboardCard from '../components/WhiteboardCard';

interface Params {
  boardId: string;
}

const Whiteboards = () => {
  const [whiteboardList, setWhiteboardList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { boardId } = useParams<Params>();
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
      boardId,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    const fetchWhiteboardsData = async () => {
      try {
        setIsLoading(true);
        const { data } = await whiteboardApi.getAll(queryParams);
        setWhiteboardList(data.whiteboards as any[]);
        setPagination(data.pagination);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchWhiteboardsData();
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

  const handleAddBoard = async (value: any) => {
    await whiteboardApi.create(value);
    const fetchBoardsData = async () => {
      try {
        setIsLoading(true);
        const { data } = await whiteboardApi.getAll(queryParams);
        setWhiteboardList(data.whiteboards as any[]);
        setPagination(data.pagination);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchBoardsData();
  };
  return (
    <Box p="40px">
      <Grid container>
        <Box height="500px" width="90%" sx={{ position: 'relative' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom="24px">
            <AddWhiteboard onSubmit={handleAddBoard} />
          </Stack>
          <Grid container spacing={4}>
            {isLoading
              ? [...new Array(Number(queryParams.limit) || 12)].map((data, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <BoardSkeleton />
                  </Grid>
                ))
              : whiteboardList.map((whiteboard) => (
                  <Grid item xs={6} sm={4} md={3} key={whiteboard._id}>
                    <WhiteboardCard data={whiteboard} />
                  </Grid>
                ))}
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
        </Box>
      </Grid>
    </Box>
  );
};

export default Whiteboards;
