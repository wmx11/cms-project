'use client';
import { ErrorMessageType } from '@cms/lib/handle-error-messages';
import { cn } from '@cms/lib/utils';
import { Button } from '@cms/ui/components/Button';
import ErrorMessage from '@cms/ui/components/ErrorMessage';
import { ICON_STYLES, Plus, Publish } from '@cms/ui/components/Icons';
import { cva, VariantProps } from 'class-variance-authority';
import prettyBytes from 'pretty-bytes';
import { ComponentPropsWithoutRef, FC, useState } from 'react';

const imageUploadVariants = cva(
  'group relative flex items-center justify-center overflow-clip border border-dashed border-dim transition-colors hover:border-zinc-900 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'min-h-[100px] max-w-[100%] rounded-md p-1',
        favicon: 'h-10 max-h-10 w-10 max-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface Props
  extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'>,
    VariantProps<typeof imageUploadVariants> {
  src?: string;
  error?: ErrorMessageType<{ general: string }>;
  loading?: boolean;
  showDetails?: boolean;
  onChange?: (file: File) => void;
  onUpload?: () => void;
}

const ImageUpload: FC<Props> = ({
  className,
  variant,
  src,
  loading,
  showDetails,
  error,
  onChange,
  onUpload,
}) => {
  const [image, setImage] = useState<File>();

  return (
    <>
      <div className={cn(imageUploadVariants({ variant, className }))}>
        {src || image ? (
          <img
            src={image ? URL.createObjectURL(image) : src || ''}
            alt="image upload alt description"
            className="w-full"
          />
        ) : (
          <div className="text-center">
            <Plus className="text-dim mx-auto transition-colors group-hover:text-zinc-900" />
            {variant === 'default' && (
              <span className="text-dim text-xs transition-colors group-hover:text-zinc-900">
                Click here to upload your image
              </span>
            )}
          </div>
        )}
        <input
          type="file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={(e) => {
            if (!e.currentTarget.files) {
              return;
            }
            const file = e.currentTarget.files[0];

            setImage(file);
            onChange && onChange(file);
          }}
        />
      </div>
      {image && onUpload && (
        <div className="my-2 space-y-2">
          <ErrorMessage errorMessage={error?.general} />
          <Button
            onClick={onUpload}
            size="xs"
            className="w-full"
            loading={loading}
          >
            <Publish className={ICON_STYLES} />
            <span>Upload</span>
          </Button>
        </div>
      )}
      {image && showDetails && (
        <div className="text-xs">
          <div className="break-all">
            <strong>name</strong>: {image?.name}
          </div>
          <div>
            <strong>size</strong>: {prettyBytes(image?.size)}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
