'use server';
import serializeSchema from '@cms/template-engine/modules/serializeSchema';
import { Schema } from '@cms/template-engine/types';

type SerializeSchemaActionProps = {
  schema: Schema[];
  templateId: string;
  serializeForBuilder: boolean;
};

const serializeSchemaAction = async ({
  schema,
  templateId,
  serializeForBuilder,
}: SerializeSchemaActionProps) => {
  const serializedSchema = await serializeSchema({
    schema,
    templateId,
    serializeForBuilder,
  });

  return serializedSchema;
};

export default serializeSchemaAction;
