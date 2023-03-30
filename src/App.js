import React, { Suspense, Fragment, useContext } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { routes } from "src/routes";
import { createBrowserHistory } from "history";
import UserContext, { UserContext as userAuthContext } from "src/context/User";
import PageLoading from "src/component/PageLoading";
import AuthGuard, { BlockGuard } from "src/component/AuthGuard";
import { ThemeProvider } from "@material-ui/core";
import "./app.css";
import "react-image-crop/dist/ReactCrop.css";
import { createTheme } from "src/theme";
const history = createBrowserHistory();

function App() {
  const theme = createTheme();

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <UserContext>
            <Router history={history}>
              <RenderRoutes data={routes} />
            </Router>
          </UserContext>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

function RenderRoutes(props) {
  const user = useContext(userAuthContext);
  return (
    <Suspense fallback={<PageLoading />}>
      {user?.isLoading ? (
        <PageLoading />
      ) : (
        <Switch>
          {props.data.map((route, i) => {
            const Component = route.component;
            const Guard = route.guard ? AuthGuard : Fragment;
            const Layout = route.layout || Fragment;

            return (
              <Route
                exact={route.exact}
                key={i}
                path={route.path}
                render={(props) => (
                  // <BlockGuard>
                  <Guard>
                    <Layout>
                      {route.routes ? (
                        <RenderRoutes data={route.routes} />
                      ) : (
                        <Component {...props} />
                      )}
                    </Layout>
                  </Guard>
                  // </BlockGuard>
                )}
              />
            );
          })}
        </Switch>
      )}
    </Suspense>
  );
}
