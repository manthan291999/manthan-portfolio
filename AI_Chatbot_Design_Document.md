# AI Chatbot Design Document
**Portfolio Website Integration**

Version: 1.0  
Date: February 14, 2026  
Component: AI-Powered Portfolio Assistant Chatbot

---

## 1. Visual Style & Mood

### Overall Aesthetic
**Modern Technical Professional** - Clean, sophisticated interface that reflects cutting-edge AI technology while maintaining approachability and professionalism.

### Design Philosophy
- **Futuristic yet Friendly**: Balance advanced tech aesthetics with welcoming UX
- **Minimalist Interface**: Focus on conversation, minimal visual clutter
- **Premium Feel**: High-quality animations and smooth interactions
- **Trustworthy**: Professional color scheme and typography that builds credibility

### Mood & Emotion
- Intelligent and capable
- Approachable and helpful
- Innovative and forward-thinking
- Professional but not corporate-stiff
- Responsive and alive (through micro-interactions)

### Design Inspiration References
- ChatGPT's clean conversation interface
- Intercom's chat widget placement and behavior
- Linear's smooth animations and modern UI
- Vercel's technical aesthetic and color palette
- Stripe's attention to micro-interactions

---

## 2. Color Palette

### Primary Colors
```
Main Brand Blue: #2563EB
├─ Use: Primary CTA buttons, active states, links
├─ RGB: rgb(37, 99, 235)
└─ HSL: hsl(217, 82%, 53%)

Deep Navy: #1E293B
├─ Use: Chat header, dark text, borders
├─ RGB: rgb(30, 41, 59)
└─ HSL: hsl(217, 33%, 17%)
```

### Secondary Colors
```
Electric Purple: #7C3AED
├─ Use: Accent highlights, AI message indicators
├─ RGB: rgb(124, 58, 237)
└─ HSL: hsl(258, 83%, 58%)

Soft Gray: #64748B
├─ Use: Secondary text, placeholders, subtle borders
├─ RGB: rgb(100, 116, 139)
└─ HSL: hsl(215, 16%, 47%)
```

### Background Colors
```
Pure White: #FFFFFF
├─ Use: Chat messages background, main container
└─ For: User messages, light theme base

Light Gray: #F8FAFC
├─ Use: Chat widget background, AI message bubbles
├─ RGB: rgb(248, 250, 252)
└─ HSL: hsl(210, 40%, 98%)

Slate Gray: #F1F5F9
├─ Use: Hover states, input field background
├─ RGB: rgb(241, 245, 249)
└─ HSL: hsl(210, 40%, 96%)

Gradient Background (Chat Header):
├─ linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)
└─ Use: Header background for premium feel
```

### Text Colors
```
Primary Text: #0F172A
├─ Use: Main message text, headings
├─ RGB: rgb(15, 23, 42)
└─ HSL: hsl(222, 47%, 11%)

Secondary Text: #475569
├─ Use: Timestamps, helper text, metadata
├─ RGB: rgb(71, 85, 105)
└─ HSL: hsl(215, 19%, 35%)

Muted Text: #94A3B8
├─ Use: Placeholder text, disabled states
├─ RGB: rgb(148, 163, 184)
└─ HSL: hsl(214, 20%, 65%)
```

### Status & Semantic Colors
```
Success Green: #10B981
├─ Use: Success messages, confirmation indicators
└─ RGB: rgb(16, 185, 129)

Warning Amber: #F59E0B
├─ Use: Warning states, important notices
└─ RGB: rgb(245, 158, 11)

Error Red: #EF4444
├─ Use: Error messages, failed states
└─ RGB: rgb(239, 68, 68)

AI Typing Indicator: #7C3AED (Electric Purple)
└─ Use: Animated dots when AI is generating response
```

---

## 3. Typography

### Font Families
```
Primary Font (Sans-Serif):
├─ Family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
├─ Use: All UI elements, chat messages, buttons
└─ Weight Range: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

Monospace Font (Code Display):
├─ Family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace
├─ Use: Code snippets, technical responses, file paths
└─ Weight: 400 (Regular), 500 (Medium)
```

### Typography Scale

#### Chat Header
```
Header Title:
├─ Font: Inter
├─ Size: 18px
├─ Weight: 600 (Semibold)
├─ Line Height: 24px
├─ Color: #FFFFFF
└─ Letter Spacing: -0.01em

Header Subtitle:
├─ Font: Inter
├─ Size: 13px
├─ Weight: 400 (Regular)
├─ Line Height: 18px
├─ Color: rgba(255, 255, 255, 0.85)
└─ Letter Spacing: 0em
```

