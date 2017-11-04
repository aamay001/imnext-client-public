import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({
  adapter: new Adapter(),
});

import { Dashboard } from '../../routes/Dashboard';

describe('<Dashboard />', () => {
  describe('should render without crahsing', () => {
    it('render without crashing', () => {
      const history = {
        replace: () => {},
      };
      shallow(<Dashboard history={history} />);
    });
  });
});
