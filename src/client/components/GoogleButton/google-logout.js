import React, { useState } from "react";
import PropTypes from "prop-types";
import useGoogleLogout from "./use-google-logout";
import ButtonContent from "./button-content";
import Icon from "./icon";

const GoogleLogout = props => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const {
    tag,
    type,
    className,
    disabledStyle,
    buttonText,
    children,
    render,
    theme,
    icon,
    disabled: disabledProp,
    onLogoutSuccess,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    fetchBasicProfile,
    redirectUri,
    discoveryDocs,
    onFailure,
    uxMode,
    scope,
    accessType,
    jsSrc
  } = props;

  const { signOut, loaded } = useGoogleLogout({
    jsSrc,
    onFailure,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    fetchBasicProfile,
    discoveryDocs,
    uxMode,
    redirectUri,
    scope,
    accessType,
    onLogoutSuccess
  });
  const disabled = disabledProp || !loaded;

  if (render) {
    return render({ onClick: signOut, disabled });
  }

  const initialStyle = {
    backgroundColor: theme === "dark" ? "rgb(66, 133, 244)" : "#fff",
    display: "inline-flex",
    alignItems: "center",
    color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, .54)",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",
    padding: 0,
    borderRadius: 2,
    border: "1px solid transparent",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif"
  };

  const hoveredStyle = {
    cursor: "pointer",
    opacity: 0.9
  };

  const activeStyle = {
    cursor: "pointer",
    backgroundColor: theme === "dark" ? "#3367D6" : "#eee",
    color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, .54)",
    opacity: 1
  };

  const defaultStyle = (() => {
    if (disabled) {
      return { ...initialStyle, ...disabledStyle };
    }

    if (active) {
      if (theme === "dark") {
        return { ...initialStyle, ...activeStyle };
      }

      return { ...initialStyle, ...activeStyle };
    }

    if (hovered) {
      return { ...initialStyle, ...hoveredStyle };
    }

    return initialStyle;
  })();
  const GoogleLogoutButton = React.createElement(
    tag,
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => {
        setHovered(false);
        setActive(false);
      },
      onMouseDown: () => setActive(true),
      onMouseUp: () => setActive(false),
      onClick: signOut,
      style: defaultStyle,
      type,
      disabled,
      className
    },
    [
      icon && <Icon key={1} active={active} />,
      <ButtonContent icon={icon} key={2}>
        {children || buttonText}
      </ButtonContent>
    ]
  );

  return GoogleLogoutButton;
};

GoogleLogout.propTypes = {
  jsSrc: PropTypes.string,
  buttonText: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  disabledStyle: PropTypes.object,
  tag: PropTypes.string,
  disabled: PropTypes.bool,
  onLogoutSuccess: PropTypes.func,
  type: PropTypes.string,
  render: PropTypes.func,
  theme: PropTypes.string,
  icon: PropTypes.bool
};

GoogleLogout.defaultProps = {
  type: "button",
  tag: "button",
  buttonText: "Logout of Google",
  disabledStyle: {
    opacity: 0.6
  },
  icon: true,
  theme: "light",
  jsSrc: "https://apis.google.com/js/api.js"
};

export default GoogleLogout;
