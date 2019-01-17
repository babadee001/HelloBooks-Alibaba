import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';


const $ = require('jquery');

global.$ = global.jQuery = $;
global.Materialize = { toast: jest.fn(Promise.resolve(1)) };
window.jQuery = $;
global.sweetalert = jest.genMockFromModule('sweetalert');

global.$ = jest.fn(() => ({
  sideNav: jest.fn(),
  ready: jest.fn(),
  modal: jest.fn()

}));
global.event = {
  preventDefault: jest.fn(),
  target: {
    getAttribute: jest.fn(),
    files: [{
      type: ''
    }],
    parentNode: {
      getAttribute: jest.fn()
    }
  }
};
global.files = [{
  type: ''
}];
global.map = jest.fn();
document.getElementById = jest.fn(() => ({
  click: jest.fn()
}));
global.FileReader = jest.fn();
global.toastr = { toastr: () => { } };
global.history = { push: jest.fn() };
global.history = { replace: jest.fn() };
global.match = { params: {} };

configure({ adapter: new Adapter() });
