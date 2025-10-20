import { Icon } from '@iconify/react';

interface IconifyIconProps {
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}

const IconifyIcon = ({ icon, className, style }: IconifyIconProps) => {
  return <Icon icon={icon} className={className} style={style} />;
};

export default IconifyIcon;
