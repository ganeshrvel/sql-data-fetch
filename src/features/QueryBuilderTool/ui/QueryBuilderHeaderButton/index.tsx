import React from 'react';
import styles from './index.module.scss';
import Button from '../../../../components/Button';
import classNames from 'classnames';

export interface QueryBuilderHeaderButtonProps {
  text: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  icon: string;
}
export default function QueryBuilderHeaderButton({
  text,
  icon,
  onClick,
  disabled,
  className,
}: QueryBuilderHeaderButtonProps) {
  return (
    <Button
      className={classNames(styles.root, className)}
      text={text}
      onClick={onClick}
      icon={icon}
      disabled={disabled}
    />
  );
}
