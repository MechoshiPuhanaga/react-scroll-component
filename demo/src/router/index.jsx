import { memo } from 'react';
import {
  BrowserRouter,
  // Redirect,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';

import App from '@root/src/App';

import {} from '@pages';

const Router = () => {
  return (
    <BrowserRouter>
      <ul className="Navigation">
        <NavLink
          className="NavLink"
          activeClassName="NavLinkActive"
          exact
          to="/AsyncSetStateClassCmp"
        >
          AsyncSetStateClassCmp
        </NavLink>
      </ul>
      <App>
        <Switch>
          <Route
            path="/AsyncSetStateClassCmp"
            exact
            component={AsyncSetStateClassCmp}
          />
          <Redirect to={routes.root} />
        </Switch>
      </App>
    </BrowserRouter>
  );
};

export default memo(Router);
