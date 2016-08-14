import React, {PropTypes, Component} from "react";
import SideNav from "./sideNav";
import NewDocumentForm from "./addDocument";
import Header from "../common/header";
import Fab from "../common/fab";
import {DocController} from "../common/documentController";
import UserContentPage from "./userContentPage";
import DeleteModal from "./deleteDoc";

export class OwnDocument extends Component {
  constructor() {
    super();

    this.prepareStoreForEdit = this.prepareStoreForEdit.bind(this);
  }

  componentWillReceiveProps(nextPorp, prevProps) {
    const {userData: {_id}} = this.props.stateProp.userState;
    const {docs} = this.props.stateProp.userDocs;

    this.props.lazyLoader('addOwnedDocs', _id, docs);
  }

  prepareStoreForEdit(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.docs[id];

    this.props.documentActions.preparePageForEdit(selectedDocumentData);
    this.context.router.push({
      pathname: '/docs/edit/owned/' + selectedDocumentData._id
    });
  }

  render() {
    const {
      userDocs: {
        docSuccess,
        deleteDoc,
        docs,
        lazyLoading
      },
      roles: {roles},
      userState: {userData}
    } = this.props.stateProp;

    return (
      <div className='row'>
        <Header
          searchEvent={this.props.searchEvent}
          signInEvent={this.props.logoutEvent}
          status/>
        <SideNav
          userData={userData}/>
        <UserContentPage
          header='My Documents'
          doc={docs}
          cardType='owned'
          lazyLoading={!lazyLoading}
          deleteEvent={this.props.confirmDelete}
          userId={userData._id}
          editCard={this.prepareStoreForEdit}
        />
        <Fab
          clickEvent={this.props.fabClick}/>
        <NewDocumentForm
          docRoles={roles}
          changeHandler={this.props.onChangeHandler}
          CheckboxHandler={this.props.onClickCheckbox}
          submitAction={this.props.modalSubmitAction}
          tinymceEvent={this.props.OnchangeTinymce}
          showLoader={docSuccess}/>
        <DeleteModal
          docData={deleteDoc}
          deleteEvent={this.props.deleteDoc}/>
      </div>
    );
  }
}

OwnDocument.propTypes = {
  deleteDoc: PropTypes.func,
  onClickCheckbox: PropTypes.func,
  onChangeHandler: PropTypes.func,
  fabClick: PropTypes.func,
  OnchangeTinymce: PropTypes.func,
  confirmDelete: PropTypes.func,
  lazyLoader: PropTypes.func,
  stateProp: PropTypes.object,
  documentActions: PropTypes.object,
  logoutEvent: PropTypes.func,
  modalSubmitAction: PropTypes.func
};

OwnDocument.contextTypes = {
  router: PropTypes.object
};

export default DocController(OwnDocument);
