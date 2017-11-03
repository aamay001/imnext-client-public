import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({
  adapter: new Adapter(),
});

import { NavBar } from '../../components/NavBar';

describe('<NavBar />', () => {
  describe('should render without crashing', () => {
    it('renders without crashing', () => {
      const history = {
        listen: () => {},
      };
      const location = {
        pathname: '',
      };
      shallow(<NavBar history={history} location={location} />);
    });
  });
});
