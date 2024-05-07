import {
  ChevronDownIcon,
  LayoutTemplateIcon,
  LogOutIcon,
  MoveLeft,
  PlusIcon,
} from 'lucide-react';
import { BsBorderStyle } from 'react-icons/bs';
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
  FaBold,
  FaCog,
  FaDesktop,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaHeading,
  FaInfoCircle,
  FaItalic,
  FaLayerGroup,
  FaRedo,
  FaRegEdit,
  FaRegFolder,
  FaRegSquare,
  FaSave,
  FaTabletAlt,
  FaTrash,
  FaUnderline,
  FaUndo,
} from 'react-icons/fa';
import { GoDuplicate } from 'react-icons/go';
import { GrPowerReset } from 'react-icons/gr';
import { IoIosWarning, IoMdColorPalette } from 'react-icons/io';
import {
  MdBlurOn,
  MdColorize,
  MdDesignServices,
  MdGrid4X4,
  MdOutlineDragIndicator,
  MdOutlinePhoneIphone,
  MdPublish,
} from 'react-icons/md';
import { RxBorderWidth } from 'react-icons/rx';
import {
  TbBorderBottom,
  TbBorderLeft,
  TbBorderOuter,
  TbBorderRight,
  TbBorderSides,
  TbBorderTop,
  TbPaintOff,
  TbRadiusTopLeft,
  TbTransform,
} from 'react-icons/tb';

export const ICON_STYLES = 'h-3 w-3 mr-2';

export const ArrowLeft = <MoveLeft className={ICON_STYLES} />;
export const Blur = MdBlurOn;
export const Bold = FaBold;
export const ChevronDown = ChevronDownIcon;
export const Cog = FaCog;
export const ColorPalette = IoMdColorPalette;
export const ColorPickerPipette = MdColorize;
export const DesignIcon = MdDesignServices;
export const Desktop = FaDesktop;
export const Draggable = MdOutlineDragIndicator;
export const Duplicate = GoDuplicate;
export const Edit = FaRegEdit;
export const Eye = FaEye;
export const EyeSlash = FaEyeSlash;
export const Folder = FaRegFolder;
export const GoogleIcon = FaGoogle;
export const Grid = MdGrid4X4;
export const Heading = FaHeading;
export const Info = FaInfoCircle;
export const Italic = FaItalic;
export const LayersIcon = FaLayerGroup;
export const LogOut = LogOutIcon;
export const Mobile = MdOutlinePhoneIphone;
export const Plus = PlusIcon;
export const Publish = MdPublish;
export const Redo = FaRedo;
export const RemoveStylesIcon = TbPaintOff;
export const Reset = GrPowerReset;
export const Save = FaSave;
export const Tablet = FaTabletAlt;
export const TemplateIcon = LayoutTemplateIcon;
export const TooltipIcon = FaExclamationCircle;
export const Transform = TbTransform;
export const Trash = FaTrash;
export const Underline = FaUnderline;
export const Undo = FaUndo;
export const Warning = IoIosWarning;

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