#### Chat Messages
```
User Message Text:
├─ Font: Inter
├─ Size: 15px
├─ Weight: 400 (Regular)
├─ Line Height: 22px
├─ Color: #0F172A
└─ Letter Spacing: -0.01em

AI Message Text:
├─ Font: Inter
├─ Size: 15px
├─ Weight: 400 (Regular)
├─ Line Height: 22px
├─ Color: #1E293B
└─ Letter Spacing: -0.01em

Timestamp:
├─ Font: Inter
├─ Size: 11px
├─ Weight: 400 (Regular)
├─ Line Height: 16px
├─ Color: #94A3B8
└─ Letter Spacing: 0em
```

#### Input & Buttons
```
Input Placeholder:
├─ Font: Inter
├─ Size: 14px
├─ Weight: 400 (Regular)
├─ Line Height: 20px
├─ Color: #94A3B8
└─ Letter Spacing: 0em

Button Text:
├─ Font: Inter
├─ Size: 14px
├─ Weight: 500 (Medium)
├─ Line Height: 20px
├─ Color: #FFFFFF
└─ Letter Spacing: 0.01em

Suggested Question:
├─ Font: Inter
├─ Size: 13px
├─ Weight: 500 (Medium)
├─ Line Height: 18px
├─ Color: #2563EB
└─ Letter Spacing: 0em
```

#### Code Blocks
```
Inline Code:
├─ Font: JetBrains Mono
├─ Size: 13px
├─ Weight: 400 (Regular)
├─ Line Height: 20px
├─ Color: #DC2626
├─ Background: #FEF2F2
├─ Padding: 2px 6px
└─ Border Radius: 4px

Code Block:
├─ Font: JetBrains Mono
├─ Size: 13px
├─ Weight: 400 (Regular)
├─ Line Height: 20px
├─ Color: #E5E7EB
├─ Background: #1F2937
├─ Padding: 16px
└─ Border Radius: 8px
```

---

## 4. Layout & Structure

### Chat Widget Container

#### Desktop (> 768px)
```
Widget Dimensions:
├─ Width: 400px (fixed)
├─ Height: 600px (fixed)
├─ Max Height: calc(100vh - 120px)
├─ Position: Fixed
├─ Bottom: 24px
├─ Right: 24px
└─ Z-index: 9999

Shadow:
├─ box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15),
│              0 4px 12px rgba(0, 0, 0, 0.08)
└─ Elevation: High (to float above content)

Border Radius: 16px
Border: 1px solid rgba(0, 0, 0, 0.08)
```

#### Tablet (481px - 768px)
```
Widget Dimensions:
├─ Width: 380px
├─ Height: 550px
├─ Position: Fixed
├─ Bottom: 20px
├─ Right: 20px
└─ Z-index: 9999
```

#### Mobile (≤ 480px)
```
Widget Dimensions:
├─ Width: 100vw
├─ Height: 100vh
├─ Position: Fixed
├─ Top: 0
├─ Left: 0
├─ Right: 0
├─ Bottom: 0
├─ Border Radius: 0 (Full screen)
└─ Z-index: 9999
```

### Internal Layout Structure

```
┌─────────────────────────────────────┐
│  Chat Header (60px height)          │
│  ├─ Avatar + Title + Online Status  │
│  └─ Minimize/Close buttons          │
├─────────────────────────────────────┤
│                                     │
│  Messages Container                 │
│  ├─ Flexible height                 │
│  ├─ Overflow-y: auto                │
│  ├─ Padding: 16px                   │
│  └─ Gap between messages: 12px      │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  Suggested Questions (optional)     │
│  └─ Height: auto, max 80px          │
├─────────────────────────────────────┤
│  Input Container (auto height)      │
│  ├─ Min height: 60px                │
│  ├─ Padding: 12px 16px              │
│  └─ Border-top: 1px solid #E2E8F0   │
└─────────────────────────────────────┘
```

### Spacing System
```
Extra Small: 4px   (xs)  - Icon padding, micro-spacing
Small:       8px   (sm)  - Compact spacing, tight elements
Medium:      12px  (md)  - Default gap between messages
Large:       16px  (lg)  - Container padding, section spacing
Extra Large: 24px  (xl)  - Major section separation
2X Large:    32px  (2xl) - Hero spacing, major dividers
```

