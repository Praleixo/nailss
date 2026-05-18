# Stefany Aleixo Unhas

Site estatico criado com HTML, CSS e JavaScript puro, pronto para publicacao na Vercel com deploy automatico via GitHub.

## Estrutura

```text
nailss/
├── index.html
├── package.json
├── vercel.json
├── README.md
├── .gitignore
├── scripts/
│   └── build.mjs
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── img/
│   └── icons/
└── public/
```

## Arquivos principais

- `index.html`: pagina principal, meta tags SEO, Open Graph, favicon e links dos assets.
- `package.json`: metadados do projeto e scripts locais, sem dependencias de framework.
- `scripts/build.mjs`: gera a pasta `dist/` usada no deploy da Vercel.
- `assets/css/style.css`: estilos responsivos para desktop e mobile.
- `assets/js/script.js`: menu mobile, animacoes, galeria e formulario.
- `assets/img/`: imagens do site.
- `assets/icons/`: favicon e icones do projeto.
- `public/`: pasta reservada para arquivos publicos extras.
- `vercel.json`: configuracao de build, cache, rotas e headers para deploy estatico.
