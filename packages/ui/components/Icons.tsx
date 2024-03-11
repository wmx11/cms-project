import { CgDisplayFlex, CgSpaceBetween } from 'react-icons/cg';
import {
  CiAlignBottom,
  CiAlignCenterH,
  CiAlignCenterV,
  CiAlignLeft,
  CiAlignRight,
  CiAlignTop,
  CiTextAlignCenter,
  CiTextAlignLeft,
  CiTextAlignRight,
} from 'react-icons/ci';
import {
  FaAngleDown,
  FaArrowLeft,
  FaBold,
  FaCog,
  FaDesktop,
  FaEye,
  FaInfoCircle,
  FaItalic,
  FaPlus,
  FaRedo,
  FaRegEdit,
  FaRegSquare,
  FaSave,
  FaTabletAlt,
  FaTrash,
  FaUnderline,
  FaUndo,
  FaLayerGroup,
  FaEyeSlash,
  FaHeading,
} from 'react-icons/fa';
import { GoDuplicate } from 'react-icons/go';
import { GrPowerReset } from 'react-icons/gr';
import { IoIosWarning, IoMdColorPalette } from 'react-icons/io';
import {
  MdColorize,
  MdGrid4X4,
  MdOutlineDragIndicator,
  MdOutlinePhoneIphone,
  MdPublish,
  MdDesignServices,
  MdBlurOn,
} from 'react-icons/md';
import { RxBorderWidth } from 'react-icons/rx';
import {
  TbRadiusTopLeft,
  TbTransform,
  TbBorderSides,
  TbBorderOuter,
  TbBorderBottom,
  TbBorderLeft,
  TbBorderRight,
  TbBorderTop,
  TbPaintOff,
} from 'react-icons/tb';
import { BsBorderStyle } from 'react-icons/bs';
import { ChevronDownIcon, LogOutIcon, MoveLeft, PlusIcon } from 'lucide-react';

export const ICON_STYLES = 'h-3 w-3 mr-2';

export const Plus = PlusIcon;
export const Cog = FaCog;
export const Trash = FaTrash;
export const Edit = FaRegEdit;
export const ArrowLeft = MoveLeft;
export const ColorPickerPipette = MdColorize;
export const Publish = MdPublish;
export const Undo = FaUndo;
export const Redo = FaRedo;
export const Info = FaInfoCircle;
export const Draggable = MdOutlineDragIndicator;
export const Transform = TbTransform;
export const Bold = FaBold;
export const Italic = FaItalic;
export const Underline = FaUnderline;
export const Duplicate = GoDuplicate;
export const ChevronDown = ChevronDownIcon;
export const Save = FaSave;
export const Desktop = FaDesktop;
export const Tablet = FaTabletAlt;
export const Mobile = MdOutlinePhoneIphone;
export const Reset = GrPowerReset;
export const Grid = MdGrid4X4;
export const Eye = FaEye;
export const EyeSlash = FaEyeSlash;
export const Warning = IoIosWarning;
export const LayersIcon = FaLayerGroup;
export const DesignIcon = MdDesignServices;
export const Heading = FaHeading;
export const Blur = MdBlurOn;
export const ColorPalette = IoMdColorPalette;
export const RemoveStylesIcon = TbPaintOff;
export const LogOut = LogOutIcon;

// Text alignment
export const TextAlignLeft = CiTextAlignLeft;
export const TextAlignCenter = CiTextAlignCenter;
export const TextAlignRight = CiTextAlignRight;

// Horizontal alignment
export const ItemsAlignLeft = CiAlignLeft;
export const ItemsAlignCenterHorizontal = CiAlignCenterH;
export const ItemsAlignRight = CiAlignRight;
export const ItemsAlignBetween = CgSpaceBetween;

// Vertical alignment
export const ItemsAlignTop = CiAlignTop;
export const ItemsAlignCenterVertical = CiAlignCenterV;
export const ItemsAlignBottom = CiAlignBottom;

// Layout types
export const LayoutBlock = FaRegSquare;
export const LayoutFlex = CgDisplayFlex;

// Border
export const BorderRadiusTopLeft = TbRadiusTopLeft;
export const BorderWidth = RxBorderWidth;
export const BorderStyle = BsBorderStyle;
export const BorderSides = TbBorderSides;
export const BorderOuter = TbBorderOuter;
export const BorderTop = TbBorderTop;
export const BorderRight = TbBorderRight;
export const BorderBottom = TbBorderBottom;
export const BorderLeft = TbBorderLeft;
