import 'bootstrap/dist/css/bootstrap.min.css';
import React, { lazy, Suspense } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import './styles.scss';
import Layout from "../../HOC/Layout/Layout";
const Home = lazy(() => import('../../containers/Home/index'));
const App = () => {
  return (
      <div className="car-container">
        <Layout>
            <Suspense
                fallback={
                    <Backdrop open>
                        <CircularProgress />
                    </Backdrop>
                }
            >
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
            </Suspense>
        </Layout>
      </div>
  )

}

export default App;
