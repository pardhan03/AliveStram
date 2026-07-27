import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
  focused?: boolean;
}

export const HomeIcon: React.FC<IconProps> = ({ color = '#FFFFFF', size = 24, focused = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 10.182L10.74 3.732a2 2 0 012.52 0L21 10.182M5 8.5V19a2 2 0 002 2h10a2 2 0 002-2V8.5"
      stroke={color}
      strokeWidth={focused ? "2.5" : "2"}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={focused ? color : "none"}
      fillOpacity={focused ? 0.2 : 0}
    />
  </Svg>
);

export const PartyIcon: React.FC<IconProps> = ({ color = '#FFFFFF', size = 24, focused = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 21l4-15 11 11-15 4zM14 6l1 1M18 10l1 1M11 3l.5 1.5M19 4l.5 1.5M3 11l1.5.5"
      stroke={color}
      strokeWidth={focused ? "2.3" : "2"}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={focused ? color : "none"}
      fillOpacity={focused ? 0.25 : 0}
    />
    <Circle cx="17.5" cy="5.5" r="1.2" fill={color} />
    <Circle cx="12" cy="3.5" r="1" fill={color} />
    <Circle cx="4" cy="11.5" r="1" fill={color} />
  </Svg>
);

export const GoLiveSignalIcon: React.FC<IconProps> = ({ color = '#10B730', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Central solid dot */}
    <Circle cx="12" cy="12" r="3" fill={color} />
    {/* Left wave 1 */}
    <Path
      d="M8.5 8.5A5 5 0 008.5 15.5"
      stroke={color}
      strokeWidth="2.3"
      strokeLinecap="round"
    />
    {/* Right wave 1 */}
    <Path
      d="M15.5 8.5A5 5 0 0115.5 15.5"
      stroke={color}
      strokeWidth="2.3"
      strokeLinecap="round"
    />
    {/* Left wave 2 */}
    <Path
      d="M6 6A8.5 8.5 0 006 18"
      stroke={color}
      strokeWidth="2.3"
      strokeLinecap="round"
    />
    {/* Right wave 2 */}
    <Path
      d="M18 6A8.5 8.5 0 0118 18"
      stroke={color}
      strokeWidth="2.3"
      strokeLinecap="round"
    />
  </Svg>
);

export const ChatsIcon: React.FC<IconProps> = ({ color = '#FFFFFF', size = 24, focused = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
      stroke={color}
      strokeWidth={focused ? "2.3" : "2"}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={focused ? color : "none"}
      fillOpacity={focused ? 0.2 : 0}
    />
  </Svg>
);

export const ProfileIcon: React.FC<IconProps> = ({ color = '#FFFFFF', size = 24, focused = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      stroke={color}
      strokeWidth={focused ? "2.5" : "2"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="7"
      r="4"
      stroke={color}
      strokeWidth={focused ? "2.5" : "2"}
      fill={focused ? color : "none"}
      fillOpacity={focused ? 0.3 : 0}
    />
  </Svg>
);

export const BellIcon: React.FC<IconProps> = ({ color = '#4A4A4A', size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ShoppingBagIcon: React.FC<IconProps> = ({ color = '#FFFFFF', size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const EyeIcon: React.FC<IconProps> = ({ color = '#FFFFFF', size = 14 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="12" r="3" fill={color} />
  </Svg>
);
