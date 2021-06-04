import { memo } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';

import pages from '@pages';
import App from '../App';

const Router = () => {
  return (
    <BrowserRouter>
      <ul className="Navigation">
        {pages.map(({ name, route }) => (
          <NavLink
            key={route}
            className="NavLink"
            activeClassName="NavLinkActive"
            exact
            to={`/${route}`}
          >
            {name}
          </NavLink>
        ))}
      </ul>
      <App>
        <Switch>
          {pages.map(({ cmp, route }) => (
            <Route key={route} path={`/${route}`} exact component={cmp} />
          ))}
          <Redirect to="/" />
        </Switch>
      </App>
    </BrowserRouter>
  );
};

export default memo(Router);
