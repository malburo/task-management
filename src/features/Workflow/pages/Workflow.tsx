import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';
import columnApi from 'api/columnApi';
import { RootState } from 'app/store';
import SideBar from 'components/SideBar';
import dagre from 'dagre';
import { columnsSelector } from 'features/Boards/boardSlice';
import AddColumn from 'features/Boards/components/column/AddColumn';
import { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  Node,
  ReactFlowProvider,
} from 'react-flow-renderer';
import { useSelector } from 'react-redux';
import FloatingEdge from '../components/FloatingEdge';

const edgeTypes = {
  floating: FloatingEdge,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: any) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const Workflow = () => {
  const [initialNodes, initialEdges] = useSelector((state: RootState) => {
    const allColumn = columnsSelector.selectAll(state);
    const edges = allColumn.reduce((acc: any, current: any) => {
      let ccc = current.workflows.reduce((array: any, currentValue: any, index2: any) => {
        const item = {
          id: `${current._id}-${index2}`,
          source: current._id,
          target: currentValue,
          type: 'floating',
          style: { strokeWidth: 2 },
          markerEnd: { type: MarkerType.Arrow },
        };
        array.push(item);
        return array;
      }, []);
      acc.push(ccc);
      return acc;
    }, []);
    const nodes = allColumn.map((column, i) => {
      return {
        id: column._id,
        data: { label: column.title },
        // position: { x: 100, y: 100 * i },
      };
    });
    return [nodes, edges.flat()];
  });

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);

  const [edges, setEdges] = useState<Edge[]>(layoutedEdges);
  const [nodes, setNodes] = useState<Node[]>(layoutedNodes);
  const [openDeleteNode, setOpenDeleteNode] = useState(false);
  const [openDeleteEdge, setOpenDeleteEdge] = useState(false);
  const [currentDeleteNodeId, setCurrentDeleteNodeId] = useState<string>('');
  const [currentDeleteEdge, setCurrentDeleteEdge] = useState<any>({});

  const onConnect = useCallback(async (connection: Connection) => {
    if (!connection.source || !connection.target) return;
    await columnApi.pushWorkflow({ columnId: connection.source, data: connection.target });
  }, []);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const onNodesDelete = (nodes: any) => {
    console.log(nodes);
    if (nodes.length === 0) return;
    setCurrentDeleteNodeId(nodes[0].id);
    setOpenDeleteNode(true);
  };
  const handleConfirmedDeleteNode = async () => {
    await columnApi.deleteOne({ columnId: currentDeleteNodeId });
    setOpenDeleteNode(false);
    setCurrentDeleteNodeId('');
  };

  const handleCloseDeleteNode = () => {
    setOpenDeleteNode(false);
    setCurrentDeleteNodeId('');
  };

  const onEdgesDelete = async (edges: Edge[]) => {
    if (edges.length > 1) return;
    const { source, target } = edges[0];
    setCurrentDeleteEdge({ source, target });
    setOpenDeleteEdge(true);
  };
  const handleConfirmedDeleteEdge = async () => {
    await columnApi.pullWorkflow({ columnId: currentDeleteEdge.source, data: currentDeleteEdge.target });
    setOpenDeleteEdge(false);
    setCurrentDeleteEdge({});
  };

  const handleCloseDeleteEdge = () => {
    setOpenDeleteEdge(false);
    setCurrentDeleteEdge({});
  };

  return (
    <Stack direction="row">
      <SideBar />
      <Box height="100vh" flex={1}>
        <Box height="65px" />
        <Box display="flex" component={Paper} height="calc(100vh - 65px)">
          <Grid container>
            <Box height="800px" width="90%">
              <ReactFlowProvider>
                <ReactFlow
                  defaultNodes={layoutedNodes}
                  defaultEdges={layoutedEdges}
                  onConnect={onConnect}
                  onEdgesDelete={onEdgesDelete}
                  onNodesDelete={onNodesDelete}
                  fitView
                  edgeTypes={edgeTypes}
                >
                  <Background />
                  <Controls />
                </ReactFlow>
              </ReactFlowProvider>
              <AddColumn />
              <div className="controls">
                <button onClick={() => onLayout('TB')}>vertical layout</button>
                <button onClick={() => onLayout('LR')}>horizontal layout</button>
              </div>
            </Box>
          </Grid>
        </Box>
      </Box>
      <Dialog
        open={openDeleteNode}
        onClose={handleCloseDeleteNode}
        aria-labelledby="node-title"
        aria-describedby="node-description"
      >
        <DialogContent>
          <Box padding="24px">
            <DialogContentText id="node" style={{ color: '#afafaf', fontSize: 20, fontWeight: 500 }}>
              Are you sure delete this node?
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteNode} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleConfirmedDeleteNode} color="primary" variant="contained" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteEdge}
        onClose={handleCloseDeleteEdge}
        aria-labelledby="edge-title"
        aria-describedby="edge-description"
      >
        <DialogContent>
          <Box padding="24px">
            <DialogContentText id="edge-description" style={{ color: '#afafaf', fontSize: 20, fontWeight: 500 }}>
              Are you sure delete this edge?
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteEdge} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleConfirmedDeleteEdge} color="primary" variant="contained" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Workflow;