### Grid System
- **12-column responsive grid** for message alignment
- Messages occupy max 85% of container width
- User messages: Right-aligned (columns 3-12)
- AI messages: Left-aligned (columns 1-10)

---

## 5. UI Components - Detailed Specifications

### 5.1 Chat Widget Toggle Button (Collapsed State)

#### Dimensions & Position
```
Desktop:
├─ Size: 60px × 60px (circular)
├─ Position: Fixed, bottom: 24px, right: 24px
└─ Z-index: 9998

Mobile:
├─ Size: 56px × 56px
├─ Position: Fixed, bottom: 20px, right: 20px
└─ Z-index: 9998
```

#### Styling
```
Background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)
Border: none
Border Radius: 50% (perfect circle)
Box Shadow: 
  ├─ 0 4px 12px rgba(37, 99, 235, 0.35)
  ├─ 0 2px 6px rgba(37, 99, 235, 0.25)
  └─ Glow effect on hover

Icon:
├─ SVG chat bubble or AI sparkle icon
├─ Size: 24px × 24px
├─ Color: #FFFFFF
└─ Center aligned
```

#### States
```
Default:
└─ Scale: 1, Opacity: 1

Hover:
├─ Transform: scale(1.05)
├─ Box Shadow: 0 6px 20px rgba(37, 99, 235, 0.45)
└─ Cursor: pointer

Active (Click):
├─ Transform: scale(0.95)
└─ Transition: 150ms ease-out

With Unread Indicator:
├─ Add red dot badge
├─ Badge size: 12px × 12px
├─ Badge position: top-right corner
├─ Badge color: #EF4444
└─ Badge border: 2px solid #FFFFFF
```

#### Animation
```
Entry Animation (on page load):
├─ Delay: 1500ms
├─ Initial: translateY(100px), opacity: 0
├─ Final: translateY(0), opacity: 1
├─ Duration: 600ms
└─ Easing: cubic-bezier(0.34, 1.56, 0.64, 1)

Pulse Animation (attention grabber):
├─ Keyframe: scale(1) → scale(1.1) → scale(1)
├─ Duration: 2000ms
├─ Repeat: 3 times, then stop
├─ Timing: After 3 seconds of page inactivity
└─ Easing: ease-in-out
```

---

### 5.2 Chat Header

#### Dimensions
```
Height: 60px
Width: 100% (of widget container)
Padding: 16px
Display: flex
Align Items: center
Justify Content: space-between
```

#### Styling
```
Background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)
Border Radius: 16px 16px 0 0 (top corners only)
Border Bottom: 1px solid rgba(255, 255, 255, 0.1)
Box Shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
```

#### Components Layout
```
┌──────────────────────────────────────────────┐
│  [Avatar] [Title]  [Status]      [Min] [X]   │
│   (32px)  (Text)   (Dot)         (16px)(16px)│
└──────────────────────────────────────────────┘
```

#### Avatar
```
Size: 32px × 32px
Border Radius: 8px (rounded square)
Background: #FFFFFF
Padding: 4px
Content: AI logo or gradient icon
Box Shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
```

#### Title & Subtitle
```
Title:
├─ Text: "AI Assistant"
├─ Font: Inter, 18px, 600
├─ Color: #FFFFFF
└─ Line Height: 24px

Subtitle (optional):
├─ Text: "Online • Typically replies instantly"
├─ Font: Inter, 13px, 400
├─ Color: rgba(255, 255, 255, 0.85)
└─ Line Height: 18px
```

#### Online Status Indicator
```
Dot:
├─ Size: 8px × 8px
├─ Background: #10B981 (green)
├─ Border: 2px solid #FFFFFF
├─ Border Radius: 50%
├─ Position: Absolute, bottom-right of avatar
└─ Pulse animation (opacity 1 → 0.5 → 1, 2s loop)
```

#### Action Buttons (Minimize / Close)
```
Dimensions: 32px × 32px each
Background: rgba(255, 255, 255, 0.15)
Border Radius: 6px
Icon Size: 16px × 16px
Icon Color: #FFFFFF
Gap Between Buttons: 8px

Hover State:
├─ Background: rgba(255, 255, 255, 0.25)
├─ Transform: scale(1.05)
└─ Cursor: pointer

Active State:
├─ Background: rgba(255, 255, 255, 0.35)
└─ Transform: scale(0.95)
```

---

### 5.3 Message Bubbles

#### User Message Bubble

