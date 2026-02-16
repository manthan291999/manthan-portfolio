# Tech Stack Document
## AI Portfolio Chatbot Assistant

**Version:** 1.0  
**Date:** February 14, 2026  
**Project Type:** AI-Powered Portfolio Website for Professional Developer

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Frontend Framework](#frontend-framework)
3. [AI & Chatbot Integration](#ai--chatbot-integration)
4. [Backend Services](#backend-services)
5. [Database & Data Storage](#database--data-storage)
6. [Styling & UI Framework](#styling--ui-framework)
7. [Key Libraries & Packages](#key-libraries--packages)
8. [Deployment & Hosting](#deployment--hosting)
9. [Analytics & Monitoring](#analytics--monitoring)
10. [Development Tools](#development-tools)
11. [API Integrations](#api-integrations)
12. [Performance Optimization](#performance-optimization)
13. [Security & Privacy](#security--privacy)
14. [Alternative Stack Options](#alternative-stack-options)

---

## Project Overview

**Purpose:** Build a modern, AI-powered portfolio website featuring an intelligent chatbot that helps visitors learn about skills, projects, and experience through natural conversation.

**Key Requirements:**
- Real-time AI chatbot interaction
- Fast, responsive single-page application
- Professional design with dark mode
- SEO-optimized for recruiter discovery
- Analytics for visitor insights
- Contact capture and scheduling integration

---

## Frontend Framework

### Meta-Framework: Next.js 14 (App Router)

**Version:** `^14.2.0`

**Why Next.js?**
- ✅ **React-based** - Industry standard, large ecosystem
- ✅ **Server-Side Rendering (SSR)** - Better SEO for recruiter discovery
- ✅ **Image Optimization** - Automatic optimization for portfolio images
- ✅ **API Routes** - Built-in backend for chatbot endpoint
- ✅ **Route Handlers** - Streaming support for AI responses
- ✅ **File-based routing** - Simple page structure
- ✅ **Zero-config deployment** - Works seamlessly with Vercel

**Rendering Strategy:**
- **Hero/Landing:** Static Site Generation (SSG) for instant load
- **Skills/Projects:** Incremental Static Regeneration (ISR) - update when content changes
- **Chatbot:** Client-Side Rendering (CSR) for real-time interaction
- **Contact Form:** Server Actions for form submission

**Configuration:**
```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['your-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
  }
}
```

---

## AI & Chatbot Integration

### Primary AI Provider: OpenAI GPT-4 API

**Model:** `gpt-4-turbo-preview` or `gpt-4o-mini` (for cost optimization)

**Why OpenAI?**
- Industry-leading natural language understanding
- Excellent context handling for follow-up questions
- Function calling for deep linking to portfolio sections
- Reliable and fast response times

**Alternative:** Anthropic Claude API (`claude-3-sonnet` or `claude-3-haiku`)
- Better at understanding nuanced questions
- Longer context window (200k tokens)
- More natural conversational tone

### LangChain for RAG (Retrieval-Augmented Generation)

**Version:** `^0.1.0`

**Purpose:**
- Connect AI to portfolio knowledge base (projects, skills, experience)
- Implement semantic search over content
- Manage conversation context and memory

**Key Features Used:**
- Document loaders for project descriptions
- Vector store integration
- Conversation chains
- Custom prompts for professional tone

### Vector Database: Pinecone

**Why Pinecone?**
- Managed vector database (no setup required)
- Fast semantic search (<50ms)
- Free tier available for portfolios
- Easy integration with LangChain

**Alternative:** Weaviate or Qdrant (self-hosted options)

**Data to Embed:**
- All project descriptions and READMEs
- Skills and technologies
- Work experience summaries
- Blog posts or technical writing
- GitHub repository information

---

## Backend Services

### API Layer: Next.js API Routes + Server Actions

**API Routes for:**
- `/api/chat` - Chatbot message endpoint (streaming)
- `/api/contact` - Contact form submission
- `/api/analytics` - Custom analytics events
- `/api/schedule` - Calendly webhook integration

**Server Actions for:**
- Form submissions
- Email notifications
- Database writes

### Serverless Functions: Vercel Edge Functions

**Why Edge Functions?**
- Deployed globally for low latency
- Ideal for chatbot responses (closer to users)
- Streaming support for real-time AI responses
- No cold starts

**Runtime:** `edge` for chatbot, `nodejs` for database operations

---

## Database & Data Storage

### Primary Database: Supabase (PostgreSQL)

**Version:** Latest

**Why Supabase?**
- PostgreSQL with realtime subscriptions
- Built-in authentication (if needed later)
- Free tier with generous limits
- RESTful API auto-generated
- Row-level security

**Schema:**
```sql
-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(255) NOT NULL,
  visitor_info JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id),
  role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Leads table (contact capture)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  linkedin_url VARCHAR(500),
  message TEXT,
  source VARCHAR(100), -- 'chatbot', 'contact_form', etc.
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics events table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  session_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Alternative:** MongoDB Atlas
- Better for flexible schema
- Easier JSON storage
- Good for rapid iteration

### File Storage: Vercel Blob Storage

**For:**
- Resume PDFs
- Project screenshots
- Portfolio images

**Why Vercel Blob?**
- Integrated with Vercel deployment
- CDN distribution
- Simple API

---

## Styling & UI Framework

### CSS Framework: Tailwind CSS v3

**Version:** `^3.4.0`

**Why Tailwind?**
- Utility-first approach matches design system
- Excellent dark mode support
- Easy responsive design
- JIT compiler for small bundle size
- Matches design document specifications

**Configuration:**
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
        },
        secondary: '#06B6D4',
        background: {
          dark: '#0A0A0F',
          card: '#1A1A24',
        },
        border: '#2A2A3A',
        text: {
          primary: '#F5F5F7',
          secondary: '#A0A0B0',
          muted: '#666675',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
```

### UI Component Library: shadcn/ui

**Why shadcn/ui?**
- Copy-paste components (no package dependency)
- Built on Radix UI (accessible primitives)
- Full TypeScript support
- Customizable with Tailwind
- Modern, professional components

**Components Used:**
- Button
- Card
- Input
- Textarea
- Dialog (for mobile chatbot)
- Tooltip
- Badge
- Tabs

---

## Key Libraries & Packages

### Animation

**Framer Motion** - `^11.0.0`
- Smooth page transitions
- Chatbot entrance/exit animations
- Scroll-triggered animations
- Gesture-based interactions

```javascript
// Example usage
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Forms

**React Hook Form** - `^7.50.0`
- Contact form validation
- Email capture in chatbot
- Low re-renders for performance

**Zod** - `^3.22.0`
- Schema validation
- TypeScript integration
- Error messages

```typescript
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})
```

### Icons

**Lucide React** - `^0.344.0`
- Modern, consistent icon set
- Tree-shakeable (only imports used icons)
- Perfect for developer portfolio aesthetic

**Used Icons:**
- MessageCircle (chatbot)
- Send (message send)
- X (close button)
- Github, Linkedin, Mail (social links)
- Code, Cpu, Database (skill icons)

### Syntax Highlighting

**Prism.js** or **Shiki** - Latest
- Display code snippets in chatbot
- Support for multiple languages
- Syntax themes matching dark mode

### Markdown Rendering

**react-markdown** - `^9.0.0`
- Render chatbot responses with formatting
- Support for code blocks
- Safe HTML rendering

**remark-gfm** - `^4.0.0`
- GitHub Flavored Markdown support
- Tables, task lists, etc.

### State Management

**Zustand** - `^4.5.0`

**Why Zustand?**
- Lightweight (1kb)
- Simple API
- No boilerplate
- TypeScript-first

**Store Structure:**
```typescript
interface ChatStore {
  messages: Message[]
  isTyping: boolean
  sessionId: string
  addMessage: (message: Message) => void
  setTyping: (typing: boolean) => void
}
```

**Alternative:** React Context API (for simple state)

### Date/Time

**date-fns** - `^3.3.0`
- Format chatbot timestamps
- Lightweight alternative to Moment.js
- Tree-shakeable

### HTTP Client

**axios** - `^1.6.0` or native `fetch`
- API calls to chatbot endpoint
- Interceptors for auth tokens
- Request cancellation

---

## Deployment & Hosting

### Primary Host: Vercel

**Why Vercel?**
- Built by Next.js creators (perfect integration)
- Automatic deployments from GitHub
- Global CDN
- Edge Functions support
- Free SSL certificates
- Zero-config deployment
- Analytics included

**Deployment Configuration:**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1", "sfo1"] // US East & West
}
```

**Environment Variables:**
- `OPENAI_API_KEY` - AI API key
- `PINECONE_API_KEY` - Vector database
- `SUPABASE_URL` - Database URL
- `SUPABASE_ANON_KEY` - Public API key
- `NEXT_PUBLIC_SITE_URL` - For OpenGraph

### Domain & DNS

**Domain Registrar:** Namecheap, Google Domains, or Cloudflare

**DNS Configuration:**
- A record pointing to Vercel
- CNAME for www subdomain
- MX records if custom email needed

### CI/CD Pipeline

**GitHub Actions** (automated testing)

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
```

**Vercel Integration:**
- Automatic preview deployments for PRs
- Production deployment on main branch merge
- Rollback capability

---

## Analytics & Monitoring

### Web Analytics: Vercel Analytics + Google Analytics 4

**Vercel Analytics:**
- Real User Metrics (Core Web Vitals)
- Page views and unique visitors
- No cookie consent needed (privacy-friendly)

**Google Analytics 4:**
- Detailed user behavior
- Conversion tracking
- Custom events for chatbot interactions

**Custom Events to Track:**
```javascript
// Chatbot events
'chatbot_opened'
'chatbot_message_sent'
'chatbot_link_clicked'
'chatbot_contact_captured'

// User journey events
'project_viewed'
'resume_downloaded'
'calendar_clicked'
'github_visited'
```

### Error Tracking: Sentry

**Version:** `^7.100.0`

**Features:**
- Real-time error notifications
- Source map support
- Performance monitoring
- User session replay
- Free tier for side projects

**Configuration:**
```javascript
// sentry.config.js
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
```

### Performance Monitoring

**Web Vitals Tracking:**
```javascript
// pages/_app.js
export function reportWebVitals(metric) {
  // Send to analytics
  if (metric.label === 'web-vital') {
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    })
  }
}
```

### Chatbot-Specific Analytics

**Custom Dashboard Metrics:**
- Total conversations
- Average conversation length
- Most asked questions
- Contact capture rate
- Response time distribution
- User satisfaction (if feedback implemented)

**Implementation:**
```javascript
// Track in Supabase + visualize with custom dashboard
await supabase.from('analytics_events').insert({
  event_type: 'chatbot_conversation_completed',
  event_data: {
    message_count: messages.length,
    duration_seconds: duration,
    contact_captured: hasContact,
    topics: extractedTopics,
  }
})
```

---

## Development Tools

### Package Manager: pnpm

**Why pnpm?**
- Faster than npm (disk space efficient)
- Strict dependency resolution
- Monorepo support (if needed later)

**Alternative:** npm or yarn

### Code Quality

**ESLint** - `^8.56.0`
- Next.js recommended config
- TypeScript rules
- React hooks rules

**Prettier** - `^3.2.0`
- Consistent code formatting
- Tailwind class sorting plugin

**Configuration:**
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ]
}
```

### Type Checking: TypeScript

**Version:** `^5.3.0`

**Why TypeScript?**
- Catch errors at compile time
- Better IDE support
- Self-documenting code
- Required for professional portfolio

**tsconfig.json highlights:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Git Hooks: Husky

**Pre-commit hooks:**
- Run Prettier
- Run ESLint
- Type check
- Run tests (if any)

### Testing (Optional but Recommended)

**Vitest** - Unit testing
**Playwright** - E2E testing (chatbot flow)

---

## API Integrations

### Calendar Scheduling: Calendly API

**Purpose:** Allow recruiters to book interviews directly from chatbot

**Integration:**
```javascript
// Chatbot provides scheduling link
const calendlyUrl = "https://calendly.com/yourname/30min"

// Or embed widget in modal
<InlineWidget url={calendlyUrl} />
```

**Webhooks:** Track when meetings are booked

### Email Service: Resend

**Version:** `^3.2.0`

**Why Resend?**
- Modern, developer-friendly API
- Free tier: 3,000 emails/month
- React Email template support
- Good deliverability

**Use Cases:**
- Send resume to interested parties
- Notify you of new contacts
- Confirm interview bookings

**React Email Templates:**
```jsx
// emails/ContactNotification.tsx
export function ContactNotification({ name, email, message }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Text>New contact from portfolio:</Text>
          <Text>Name: {name}</Text>
          <Text>Email: {email}</Text>
          <Text>Message: {message}</Text>
        </Container>
      </Body>
    </Html>
  )
}
```

### GitHub API: Octokit

**Purpose:** Fetch latest projects and stars dynamically

```javascript
// Show live GitHub stats in portfolio
const { data: repos } = await octokit.repos.listForUser({
  username: 'yourname',
  sort: 'updated',
  per_page: 6
})
```

---

## Performance Optimization

### Image Optimization

**Next.js Image Component**
```jsx
import Image from 'next/image'

<Image
  src="/project-screenshot.png"
  alt="Project"
  width={800}
  height={600}
  placeholder="blur"
  priority={false} // lazy load
/>
```

**Image formats:** AVIF → WebP → JPEG fallback

### Code Splitting

**Dynamic imports for chatbot:**
```javascript
// Only load chatbot code when opened
const Chatbot = dynamic(() => import('@/components/Chatbot'), {
  ssr: false,
  loading: () => <ChatbotSkeleton />
})
```

### Bundle Analysis

**@next/bundle-analyzer**
- Visualize bundle size
- Identify large dependencies
- Optimize imports

### Caching Strategy

**Portfolio content:** 
- Static pages: Cache-Control: public, max-age=31536000
- API routes: Stale-while-revalidate

**AI responses:** 
- Cache common questions in Redis/Upstash
- Reduce API calls and costs

---

## Security & Privacy

### Environment Variables

**Never commit:**
- API keys (OpenAI, Pinecone)
- Database credentials
- Private keys

**Use `.env.local`** (gitignored)

### Rate Limiting: Upstash Rate Limit

**Prevent abuse:**
```javascript
import { Ratelimit } from "@upstash/ratelimit"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
})

// In API route
const { success } = await ratelimit.limit(identifier)
if (!success) {
  return new Response("Too many requests", { status: 429 })
}
```

### Content Security Policy

**Next.js headers configuration:**
```javascript
// next.config.js
headers: async () => [{
  source: '/(.*)',
  headers: [
    {
      key: 'Content-Security-Policy',
      value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
    }
  ]
}]
```

### GDPR Compliance

**Cookie consent:** use `react-cookie-consent`

**Data privacy:**
- Anonymous analytics option
- Clear privacy policy
- Option to delete chat history
- Transparent data usage

---

## Alternative Stack Options

### Option 1: Full React SPA (No SSR)

**Stack:**
- Vite + React
- React Router
- Deploy to Netlify

**Pros:** Simpler, faster development  
**Cons:** Worse SEO, no API routes

### Option 2: Python Backend

**Stack:**
- Next.js frontend
- FastAPI backend (Python)
- Better for ML model hosting

**When to use:** If serving custom ML models

### Option 3: Astro + React Islands

**Stack:**
- Astro for static pages
- React only for chatbot (island)

**Pros:** Minimal JavaScript, ultra-fast  
**Cons:** More complex routing

---

## Development Timeline

### Week 1-2: Foundation
- Next.js setup
- Tailwind configuration
- Basic routing and layout

### Week 3-4: Core Features
- Chatbot UI component
- OpenAI integration
- Knowledge base setup

### Week 5-6: Enhancement
- Database integration
- Contact forms
- Calendar integration

### Week 7: Testing & Optimization
- Performance testing
- Cross-browser testing
- Mobile optimization

### Week 8: Deployment
- Vercel deployment
- Domain setup
- Analytics configuration

---

## Package.json Summary

```json
{
  "name": "ai-portfolio-chatbot",
  "version": "1.0.0",
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "openai": "^4.28.0",
    "langchain": "^0.1.0",
    "@pinecone-database/pinecone": "^2.0.0",
    "@supabase/supabase-js": "^2.39.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "react-hook-form": "^7.50.0",
    "zod": "^3.22.0",
    "zustand": "^4.5.0",
    "lucide-react": "^0.344.0",
    "date-fns": "^3.3.0",
    "axios": "^1.6.0",
    "react-markdown": "^9.0.0",
    "remark-gfm": "^4.0.0",
    "@sentry/nextjs": "^7.100.0",
    "resend": "^3.2.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.0",
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0"
  }
}
```

---

## Cost Estimation (Monthly)

| Service | Free Tier | Paid (if exceeded) |
|---------|-----------|-------------------|
| Vercel Hosting | Unlimited | $20/month Pro |
| OpenAI API | N/A | ~$10-50/month |
| Supabase | 500MB DB, 2GB storage | $25/month Pro |
| Pinecone | 1 free index | $70/month Starter |
| Resend | 3,000 emails | $20/month |
| **Total Estimated** | **$10-50/month** | **$50-150/month** |

**Note:** Most side projects stay within free tiers

---

## Final Recommendations

**This stack is ideal for:**
✅ Professional portfolio showcasing AI skills  
✅ Real-time chatbot interaction  
✅ SEO optimization for recruiter discovery  
✅ Scalable architecture for future features  
✅ Fast development and deployment  

**Key Success Factors:**
1. Start with core chatbot functionality
2. Use OpenAI's function calling for deep linking
3. Implement proper analytics from day one
4. Focus on mobile experience
5. Monitor costs (cache frequent questions)

**This is a production-ready stack used by many successful developer portfolios and AI-powered applications.**
