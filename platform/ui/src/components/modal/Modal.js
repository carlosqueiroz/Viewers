import './Modal.styl';

import React from 'react';
import ResponsiveModal from 'react-responsive-modal';

import { Body } from './Body';
import { Header } from './Header';
import { Title } from './Title';
import { Footer } from './Footer';


class Modal extends React.Component {
  render() {
    const { children, ...rest } = this.props;
    return <ResponsiveModal {...rest}>{children}</ResponsiveModal>;
  }
}

Modal.Body = Body;
Modal.Header = Header;
Modal.Title = Title;
Modal.Footer = Footer;

export { Modal };
