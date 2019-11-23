export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modal, info) => {
  return {
    type: OPEN_MODAL,
    modal: modal,
    info: info
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const closeBingo = () => dispatch => {
  dispatch(closeModal())
}