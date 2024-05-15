# Tiglee Components

This folder contains components built by Tiglee team. All components are based on **Shadcn UI** and **Tailwind**. If you want to add additional (personalized) components for your project, you will need to follow the folder structure.

1. The folder name HAS to be an alias separated by "-". For example "funky-components".

2. The folder must contain a folder named "components".

3. The "components" folder must have **.tsx** modules that export the **default component** and a **schema**.

<br/>

# Folder structure

- alias (some-components, funky-components, etc.)
  - components (Server components by default)
    - Block.tsx
    - Button.tsx
    - Container.tsx
    - CustomHtml.tsx
  - client-components (Client components that are interactive)