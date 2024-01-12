import {
  MdOutlineDragIndicator,
  MdOutlinePhoneIphone,
  MdPublish,
  MdColorize,
} from 'react-icons/md';
import { TbTransform } from 'react-icons/tb';
import { GoDuplicate } from 'react-icons/go';
import { CgDisplayFlex, CgSpaceBetween } from 'react-icons/cg';
import {
  CiTextAlignLeft,
  CiTextAlignCenter,
  CiTextAlignRight,
  CiAlignLeft,
  CiAlignCenterH,
  CiAlignRight,
  CiAlignTop,
  CiAlignCenterV,
  CiAlignBottom,
} from 'react-icons/ci';
import {
  FaTrash,
  FaRegEdit,
  FaArrowLeft,
  FaPlus,
  FaUndo,
  FaRedo,
  FaInfoCircle,
  FaBold,
  FaItalic,
  FaUnderline,
  FaRegSquare,
  FaAngleDown,
  FaSave,
  FaDesktop,
  FaTabletAlt,
  FaCog,
} from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';

export const Plus = FaPlus;
export const Cog = FaCog;
export const Trash = FaTrash;
export const Edit = FaRegEdit;
export const ArrowLeft = FaArrowLeft;
export const ColorPicker = MdColorize;
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
export const ChevronDown = FaAngleDown;
export const Save = FaSave;
export const Desktop = FaDesktop;
export const Tablet = FaTabletAlt;
export const Mobile = MdOutlinePhoneIphone;
export const Reset = GrPowerReset;

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
