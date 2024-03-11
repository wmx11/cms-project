'use server';
import db from '@cms/db';
import { Schema } from '@cms/packages/tiglee-engine/types';
import { JssStyle } from 'jss';

interface UpdateWebsiteAction {
  id: string;
  schema: Schema[];
  styles: JssStyle;
}

const updateWebsiteAction = async (props: UpdateWebsiteAction) => {
  try {
    await db.website.update({
      where: {
        id: props.id,
      },
      data: {
        styles_schema: JSON.stringify(props.styles),
        draft_schema: JSON.stringify(props.schema),
      },
    });

    console.log('updated');
  } catch (error) {
    console.log(error);
  }
};

export default updateWebsiteAction;