##### Dimensions
```
Max Width: 85% of chat container
Min Height: 36px
Padding: 10px 14px
Margin Bottom: 12px
Word Wrap: break-word
```

##### Styling
```
Background: #2563EB
Border Radius: 16px 16px 4px 16px
  ├─ Top-left: 16px (rounded)
  ├─ Top-right: 16px (rounded)
  ├─ Bottom-right: 4px (pointed toward user)
  └─ Bottom-left: 16px (rounded)

Text:
├─ Font: Inter, 15px, 400
├─ Color: #FFFFFF
├─ Line Height: 22px
└─ Letter Spacing: -0.01em

Box Shadow: 0 2px 8px rgba(37, 99, 235, 0.15)
```

##### Alignment & Layout
```
Display: flex
Flex Direction: column
Align Items: flex-end
Margin Left: auto (right-aligned)
Gap: 4px (between message and timestamp)
```

##### Timestamp
```
Font: Inter, 11px, 400
Color: #94A3B8
Text Align: right
Margin Top: 4px
Opacity: 0.7
```

##### Animation (Entry)
```
Initial State:
├─ Transform: translateX(20px)
├─ Opacity: 0
└─ Scale: 0.95

Final State:
├─ Transform: translateX(0)
├─ Opacity: 1
└─ Scale: 1

Duration: 300ms
Easing: cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

#### AI Message Bubble

##### Dimensions
```
Max Width: 85% of chat container
Min Height: 36px
Padding: 12px 16px
Margin Bottom: 12px
Word Wrap: break-word
```

##### Styling
```
Background: #F8FAFC
Border: 1px solid #E2E8F0
Border Radius: 16px 16px 16px 4px
  ├─ Top-left: 16px (rounded)
  ├─ Top-right: 16px (rounded)
  ├─ Bottom-right: 16px (rounded)
  └─ Bottom-left: 4px (pointed toward AI avatar)

Text:
├─ Font: Inter, 15px, 400
├─ Color: #1E293B
├─ Line Height: 22px
└─ Letter Spacing: -0.01em

Box Shadow: 0 1px 3px rgba(0, 0, 0, 0.08)
```

##### AI Avatar Badge
```
Size: 28px × 28px
Position: Bottom-left, outside bubble
Background: linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)
Border: 2px solid #FFFFFF
Border Radius: 50%
Box Shadow: 0 2px 6px rgba(0, 0, 0, 0.15)
Icon: AI sparkle or logo (white, 14px)
```

##### Alignment & Layout
```
Display: flex
Flex Direction: column
Align Items: flex-start
Margin Right: auto (left-aligned)
Gap: 4px
```

##### Timestamp
```
Font: Inter, 11px, 400
Color: #94A3B8
Text Align: left
Margin Top: 4px
Opacity: 0.7
```

##### Animation (Entry)
```
Initial State:
├─ Transform: translateX(-20px)
├─ Opacity: 0
└─ Scale: 0.95

Final State:
├─ Transform: translateX(0)
├─ Opacity: 1
└─ Scale: 1

Duration: 300ms
Easing: cubic-bezier(0.34, 1.56, 0.64, 1)
Delay: 200ms (after typing indicator disappears)
```

##### Links in AI Messages
```
Color: #2563EB
Text Decoration: underline
Font Weight: 500

Hover:
├─ Color: #1D4ED8
├─ Text Decoration: underline
└─ Cursor: pointer

Active:
├─ Color: #1E40AF
└─ Transform: translateY(1px)
```

---

### 5.4 Typing Indicator

#### Container
```
Max Width: 85% of chat container
Height: 48px
Padding: 12px 16px
Background: #F8FAFC
Border: 1px solid #E2E8F0
Border Radius: 16px 16px 16px 4px
Box Shadow: 0 1px 3px rgba(0, 0, 0, 0.08)
Align Items: center
Margin Bottom: 12px
```

#### Animated Dots
```
Dot Container:
├─ Display: flex
├─ Gap: 6px
└─ Align Items: center

Single Dot:
├─ Width: 8px
├─ Height: 8px
├─ Background: #7C3AED
├─ Border Radius: 50%
└─ Animation: bounce

