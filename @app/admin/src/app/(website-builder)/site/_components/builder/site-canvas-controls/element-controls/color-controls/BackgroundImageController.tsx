'use client';
import useAssetUpload from '@admin/hooks/useAssetUpload';
import useStyles from '@admin/hooks/useStyles';
import { Label } from '@cms/ui/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemWithDescription,
  SelectTrigger,
  SelectValue,
} from '@cms/ui/components/Select';
import { useState } from 'react';
import ImageUpload from '../../../ui/ImageUpload';
import { BackgroundControlsProps } from '../types';
import { initialBackgroundState } from './ColorControls';

const BackgroundImageController = () => {
  const { applyStyles, getActiveStyles } = useStyles();

  const activeStyles = getActiveStyles('background');

  const [state, setState] = useState<BackgroundControlsProps>(
    activeStyles ? activeStyles['background'] : initialBackgroundState
  );

  const { error, handleUpload, loading, setFile } = useAssetUpload();

  const handleSelectionChange = (
    prop: keyof typeof initialBackgroundState,
    value: string
  ) => {
    setState((prevState) => {
      return {
        ...prevState,
        [prop]: value,
      };
    });

    applyStyles({ background: { ...state, [prop]: value } });
  };

  return (
    <div className="space-y-2">
      <ImageUpload
        src={
          state?.image
            ?.match(/('.*?')/g)
            ?.at(0)
            ?.replace(/'/g, '') || ''
        }
        variant="default"
        loading={loading}
        onChange={setFile}
        onUpload={() =>
          handleUpload({
            assetType: 'image',
            bucket: 'assets',
            onSuccess: (result) => {
              const url = `url('${result.data?.url}')`;

              setState((prevState) => {
                return {
                  ...prevState,
                  image: url,
                };
              });

              applyStyles({ background: { ...state, image: url } });
            },
          })
        }
        error={error}
        showDetails
      />

      <div className="flex flex-wrap items-end gap-4 space-y-2 [&>*]:flex-1">
        <div>
          <Label htmlFor="backgroundAttachment">Background attachment</Label>
          <Select
            value={state?.attachment || ''}
            defaultValue="scroll"
            onValueChange={(value) =>
              handleSelectionChange('attachment', value)
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
            value={state?.repeat || ''}
            defaultValue="no-repeat"
            onValueChange={(value) => handleSelectionChange('repeat', value)}
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
            value={state?.size || ''}
            defaultValue="auto"
            onValueChange={(value) => handleSelectionChange('size', value)}
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
            value={state?.position || ''}
            defaultValue="center center"
            onValueChange={(value) => handleSelectionChange('position', value)}
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
