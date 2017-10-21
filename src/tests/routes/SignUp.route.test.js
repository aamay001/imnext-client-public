import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({
  adapter: new Adapter()
});

import {SignUp} from '../../routes/SignUp';

describe('<SignUp />', () => {
  describe('renders without crashing', () => {
    it('renders without crashing', () => {
      shallow(<SignUp />);
    });
  });
});