Bounce Animation:
├─ Keyframe: translateY(0) → translateY(-8px) → translateY(0)
├─ Duration: 1.4s
├─ Easing: ease-in-out
├─ Iteration: infinite
└─ Delay: Staggered (0ms, 200ms, 400ms for 3 dots)
```

#### Avatar Badge
```
Position: Bottom-left of indicator
Same styling as AI message avatar
```

---

### 5.5 Input Field Container

#### Container Dimensions
```
Height: auto (min 60px)
Width: 100%
Padding: 12px 16px
Background: #FFFFFF
Border Top: 1px solid #E2E8F0
Border Radius: 0 0 16px 16px (bottom corners only)
Display: flex
Align Items: flex-end
Gap: 12px
```

#### Text Input Field
```
Dimensions:
├─ Min Height: 40px
├─ Max Height: 120px (scrollable after)
├─ Flex: 1 (grows to fill space)
└─ Padding: 10px 12px

Styling:
├─ Background: #F1F5F9
├─ Border: 1px solid transparent
├─ Border Radius: 12px
├─ Font: Inter, 14px, 400
├─ Color: #0F172A
├─ Line Height: 20px
└─ Resize: none

Placeholder:
├─ Color: #94A3B8
├─ Font: Inter, 14px, 400
└─ Text: "Type your message..."

Focus State:
├─ Border: 1px solid #2563EB
├─ Background: #FFFFFF
├─ Box Shadow: 0 0 0 3px rgba(37, 99, 235, 0.1)
└─ Outline: none

Disabled State:
├─ Background: #F1F5F9
├─ Color: #94A3B8
├─ Cursor: not-allowed
└─ Opacity: 0.6
```

#### Send Button
```
Dimensions:
├─ Width: 40px
├─ Height: 40px
└─ Padding: 0

Styling:
├─ Background: #2563EB
├─ Border: none
├─ Border Radius: 10px
├─ Display: flex
├─ Align Items: center
├─ Justify Content: center
└─ Cursor: pointer

Icon:
├─ SVG send/arrow icon
├─ Size: 18px × 18px
├─ Color: #FFFFFF
└─ Transform: rotate(-45deg)

Hover State:
├─ Background: #1D4ED8
├─ Transform: scale(1.05)
└─ Box Shadow: 0 4px 12px rgba(37, 99, 235, 0.35)

Active State:
├─ Transform: scale(0.95)
└─ Background: #1E40AF

Disabled State:
├─ Background: #94A3B8
├─ Cursor: not-allowed
├─ Opacity: 0.5
└─ Pointer Events: none
```

#### Character Counter (Optional)
```
Position: Absolute, bottom-right of input
Font: Inter, 11px, 400
Color: #94A3B8
Text: "X / 500"

Over Limit:
└─ Color: #EF4444 (red)
```

---

### 5.6 Suggested Questions / Quick Replies

#### Container
```
Position: Above input field
Padding: 12px 16px 0 16px
Max Height: 100px
Overflow-x: auto
Overflow-y: hidden
Display: flex
Gap: 8px
Background: #FFFFFF
Border Top: 1px solid #E2E8F0
```

#### Question Chip/Pill
```
Dimensions:
├─ Height: 32px
├─ Padding: 8px 14px
├─ Width: auto
└─ White Space: nowrap

Styling:
├─ Background: #EFF6FF
├─ Border: 1px solid #BFDBFE
├─ Border Radius: 16px (fully rounded)
├─ Font: Inter, 13px, 500
├─ Color: #2563EB
├─ Cursor: pointer
└─ Transition: all 200ms ease

Hover State:
├─ Background: #DBEAFE
├─ Border Color: #93C5FD
├─ Transform: translateY(-2px)
└─ Box Shadow: 0 2px 8px rgba(37, 99, 235, 0.15)

Active State:
├─ Transform: translateY(0)
└─ Background: #BFDBFE
```

#### Examples
```
Suggested Questions:
├─ "What are your AI projects?"
├─ "Tell me about your experience"
├─ "What technologies do you use?"
└─ "Can we schedule a call?"
```

---

### 5.7 Code Block Display

#### Inline Code
```
Background: #FEF2F2
Color: #DC2626
Font: JetBrains Mono, 13px, 400
Padding: 2px 6px
Border Radius: 4px
Border: 1px solid #FECACA
```

#### Code Block Container
```
Margin: 12px 0
Border Radius: 8px
Overflow: hidden
Box Shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
```

#### Code Block Header
```
Background: #374151
Height: 40px
Padding: 0 16px
Display: flex
Align Items: center
Justify Content: space-between
Border Bottom: 1px solid #4B5563

Language Label:
├─ Font: Inter, 12px, 500
├─ Color: #9CA3AF
└─ Text Transform: uppercase

