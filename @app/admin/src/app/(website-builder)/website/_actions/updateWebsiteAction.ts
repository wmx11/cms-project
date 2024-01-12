'use server';

import db from '@cms/db';
import { Schema } from '@cms/template-engine/types';

interface UpdateWebsiteAction {
  id: string;
  schema: Schema[];
}

const updateWebsiteAction = async (props: UpdateWebsiteAction) => {
  try {
    await db.website.update({
      where: {
        id: props.id,
      },
      data: {
        draft_schema: JSON.stringify(props.schema),
      },
    });

    console.log('updated');
  } catch (error) {
    console.log(error);
  }
};

export default updateWebsiteAction;
