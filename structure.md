/novel-nest
├── /app
│   ├── /admin                                # Protected admin routes
│   │   ├── /importer
│   │   │   └── page.tsx                      # UI for the crawler module
│   │   ├── /stories
│   │   │   ├── /edit
│   │   │   │   └── [id]
│   │   │   │       └── page.tsx              # Edit story and its chapters
│   │   │   └── page.tsx                      # Story management table
│   │   ├── layout.tsx                        # Admin dashboard layout
│   │   └── page.tsx                          # Admin dashboard homepage
│   │
│   ├── /api
│   │   └── /auth
│   │       └── /[...nextauth]
│   │           └── route.ts                  # NextAuth.js route handler
│   │
│   ├── /story
│   │   └── /[slug]
│   │       ├── /[chapter_number]
│   │       │   └── page.tsx                  # Chapter reading page
│   │       └── page.tsx                      # Story detail page
│   │
│   ├── layout.tsx                            # Root layout
│   └── page.tsx                              # Landing page
│
├── /components
│   ├── /admin                                # Admin-specific components
│   ├── /auth                                 # Login/Logout buttons, etc.
│   ├── /reader                               # Reader controls (font size, theme)
│   ├── /story                                # Story cards, carousels, etc.
│   └── /ui                                   # Shadcn/UI components
│
├── /lib
│   ├── actions                               # Server Actions (importer.ts)
│   ├── auth.ts                               # Auth.js config and helpers
│   ├── db.ts                                 # Prisma client instance
│   ├── translation.ts                        # Translation service wrapper
│   └── utils.ts                              # Utility functions
│
├── /prisma
│   ├── schema.prisma                         # Database schema
│   └── migrations/
│
├── /public                                   # Static assets (images, etc.)
│
├── middleware.ts                             # For protecting /admin routes
├── next.config.mjs
├── package.json
└── tsconfig.json