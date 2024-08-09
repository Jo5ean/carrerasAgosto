import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  base: '/landing/dist/',  
  site: 'https://www-desa.ucasal.edu.ar', 
  integrations: [tailwind(), react()],
});