Copy Button:
├─ Background: #4B5563
├─ Border: none
├─ Border Radius: 4px
├─ Padding: 6px 12px
├─ Font: Inter, 12px, 500
├─ Color: #E5E7EB
├─ Cursor: pointer

Copy Button Hover:
├─ Background: #6B7280
└─ Color: #FFFFFF
```

#### Code Content
```
Background: #1F2937
Color: #E5E7EB
Font: JetBrains Mono, 13px, 400
Padding: 16px
Line Height: 20px
Overflow-x: auto
Tab Size: 4

Syntax Highlighting (if applicable):
├─ Keywords: #C678DD (purple)
├─ Strings: #98C379 (green)
├─ Functions: #61AFEF (blue)
├─ Numbers: #D19A66 (orange)
└─ Comments: #5C6370 (gray)
```

---

### 5.8 Link/Button Chips in Messages

#### Dimensions
```
Height: 36px
Padding: 8px 16px
Display: inline-flex
Align Items: center
Gap: 6px
Margin: 4px 4px 4px 0
```

#### Styling
```
Background: #FFFFFF
Border: 1.5px solid #2563EB
Border Radius: 18px (fully rounded)
Font: Inter, 13px, 500
Color: #2563EB
Cursor: pointer
Transition: all 200ms ease

Icon (if present):
├─ Size: 14px × 14px
├─ Color: #2563EB
└─ Position: left of text

Hover State:
├─ Background: #2563EB
├─ Color: #FFFFFF
├─ Icon Color: #FFFFFF
└─ Transform: translateY(-2px)

Active State:
├─ Transform: translateY(0)
└─ Box Shadow: 0 2px 6px rgba(37, 99, 235, 0.2)
```

#### Examples
```
[🔗 View GitHub Repo]
[📅 Schedule Call]
[📄 Download Resume]
[💼 View Project]
```

---

### 5.9 Error State

#### Error Message Container
```
Background: #FEF2F2
Border: 1px solid #FCA5A5
Border Radius: 8px
Padding: 12px 16px
Margin: 12px 0
Display: flex
Align Items: center
Gap: 12px
```

#### Error Icon
```
Size: 20px × 20px
Color: #EF4444
Icon: Alert circle or warning triangle
```

#### Error Text
```
Font: Inter, 14px, 400
Color: #B91C1C
Line Height: 20px
```

#### Retry Button
```
Background: #EF4444
Color: #FFFFFF
Border: none
Border Radius: 6px
Padding: 6px 12px
Font: Inter, 13px, 500
Margin Top: 8px
Cursor: pointer

Hover:
├─ Background: #DC2626
└─ Box Shadow: 0 2px 6px rgba(239, 68, 68, 0.3)
```

---

### 5.10 Loading States

#### Skeleton Message (While Waiting for Response)
```
Background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)
Background Size: 200% 100%
Animation: shimmer 1.5s infinite
Border Radius: 16px 16px 16px 4px
Height: 60px
Width: 70%
Margin Bottom: 12px

Shimmer Animation:
├─ Keyframe: background-position 0% 50% → 200% 50%
├─ Duration: 1.5s
├─ Timing: linear
└─ Iteration: infinite
```

---

## 6. Animations & Micro-Interactions

### Widget Open/Close Animation
```
Opening:
├─ Initial: scale(0.8), opacity(0), translateY(20px)
├─ Final: scale(1), opacity(1), translateY(0)
├─ Duration: 400ms
├─ Easing: cubic-bezier(0.34, 1.56, 0.64, 1)
└─ Origin: bottom-right

Closing:
├─ Initial: scale(1), opacity(1), translateY(0)
├─ Final: scale(0.8), opacity(0), translateY(20px)
├─ Duration: 300ms
├─ Easing: cubic-bezier(0.4, 0, 1, 1)
└─ Origin: bottom-right
```

### Message Send Animation
```
User types → Enter pressed → Button pulses → Message flies up
├─ Send button: scale(0.9) → scale(1.1) → scale(1)
├─ Duration: 200ms
└─ Easing: ease-out
```

### Scroll Behavior
```
Auto-scroll to bottom:
├─ Trigger: New message received
├─ Behavior: smooth
├─ Duration: 300ms
└─ Easing: ease-in-out

