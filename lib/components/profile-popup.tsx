import React, {forwardRef, useEffect, useRef} from 'react';
import type {KeyboardEvent} from 'react';

import type {ProfilePopupConnectedProps} from '../containers/profile-popup';

const ProfilePopup = forwardRef<HTMLDivElement, ProfilePopupConnectedProps>((props, ref) => {
  const {backgroundColor, foregroundColor, borderColor, profiles, openNewTab, close} = props;
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    listItemsRef.current[0]?.focus();
  }, [listItemsRef.current]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = listItemsRef.current.findIndex((item) => item === document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % profiles.length;
      listItemsRef.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + profiles.length) % profiles.length;
      listItemsRef.current[prevIndex]?.focus();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % profiles.length;
      listItemsRef.current[nextIndex]?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      listItemsRef.current[currentIndex]?.click();
    }
  };

  const handleOpen = (profile: string) => {
    openNewTab(profile);
    close();
  };
  return (
    <div className="profile_popup" ref={ref}>
      <div className="profile_popup_overlay" onClick={close}></div>
      <div className="profile_popup_list_container" onKeyDown={handleKeyDown}>
        <ul className="profile_popup_list">
          {profiles.map((profile, index) => (
            <li
              tabIndex={0}
              key={profile.name}
              className="profile_list_item"
              onMouseOver={() => listItemsRef.current[index]?.focus()}
              ref={(el) => (listItemsRef.current[index] = el)}
              onClick={() => handleOpen(profile.name)}
            >
              {profile.name}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .profile_popup {
          position: absolute;
          inset: 0;
          z-index: 1000;

          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 2%;
        }
        .profile_popup_overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .profile_popup_list_container {
          background-color: ${backgroundColor};
          border: 1px solid ${borderColor};
          color: ${foregroundColor};
          padding: 10px;
          z-index: 10;
          min-width: 180px;
        }
        .profile_popup_list {
          list-style-type: none;
        }
        .profile_list_item {
          padding: 8px 10px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 3px;
          transition:
            background-color 200ms ease,
            box-shadow 200ms ease;
        }
        .profile_list_item:hover {
          background-color: ${borderColor};
        }
        .profile_list_item:focus {
          outline: none;
          background-color: ${borderColor};
          box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.5);
        }
      `}</style>
    </div>
  );
});

ProfilePopup.displayName = 'ProfilePopup';

export default ProfilePopup;
