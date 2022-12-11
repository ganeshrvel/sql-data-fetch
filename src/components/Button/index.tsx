import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

export interface ButtonProps {
  text: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  icon: string;
}
export default function Button({
  text,
  icon,
  onClick,
  disabled,
  className,
}: ButtonProps) {
  function handleOnClick() {
    if (disabled) {
      return;
    }

    onClick?.();
  }

  return (
    <span
      className={classNames(className, styles.root, {
        [styles.disabled]: disabled,
      })}
      onClick={handleOnClick}
    >
      <span className={styles.imageWrapper}>
        <img src={icon} alt={text} />
      </span>
      <span className={styles.textWrapper}>{text}</span>
    </span>
  );
}
