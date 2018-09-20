import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import mq from '../utils/mq';

class LenseOutput extends Component {
  static propTypes = {
    className: PropTypes.string,
    password: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    password: '',
  };

  state = {};

  render() {
    const { className, password } = this.props;

    return (
      <div
        className={css`
          color: #f4f4f4;
          background-color: #1c304a;
          & ::-webkit-scrollbar {
            width: 1rem;
          }
          & ::-webkit-scrollbar-thumb {
            background: #cdcdcd;
          }
          & ::-webkit-scrollbar-track {
            background: #f0f0f0;
          }
          overflow-x: scroll;
          overflow-y: hidden;
          white-space: nowrap;
          text-align: center;
          width: 100%;
          font-size: 1.25rem;
          ${mq.md(css`
            font-size: 1.5rem;
          `)};
          ${mq.lg(css`
            font-size: 2.25rem;
          `)};
          ${className};
        `}
      >
        <div
          className={css`
            display: inline-block;
            margin: 1rem;
          `}
        >
          {password}
        </div>
      </div>
    );
  }
}

export default LenseOutput;
