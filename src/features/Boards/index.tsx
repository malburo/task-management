import { Route, Switch } from 'react-router-dom';

const BoardFeature: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path={`/boards`} component={Boards} />
      </Switch>
    </>
  );
};

export default BoardFeature;
