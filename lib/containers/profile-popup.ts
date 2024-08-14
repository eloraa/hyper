import type {HyperState, HyperDispatch} from '../../typings/hyper';
import {closeProfilePopup} from '../actions/sessions';
import {requestTermGroup} from '../actions/term-groups';
import ProfilePopup from '../components/profile-popup';
import {connect} from '../utils/plugins';

const mapStateToProps = (state: HyperState) => {
  return {
    borderColor: state.ui.borderColor,
    backgroundColor: state.ui.backgroundColor,
    foregroundColor: state.ui.foregroundColor,
    defaultProfile: state.ui.defaultProfile,
    profiles: state.ui.profiles
  };
};

const mapDispatchToProps = (dispatch: HyperDispatch) => {
  return {
    close: () => {
      dispatch(closeProfilePopup());
    },

    openNewTab: (profile: string) => {
      dispatch(requestTermGroup(undefined, profile));
    }
  };
};

export const ProfilePopupContainer = connect(mapStateToProps, mapDispatchToProps, null)(ProfilePopup, 'ProfilePopup');

export type ProfilePopupConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