Scroll Indicator (when not at bottom):
├─ Position: Bottom of messages container
├─ Button: Circular, 36px × 36px
├─ Icon: Down arrow
├─ Background: rgba(37, 99, 235, 0.9)
├─ Color: #FFFFFF
└─ Click: Scrolls to bottom with smooth animation
```

### Hover Effects
```
All Interactive Elements:
├─ Cursor: pointer
├─ Transition: all 200ms ease
└─ User feedback through visual change

Button Ripple Effect (on click):
├─ Circular ripple from click point
├─ Color: rgba(255, 255, 255, 0.5)
├─ Duration: 600ms
├─ Easing: ease-out
└─ Opacity: 1 → 0
```

---

## 7. Responsive Behavior

### Breakpoints
```
Mobile Small:   < 375px
Mobile:         375px - 480px
Tablet:         481px - 768px
Desktop Small:  769px - 1024px
Desktop:        1025px - 1440px
Desktop Large:  > 1440px
```

### Mobile Adjustments (≤ 480px)

#### Widget
```
├─ Full screen mode (100vw × 100vh)
├─ No border radius
├─ No shadow
└─ Z-index: 10000
```

#### Header
```
├─ Height: 56px (reduced from 60px)
├─ Padding: 12px 16px
└─ Avatar: 28px (reduced from 32px)
```

#### Messages
```
├─ Max Width: 90% (increased from 85%)
├─ Font Size: 15px (maintained)
├─ Padding: 10px 12px (slightly reduced)
└─ Bubble Border Radius: 14px (slightly reduced)
```

#### Input Container
```
├─ Padding: 10px 12px
├─ Input Height: 38px (reduced from 40px)
└─ Send Button: 36px × 36px (reduced from 40px)
```

#### Suggested Questions
```
├─ Horizontal scroll enabled
├─ Pills: Height 28px (reduced from 32px)
├─ Font: 12px (reduced from 13px)
└─ Padding: 6px 12px
```

### Tablet Adjustments (481px - 768px)

#### Widget
```
├─ Width: 380px
├─ Height: 550px
└─ Maintain floating position
```

#### All other elements scale proportionally between mobile and desktop

---

## 8. Accessibility (a11y)

### Keyboard Navigation
```
Tab Order:
1. Toggle button
2. Minimize button
3. Close button
4. Each suggested question
5. Input field
6. Send button
7. Links/buttons in messages

Enter Key:
├─ In input field: Send message
└─ On buttons: Activate button

Escape Key:
└─ Close/minimize chatbot
```

### ARIA Labels
```
Toggle Button:
├─ aria-label="Open AI chat assistant"
├─ aria-expanded="false" (when closed)
└─ aria-expanded="true" (when open)

Input Field:
├─ aria-label="Type your message"
└─ aria-describedby="char-count" (if counter present)

Send Button:
├─ aria-label="Send message"
└─ aria-disabled="true" (when empty)

Messages:
├─ role="log"
├─ aria-live="polite"
└─ aria-atomic="false"
```

### Focus States
```
All Interactive Elements:
├─ Outline: 2px solid #2563EB
├─ Outline Offset: 2px
└─ Border Radius: matches element
```

### Screen Reader Support
```
Message announcements:
├─ New AI message: "AI Assistant says: [message content]"
├─ User message: "You said: [message content]"
└─ System message: "[system message content]"

Status updates:
├─ "AI is typing..."
├─ "Message sent"
└─ "Connection lost, retrying..."
```

### Color Contrast
```
All text meets WCAG AA standards:
├─ Normal text: 4.5:1 minimum
├─ Large text (18px+): 3:1 minimum
└─ UI components: 3:1 minimum
```

---

## 9. Dark Mode Support (Optional Future Enhancement)

### Color Palette - Dark Theme
```
Primary Background: #0F172A
Secondary Background: #1E293B
Card Background: #334155
Text Primary: #F1F5F9
Text Secondary: #94A3B8
Border Color: #475569
Accent Blue: #3B82F6
AI Message Background: #1E293B
User Message Background: #2563EB (unchanged)
```

### Switching Logic
```
Trigger: System preference or manual toggle
Transition: All colors transition over 300ms
Method: CSS custom properties (variables)
Storage: localStorage for user preference
```

---

## 10. Performance Optimization

### Asset Optimization
```
SVG Icons:
├─ Inline for critical icons
├─ Lazy load for non-critical
└─ SVGO compression applied

Fonts:
├─ Load Inter weights 400, 500, 600 only
├─ Use font-display: swap
└─ Subset to Latin characters

