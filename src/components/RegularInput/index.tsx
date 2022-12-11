import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export interface RegularInputProps {
  value: string;
  title: string;
  className?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  readOnly?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
}

export default function RegularInput({
  onChange,
  value,
  className,
  maxLength,
  readOnly,
  placeholder,
  autoFocus,
  title,
}: RegularInputProps) {
  return (
    <div className={styles.root}>
      <span className={styles.title}>{title}</span>
      <input
        className={classNames(className, styles.input)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        maxLength={maxLength}
      />
    </div>
  );
}
