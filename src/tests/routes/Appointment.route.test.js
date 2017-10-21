import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({
  adapter: new Adapter()
});

import {Appointment} from '../../routes/Appointment';

describe('<Appointment />', () => {
  describe('should render without crashing', () => {
    it('renders without crashing', () => {
      mount(<Appointment store={{}}  dispatch={()=>{}}/>);
    });
  });
});