Images:
├─ WebP format with PNG fallback
├─ Lazy load avatars and images
└─ Max size: 50KB each
```

### JavaScript Optimization
```
Code Splitting:
├─ Lazy load chatbot component
├─ Only load when button clicked
└─ Separate vendor bundles

Debouncing:
├─ Input events: 300ms
├─ Scroll events: 150ms
└─ Resize events: 200ms

Throttling:
├─ Typing indicators: 1000ms
└─ API calls: Max 1 per second
```

### Rendering Performance
```
Virtual Scrolling:
├─ Activate when > 50 messages
├─ Render only visible messages + buffer
└─ Recycle DOM elements

Animation Performance:
├─ Use CSS transforms (not top/left)
├─ Use will-change for animated elements
└─ RequestAnimationFrame for JS animations

Reduce Reflows:
├─ Batch DOM updates
├─ Use CSS containment
└─ Avoid layout thrashing
```

---

## 11. Implementation Checklist

### Phase 1: Core Structure
- [ ] Create widget container with proper positioning
- [ ] Implement toggle button with animations
- [ ] Build chat header with gradient and controls
- [ ] Set up messages container with scrolling
- [ ] Create input field with character limit

### Phase 2: Message Components
- [ ] User message bubble with styling
- [ ] AI message bubble with avatar badge
- [ ] Typing indicator animation
- [ ] Timestamp display
- [ ] Link chips and action buttons

### Phase 3: Interactions
- [ ] Suggested questions functionality
- [ ] Send message on Enter key
- [ ] Auto-scroll to bottom
- [ ] Copy code functionality
- [ ] Error state handling

### Phase 4: Polish
- [ ] All animations and transitions
- [ ] Hover and focus states
- [ ] Loading skeletons
- [ ] Mobile responsive adjustments
- [ ] Accessibility audit

### Phase 5: Integration
- [ ] Connect to AI backend API
- [ ] Implement context management
- [ ] Add analytics tracking
- [ ] Test across browsers
- [ ] Performance optimization

---

## 12. Browser Compatibility

### Supported Browsers
```
Chrome/Edge:  Version 90+
Firefox:      Version 88+
Safari:       Version 14+
Mobile Safari: iOS 14+
Chrome Mobile: Android 10+
```

### Fallbacks
```
CSS Grid: Flexbox fallback
CSS Custom Properties: Hard-coded values
backdrop-filter: Solid background color
Smooth scroll: Instant scroll on old browsers
```

---

## 13. Design System Integration

### Component Library Compatibility
```
Compatible with:
├─ Tailwind CSS (utility-first approach)
├─ Chakra UI (component patterns)
├─ Material UI (design tokens)
└─ Custom design systems

Design Tokens Export:
├─ Colors in JSON/SCSS variables
├─ Spacing scale documented
├─ Typography scale defined
└─ Shadow/elevation system
```

---

## 14. Quality Assurance

### Testing Requirements
```
Visual Regression:
├─ Screenshot comparison across breakpoints
├─ Test all interactive states
└─ Cross-browser pixel perfection

Interaction Testing:
├─ Click all buttons and links
├─ Test keyboard navigation
├─ Verify animations timing
└─ Check error states

Accessibility Testing:
├─ WAVE tool scan
├─ Screen reader testing
├─ Keyboard-only navigation
└─ Color contrast verification
```

---

## 15. Design References & Resources

### Inspiration Sources
- **ChatGPT UI** - Clean conversation design
- **Intercom** - Widget placement and behavior
- **Linear** - Micro-interactions and animations
- **Vercel** - Technical aesthetic
- **Stripe** - Attention to detail

### Design Tools
- Figma for mockups and prototyping
- Framer for advanced animations
- Chrome DevTools for responsive testing
- Lighthouse for performance audits

### Asset Resources
- Heroicons for UI icons
- Lucide Icons for additional icons
- Google Fonts (Inter)
- JetBrains Mono for code display

---

## Appendix: Color Palette Quick Reference

```
Primary Blue:     #2563EB
Electric Purple:  #7C3AED
Deep Navy:        #1E293B
Soft Gray:        #64748B

White:            #FFFFFF
Light Gray:       #F8FAFC
Slate Gray:       #F1F5F9

Text Primary:     #0F172A
Text Secondary:   #475569
Text Muted:       #94A3B8

Success:          #10B981
Warning:          #F59E0B
Error:            #EF4444
```

---

**End of Design Document**

*This document should be used in conjunction with the PRD (Product Requirements Document) for complete implementation guidance.*
