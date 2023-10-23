import { Body, Button, Container, Head, Hr, Html, Img, Link, Preview, Section, Tailwind, Text } from "@jsx-email/all";

import { defaulted, object, string, type Infer } from "superstruct";
import * as React from "react";

export const TemplateName = "BookReady";

export const TemplateStruct = object({
  title: defaulted(string(), "Galactic Shadows: The Orc's Prophecy"),
  link: defaulted(
    string(),
    "https://author-gpt-git-generate-wordware.vercel.app/view/2d72870d-716e-4aeb-8cba-de3c0303ae7e",
  ),
  image: defaulted(
    string(),
    "https://storage.mystic.ai/run_files/63/b5/63b582a5-6186-468e-9101-8e884368cbda/image-0.jpg",
  ),
});

export type TemplateProps = Infer<typeof TemplateStruct>;

const main = {
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

export const Template = ({ title, link, image }: TemplateProps) => (
  <Html>
    <Head />
    <Preview>{title} is ready to read!</Preview>
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              border: "hsl(214.3 31.8% 91.4%)",
              input: "hsl(214.3 31.8% 91.4%)",
              ring: "hsl(215 20.2% 65.1%)",
              background: "hsl(0 0% 100%)",
              foreground: "hsl(222.2 47.4% 11.2%)",
              primary: {
                DEFAULT: "hsl(222.2 47.4% 11.2%)",
                foreground: "hsl(210 40% 98%)",
              },
              secondary: {
                DEFAULT: "hsl(210 40% 96.1%)",
                foreground: "hsl(222.2 47.4% 11.2%)",
              },
              destructive: {
                DEFAULT: "hsl(0 100% 50%)",
                foreground: "hsl(210 40% 98%)",
              },
              muted: {
                DEFAULT: "hsl(210 40% 96.1%)",
                foreground: "hsl(215.4 16.3% 46.9%)",
              },
              accent: {
                DEFAULT: "hsl(210 40% 96.1%)",
                foreground: "hsl(222.2 47.4% 11.2%)",
              },
              popover: {
                DEFAULT: "hsl(0 0% 100%)",
                foreground: "hsl(222.2 47.4% 11.2%)",
              },
              card: {
                DEFAULT: "hsl(0 0% 100%)",
                foreground: "hsl(222.2 47.4% 11.2%)",
              },
            },
          },
        },
      }}
    >
      <Body style={main} className="bg-stone-50">
        <Container className="bg-white px-4">
          <Section>
            <Text className="font-extrabold text-4xl">Your book is ready!</Text>
            <Text className="font-extrabold text-2xl mt-6 mb-4">{title}</Text>
            <Img src={image} alt="Cover image" width="100%" className="mb-6" />
            <Button
              href={link}
              className="select-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
            >
              Read now
            </Button>
            <Hr className="mt-8" />
            <Text>
              Any questions or feedback simply reach out to{" "}
              <Link href={`mailto:support@wordware.ai?subject=AuthorGPT`}>support@wordware.ai</Link>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
