import { Grid, Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Tldraw, TldrawApp } from '@tldraw/tldraw';
import { socketClient } from 'api/socketClient';
import whiteboardApi from 'api/whiteboardApi';
import SideBar from 'components/SideBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface IParams {
  boardId: string;
  whiteboardId: string;
}
const myDocument: any = {
  id: 'page1',
  name: 'page1',
  version: TldrawApp.version,
  pages: {
    page1: {
      id: 'page1',
      shapes: {},
      bindings: {},
    },
  },
  pageStates: {
    page1: {
      id: 'page1',
      selectedIds: [],
      currentParentId: 'page1',
      camera: {
        point: [0, 0],
        zoom: 1,
      },
    },
  },
};
const Whiteboard = () => {
  const [document, setDocument] = useState<any>(() => myDocument);

  const { whiteboardId } = useParams<IParams>();

  useEffect(() => {
    socketClient.emit('whiteboard:join', whiteboardId);
    return () => {
      socketClient.emit('whiteboard:leave', whiteboardId);
    };
  }, [whiteboardId]);

  useEffect(() => {
    (async () => {
      const { data } = await whiteboardApi.getOne(whiteboardId);
      const newDocument = { ...document };
      if (!data.whiteboard.content) {
        setDocument({
          id: 'page1',
          name: 'page1',
          version: TldrawApp.version,
          pages: {
            page1: {
              id: 'page1',
              shapes: {},
              bindings: {},
            },
          },
          pageStates: {
            page1: {
              id: 'page1',
              selectedIds: [],
              currentParentId: 'page1',
              camera: {
                point: [0, 0],
                zoom: 1,
              },
            },
          },
        });
        return;
      }
      newDocument.pages.page1 = data.whiteboard.content.page;
      setDocument(newDocument);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whiteboardId]);

  useEffect(() => {
    socketClient.on('whiteboard:update', (data: any) => {
      const newDocument = { ...document };
      newDocument.pages.page1 = data.content.page;
      setDocument(newDocument);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (data: any) => {
    try {
      await socketClient.emit('test');

      const payload = {
        content: {
          page: data.getPage(),
          pageStates: data.getPageState(),
        },
      };
      await whiteboardApi.update(whiteboardId, payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack direction="row">
      <SideBar />
      <Box height="100vh" flex={1}>
        <Box height="65px" />
        <Box display="flex" component={Paper} height="calc(100vh - 65px)" position="relative">
          <Grid container>
            <Box
              sx={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                width: '100%',
                height: '100%',
              }}
            >
              <Tldraw document={document} onCommand={handleChange} />
            </Box>
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
};

export default Whiteboard;
