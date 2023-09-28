import React, { FC, PropsWithChildren } from 'react';
import Heading from './Title';
import Button from './Button';
import Container from './Container';

type HeroProps = {
  heading: string;
  subheading: string;
  cta: string;
  ctaContact: string;
  image: string;
};

const Hero: FC<PropsWithChildren & HeroProps> = ({
  heading,
  subheading,
  cta,
  ctaContact,
  image,
}) => {
  return (
    <div className="min-h-screen flex gap-16 items-center justify-center">
      <Container>
        <div className="flex gap-16 items-center justify-center">
          <div className="space-y-8 flex-1">
            <Heading>{heading}</Heading>
            <p>{subheading}</p>
            <div className="flex gap-4">
              <Button>{cta}</Button>
              <Button>{ctaContact}</Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-md overflow-hidden p-4 bg-zinc-100">
              <img className="rounded-md" src={image} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
