'use client';
import useStyles from '@admin/hooks/useStyles';
import { Input } from '@cms/ui/components/Input';
import { Label } from '@cms/ui/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemWithDescription,
  SelectTrigger,
  SelectValue,
} from '@cms/ui/components/Select';
import { ChangeEvent, useEffect, useState } from 'react';

interface BackgroundImageString {
  backgroundImage?: string;
  backgroundAttachment?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
}

const BACKGROUND_IMAGE_INDEX = 0;
const BACKGROUND_ATTACHMENT_INDEX = 1;
const BACKGROUND_POSITION_INDEX = 2;
const BACKGROUND_SIZE_INDEX = 5;
const BACKGROUND_REPEAT_INDEX = 6;

const BackgroundImageController = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const currentBackgroundString = getActiveStyles('background');

  const isRgb = currentBackgroundString.startsWith('rgb');

  const currentBackgroundImage = isRgb
    ? currentBackgroundString
    : currentBackgroundString.split(' ');

  const backgroundImage = isRgb
    ? ''
    : currentBackgroundImage.at(BACKGROUND_IMAGE_INDEX);

  const backgroundAttachment = isRgb
    ? 'scroll'
    : currentBackgroundImage?.at(BACKGROUND_ATTACHMENT_INDEX);

  const backgroundRepeat = isRgb
    ? 'no-repeat'
    : currentBackgroundImage?.at(BACKGROUND_REPEAT_INDEX);

  const backgroundSize = isRgb
    ? 'auto'
    : currentBackgroundImage?.at(BACKGROUND_SIZE_INDEX);

  const backgroundPosition = isRgb
    ? 'center center'
    : currentBackgroundImage
        ?.at(BACKGROUND_POSITION_INDEX)
        ?.concat(
          ' ',
          currentBackgroundImage?.at(BACKGROUND_POSITION_INDEX + 1) || ''
        );

  const backgroundImageString = currentBackgroundString;

  const [state, setState] = useState({
    backgroundImage: backgroundImage,
    backgroundAttachment: backgroundAttachment,
    backgroundRepeat: backgroundRepeat,
    backgroundSize: backgroundSize,
    backgroundPosition: backgroundPosition,
    backgroundImageString: backgroundImageString,
  });

  useEffect(() => {
    applyStyles({ background: state.backgroundImageString });
  }, [state]);

  const constructBackgroundImageString = ({
    backgroundImage,
    backgroundAttachment,
    backgroundRepeat,
    backgroundSize,
    backgroundPosition,
  }: BackgroundImageString) => {
    if (!backgroundImage) {
      return '';
    }

    const backgroundString = `${backgroundImage} ${backgroundAttachment} ${backgroundPosition?.concat(
      ' ',
      '/'
    )} ${backgroundSize} ${backgroundRepeat}`;

    backgroundString?.trim();

    return backgroundString;
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;

    if (!files) {
      return;
    }

    const url = URL.createObjectURL(files[0]);

    setState((prevState) => {
      const backgroundImage = `url(${url})`;

      const backgroundImageString = constructBackgroundImageString({
        ...prevState,
        backgroundImage,
      });

      return {
        ...prevState,
        backgroundImage,
        backgroundImageString,
      };
    });
  };

  const handleSelectionChange = (
    backgroundProperty: keyof BackgroundImageString,
    value: string
  ) => {
    setState((prevState) => {
      const backgroundImageString = constructBackgroundImageString({
        ...prevState,
        [backgroundProperty]: value,
      });

      return {
        ...prevState,
        [backgroundProperty]: value,
        backgroundImageString,
      };
    });
  };

  return (
    <div className="space-y-2">
      <div>
        <Input type="file" onChange={handleUpload} />
      </div>
      <div className="w-[294px] h-[294px] bg-zinc-200 rounded-md">
        <div
          className="w-full h-full"
          style={{
            background: state.backgroundImageString
              ? state.backgroundImageString
              : state.backgroundImage,
          }}
        ></div>
      </div>
      <div className="space-y-2 flex gap-4 flex-wrap [&>*]:flex-1 items-end">
        <div>
          <Label htmlFor="backgroundAttachment">Background attachment</Label>
          <Select
            value={state.backgroundAttachment}
            defaultValue="scroll"
            onValueChange={(value) =>
              handleSelectionChange('backgroundAttachment', value)
            }
          >
            <SelectTrigger id="backgroundAttachment">
              <SelectValue placeholder="Background attachment" />
            </SelectTrigger>
            <SelectContent defaultValue="scroll">
              <SelectItem value="scroll">
                <SelectItemWithDescription
                  label="Scroll"
                  description="Default. The background image will scroll with the page."
                />
              </SelectItem>
              <SelectItem value="fixed">
                <SelectItemWithDescription
                  label="Fixed"
                  description="The background image will not scroll with the page."
                />
              </SelectItem>
              <SelectItem value="local">
                <SelectItemWithDescription
                  label="Local"
                  description="The background image will scroll with the element's contents"
                />
              </SelectItem>
              <SelectItem value="initial">
                <SelectItemWithDescription
                  label="Initial"
                  description="Sets this property to its default value."
                />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="backgroundRepeat">Background repeat</Label>
          <Select
            value={state.backgroundRepeat}
            defaultValue="no-repeat"
            onValueChange={(value) =>
              handleSelectionChange('backgroundRepeat', value)
            }
          >
            <SelectTrigger id="backgroundRepeat">
              <SelectValue placeholder="Background repeat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="initial">
                <SelectItemWithDescription
                  label="Initial"
                  description="Sets this property to its default value."
                />
              </SelectItem>
              <SelectItem value="no-repeat">
                <SelectItemWithDescription
                  label="No repeat"
                  description="The background-image is not repeated. The image will only be shown once."
                />
              </SelectItem>
              <SelectItem value="repeat">
                <SelectItemWithDescription
                  label="Repeat"
                  description="The background image is repeated both vertically and horizontally.  The last image will be clipped if it does not fit. Default."
                />
              </SelectItem>
              <SelectItem value="repeat-x">
                <SelectItemWithDescription
                  label="Repeat-X"
                  description="The background image is repeated only horizontally."
                />
              </SelectItem>
              <SelectItem value="repeat-y">
                <SelectItemWithDescription
                  label="Repeat-Y"
                  description="The background image is repeated only vertically."
                />
              </SelectItem>
              <SelectItem value="space">
                <SelectItemWithDescription
                  label="Space"
                  description="The background-image is repeated as much as possible without clipping. The first and last image is pinned to either side of the element, and whitespace is distributed evenly between the images."
                />
              </SelectItem>
              <SelectItem value="round">
                <SelectItemWithDescription
                  label="Round"
                  description="The background-image is repeated and squished or stretched to fill the space (no gaps)."
                />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="backgroundSize">Background size</Label>
          <Select
            value={state.backgroundSize}
            defaultValue="auto"
            onValueChange={(value) =>
              handleSelectionChange('backgroundSize', value)
            }
          >
            <SelectTrigger id="backgroundSize">
              <SelectValue placeholder="Background size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">
                <SelectItemWithDescription
                  label="Auto"
                  description="Default value. The background image is displayed in its original size."
                />
              </SelectItem>
              <SelectItem value="cover">
                <SelectItemWithDescription
                  label="Cover"
                  description="Resize the background image to cover the entire container, even if it has to stretch the image or cut a little bit off one of the edges."
                />
              </SelectItem>
              <SelectItem value="contain">
                <SelectItemWithDescription
                  label="Contain"
                  description="Resize the background image to make sure the image is fully visible."
                />
              </SelectItem>
              <SelectItem value="initial">
                <SelectItemWithDescription
                  label="Initial"
                  description="Sets this property to its default value."
                />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="backgroundPosition">Background position</Label>
          <Select
            value={state.backgroundPosition}
            defaultValue="center center"
            onValueChange={(value) =>
              handleSelectionChange('backgroundPosition', value)
            }
          >
            <SelectTrigger id="backgroundPosition">
              <SelectValue placeholder="Background position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left top">
                <SelectItemWithDescription label="Left top" description="" />
              </SelectItem>
              <SelectItem value="left center">
                <SelectItemWithDescription label="Left center" description="" />
              </SelectItem>
              <SelectItem value="left bottom">
                <SelectItemWithDescription label="Left bottom" description="" />
              </SelectItem>
              <SelectItem value="right top">
                <SelectItemWithDescription label="Right top" description="" />
              </SelectItem>
              <SelectItem value="right center">
                <SelectItemWithDescription
                  label="Right center"
                  description=""
                />
              </SelectItem>
              <SelectItem value="right bottom">
                <SelectItemWithDescription
                  label="Right bottom"
                  description=""
                />
              </SelectItem>
              <SelectItem value="center top">
                <SelectItemWithDescription label="Center top" description="" />
              </SelectItem>
              <SelectItem value="center center">
                <SelectItemWithDescription
                  label="Center center"
                  description=""
                />
              </SelectItem>
              <SelectItem value="center bottom">
                <SelectItemWithDescription
                  label="Center bottom"
                  description=""
                />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImageController;
