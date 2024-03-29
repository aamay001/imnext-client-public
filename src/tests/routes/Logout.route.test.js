import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({
  adapter: new Adapter(),
});

import { Logout } from '../../routes/Logout';

describe('<Logout />', () => {
  describe('should render without crashing', () => {
    it('renders without crashing', () => {
      const history = {
        replace: () => {},
      };
      shallow(<Logout dispatch={() => {}} history={history} />);
    });
  });
});
