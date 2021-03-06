import expect from 'expect';
import '../testUtils/localStorage';
import {testContext} from '../testUtils/contextMock';
import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import {OwnDocument} from '../../components/userPage/ownedDocs';

const props = {
  documentActions: {
    editDocSuccess: function () {
      return;
    }
  },
  context: {
    router: {
      push: function () {
        return
      }
    }
  },
  stateProp: {
    userState: {
      userData: {}
    },
    userDocs: {
      deleteDoc: {
        _id: '',
        title: '',
        content: ''
      },
      viewDoc: {
        title: '',
        content: '',
        creator: {
          username: ''
        },
        createdAt: ''
      },
      docs: []
    },
    roles: {
      roles: [
        {
          _id: 1,
          role: 'Fellow'
        },
        {
          _id: 2,
          role: 'Trainer'
        }
      ]
    }
  }
};

describe('User document page', () => {
  let ownDocument;

  beforeEach(() => {
    ownDocument = mount(<OwnDocument {...props}/>, testContext);
  });

  it('Should render four inputs', () => {
    expect(ownDocument.find('input').length).toBe(3);
    expect(ownDocument.find('textarea').length).toBe(1);
  });

  it('Should render one button', () => {
    expect(ownDocument.find('button').length).toBe(1);
    expect(ownDocument.find('button').text()).toBe('Create');
  });

  it('Should render one form element', () => {
    expect(ownDocument.find('form').length).toBe(1);
  });

  it('Should contain the correct header title', () => {
    expect(ownDocument.find('.header-class').text()).toBe('My Documents');
  });

  it('Should contain a FAB icon', () => {
    expect(ownDocument.find('.btn-floating').length).toBe(1);
    expect(ownDocument.find('.btn-floating').text()).toBe('add');
    ownDocument.find('.btn-floating').simulate('click');
  });

  it('Should not contain document card ', () => {
    expect(ownDocument.find('.card').length).toBe(0);
  });

});