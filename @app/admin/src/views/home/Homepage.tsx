import AlphaBadge from '@admin/components/AlphaBadge';
import Title from '@cms/ui/components/Title';

const Homepage = async () => {
  return (
    <div className="prose min-w-full">
      <div>
        <Title>
          Welcome to{' '}
          <span className="inline-flex items-center justify-start gap-2">
            Tiglee <AlphaBadge />
          </span>
        </Title>
        <div>
          <p>
            Tiglee is a component-based website builder aiming to reduce the
            visual clutter of a typical builder. Tiglee draws some inspiration
            from Notion's user interface.
          </p>
          <p>
            Component sets allow users to use a variety of already designed
            components so they don't have to worry about design and
            accessibility.
          </p>
          <p>
            Our ultimate goal is to become a hybrid product that can be used as
            a SaaS on the cloud or be self-hosted. Most website builders lock
            you into their platform - any future migrations or changes are
            expensive.
          </p>
          <p>
            Tiglee aims to fix this issue by creating a platform and a software
            that can be used as a cloud-based SaaS product by simple users or be
            self-hosted and whitelabeled by small and medium size agencies that
            do website-based marketing, have non-technical people, or need to
            create websites fast and repeatedly.
          </p>
          <p>
            This approach allows businesses and people save money on using
            expensive website builders that lock you into their platform, save
            effort on design and hosting, and create good-looking websites that
            leave people in awe.
          </p>
          <p>
            If you have any questions, suggestions, feedback, or notice any
            problems with the tool, feel free to e-mail us at{' '}
            <a href="mailto:info@modiggo.com">info@modiggo.com</a>
          </p>
        </div>
      </div>
      <div>
        <Title order={2}>Getting started</Title>
        <p>
          To start using Tiglee it's simple - click the "Create new site" option
          on the left-side menu, choose a template, fill in the "Site alias",
          "Site title", "Site description" and select your "Component set".
          Click "Create site" and you're done!
        </p>
        <p>
          Don't forget to save drafts of your work because automated saves are
          not ready yet.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
