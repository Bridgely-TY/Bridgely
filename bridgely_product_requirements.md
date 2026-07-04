# Bridgely Product Requirements Document

## 1. Product Overview

**Project Name:** Bridgely

**Product Type:** AAC-style communication app

**Goal:**  
Bridgely is a communication app for children with complex communication needs, especially children who are non-speaking, minimally speaking, or inconsistently speaking. The app helps children express needs, feelings, choices, and ideas through picture-based communication cells and text-to-speech.

The app is designed for use across home, school, and caregiver-supported environments. Caregivers, parents, teachers, and support staff can customize the child’s communication boards while keeping the child-facing interface simple, stable, and low-distraction.

**Core Product Thesis:**  
Bridgely should be simple to start, but deep enough to grow.

The app should not overwhelm the child with too many buttons or complex navigation, but it also should not limit the child to only basic needs like “food,” “bathroom,” or “help.” It should support meaningful communication over time.

---

## 2. Target Users

### Primary User

The primary user is the child or AAC communicator.

This includes children who:
- Are non-speaking, minimally speaking, or inconsistently speaking
- Have difficulty communicating verbally
- Can interact with an iPad, phone, tablet, or computer
- Benefit from visual-first communication
- May become overwhelmed by complex interfaces

### Secondary Users

Secondary users include:
- Parents
- Caregivers
- Teachers
- Special educators
- Therapists
- School aides
- Support staff

These users are responsible for setting up, editing, and maintaining the child’s communication boards.

---

## 3. Core Problem

Many existing communication apps are either too expensive, too complicated, or too overwhelming for children who need simple, visual-first communication support.

Common issues with existing tools include:
- High cost
- Complex setup
- Overwhelming interfaces
- Too many buttons at once
- Difficult navigation
- Buttons that are too small
- Lack of routine-based customization
- Caregiver confusion during onboarding
- Limited affordability for families without access to specialized resources

Bridgely aims to reduce these barriers by making communication more accessible, customizable, and calm.

---

## 4. MVP Product Requirements

### A. Child Communication Mode

The app must include a dedicated child-facing mode where the child can communicate by tapping visual cells.

Child Mode must include:
- Large picture-based buttons
- Minimal distractions
- No visible editing controls
- Consistent layout
- Text-to-speech output when a cell is tapped
- Optional sentence bar
- Simple board navigation
- A fixed calm/urgent needs board
- Stable button placement

Child Mode should not allow:
- Editing boards
- Deleting cells
- Rearranging buttons
- Accessing caregiver settings
- Accidental layout changes

---

### B. Caregiver Setup Mode

The app must include a caregiver/admin mode where adults can customize the child’s communication experience.

Caregiver Mode must include:
- Add, edit, delete, and reorder communication cells
- Add photos or icons
- Add text labels
- Add spoken phrases
- Create custom boards
- Edit existing boards
- Hide or show cells
- Preview Child Mode
- Lock editing before entering Child Mode

Caregiver Mode should be easy enough for a non-technical adult to use.

---

## 5. Communication Board Requirements

### A. Starter Boards

Bridgely should come with prebuilt boards so the user is not starting from zero.

Minimum starter boards:
- Home
- Food and drink
- Bathroom
- Pain / illness
- Emotions
- School
- People
- Activities
- Yes / No / Help / Stop / More

---

### B. Core Vocabulary Board

The app should include a simple core vocabulary board with flexible words that can be used across many situations.

Examples:
- I
- want
- go
- stop
- more
- help
- like
- don’t
- yes
- no
- feel
- need
- finished
- again
- different
- look
- listen

This is important because the app should support more than basic requests. The child should be able to communicate needs, feelings, choices, refusals, preferences, and ideas.

---

### C. Custom Boards

Caregivers must be able to create custom boards for specific routines and contexts.

Examples:
- Morning routine
- Going to school
- Eating lunch
- Bedtime
- Doctor visit
- Stress support
- Family time
- Classroom activities
- Playground
- Transportation

Each custom board should support:
- Board name
- Board icon or image
- Grid size
- Custom cells
- Optional color/category grouping
- Text-to-speech phrase per cell
- Navigation to other boards

---

## 6. Communication Cell Requirements

Each communication cell should contain:
- Image, symbol, or uploaded photo
- Text label
- Spoken output phrase
- Optional category
- Optional color
- Optional destination board link

Example:

Cell label: **Water**  
Spoken phrase: **I want water.**  
Category: **Food/Drink**  
Image: Glass of water

### Cell Types

The app should support two main cell types:

**Speech Cell**  
A cell that speaks a phrase out loud when tapped.

Example:  
“I need help.”

**Navigation Cell**  
A cell that opens another board.

Example:  
Tapping “Food” opens the Food and Drink board.

---

## 7. Text-to-Speech Requirements

Text-to-speech should be part of the MVP, not a later bonus.

Requirements:
- Tapping a cell speaks the phrase aloud
- Sentence bar can speak a full selected sentence
- Caregiver can customize the spoken phrase
- User can clear the sentence bar
- Speech should work without requiring the child to read
- Speech should be fast and responsive

Optional later features:
- Multiple voice options
- Voice speed adjustment
- Recorded caregiver voice
- Multilingual speech
- Different voices for different profiles

---

## 8. UI / UX Requirements

### A. Child-Facing UI

The child-facing interface must be:
- Visual-first
- Calm
- Predictable
- Low-distraction
- Large-button based
- Consistent across boards
- Usable during stress or panic

Avoid:
- Tiny icons
- Too many menus
- Long text-heavy screens
- Pop-ups
- Distracting animations
- Overly bright or chaotic colors
- Hidden gestures
- Frequent layout changes

---

### B. Button Size

Buttons should be large enough for users with motor difficulties, stress-related tapping issues, or limited fine motor control.

Practical requirement:
- Minimum tap target: 44px x 44px
- Preferred AAC cell size should be much larger, especially on tablets
- Grid options should include 2x2, 3x3, 4x4, and 5x5

---

### C. Visual Consistency

The same words should stay in the same place whenever possible.

Examples:
- “Help” should not move between boards
- “Stop” should always be easy to find
- “Yes” and “No” should be consistently placed
- The calm/urgent board should always be accessible from the same location

This matters because users may rely on memory and routine, not just reading.

---

## 9. Accessibility Requirements

The app should follow modern accessibility standards where relevant.

Minimum requirements:
- Large touch targets
- Strong color contrast
- No meaning conveyed by color alone
- Screen reader support for Caregiver Mode
- Clear focus states
- Simple language
- Avoid flashing visuals
- Works on tablet and mobile
- Supports landscape and portrait
- Offline use for core communication
- Caregiver Mode should allow adults to edit what they want, but editing features should be locked and inaccessible in Child Mode

AAC-specific accessibility:
- Custom grid sizes
- Image-based communication
- Text-to-speech
- Consistent button placement
- Low cognitive load
- Minimal navigation depth
- Ability to hide unused buttons without deleting them
- Stable layouts
- Easy access to urgent needs
- No unexpected automatic rearranging in Child Mode

---

## 10. Personalization Requirements

Caregivers should be able to personalize the app without making it overwhelming.

Must include:
- Add child’s name
- Add familiar people
- Add favorite foods
- Add favorite activities
- Add school-specific vocabulary
- Add routine-specific vocabulary
- Upload real photos
- Choose simple symbols/icons
- Hide advanced vocabulary until needed
- Customize spoken phrases

Important rule:

**Customization should increase relevance, not clutter.**

---

## 11. Onboarding Requirements

The onboarding should be fast and caregiver-friendly.

Minimum onboarding flow:
1. Who is using Bridgely?
2. Add child’s name
3. Choose communication level
4. Choose starting grid size
5. Choose starter boards
6. Add key people
7. Add common needs
8. Enter Child Mode

The setup should take under 5 minutes for a basic version.

Avoid asking too many questions at the beginning.

---

## 12. Safety / Stress Mode Requirements

Bridgely should include a Calm / Urgent Needs Board that is always one tap away.

This board must include:
- Help
- Stop
- Yes
- No
- I need a break
- I am hurt
- Bathroom
- Hungry
- Thirsty
- Too loud
- Too bright
- I feel scared
- I feel angry
- I don’t understand

This board should be:
- Fixed
- Easy to access
- Low-distraction
- Available from every screen
- Not automatically changed by the ranking model

This is one of Bridgely’s strongest differentiators because it supports communication during stress, panic, or overwhelm.

---

## 13. Caregiver Dashboard Requirements

The caregiver dashboard should be simple and practical.

Must include:
- View all boards
- Edit board
- Add new board
- Add new cell
- Edit existing cell
- Preview Child Mode
- Lock editing
- Reset to default template
- Hide/show cells
- Manage starter boards
- Manage custom boards

Optional later:
- Export/share board setup
- Duplicate boards
- Share with teacher or caregiver
- Import templates
- View simple usage suggestions

Avoid complex analytics in the MVP unless privacy is handled carefully.

---

## 14. Personalized Vocabulary Ranking Model

To make Bridgely more adaptive and quantitative, the app should include a lightweight ranking model that helps prioritize which communication cells are most useful for a child in a given context.

The model should not diagnose the child, predict emotions, or make clinical decisions. Instead, it should rank communication buttons based on simple, transparent signals such as frequency of use, recency of use, time of day, board context, caregiver preferences, and routine patterns.

For example, if a child often taps “water,” “bathroom,” or “break” during school hours, those cells can be surfaced more prominently within the relevant board or suggested to the caregiver as high-priority buttons.

---

### A. Ranking Inputs

The model may use:
- Frequency of cell usage
- Recency of cell usage
- Time of day
- Board/category context
- Caregiver-pinned priority cells
- Routine-based context, such as school, home, food, or bedtime
- Recently added custom vocabulary
- Emergency/urgent needs weighting

---

### B. Example Ranking Score

Each communication cell can receive a simple priority score:

**Priority Score =**  
**0.35 × Frequency Score**  
+ **0.25 × Recency Score**  
+ **0.20 × Context Match Score**  
+ **0.10 × Caregiver Priority Score**  
+ **0.10 × Urgency Weight**

This allows the app to rank useful vocabulary without relying on sensitive or invasive data.

---

### C. How the Ranking Model Should Be Used

The ranking model should support:
- Suggested cells for the caregiver to add
- Recommended ordering within a board
- “Frequently Used” section
- Context-aware board suggestions
- Routine-based communication shortcuts
- Caregiver-facing cell recommendations

The model should not automatically change the child’s main board layout without caregiver approval, because consistent button placement is important for AAC users.

Any suggested changes should appear in Caregiver Mode first, where the caregiver can accept, reject, or modify them.

---

### D. Child Mode Behavior

In Child Mode, the ranking model should not create unexpected layout changes. The child-facing interface should remain predictable, stable, and low-distraction.

Acceptable uses in Child Mode:
- A separate “Frequently Used” row if enabled by the caregiver
- Context-specific shortcut board if enabled by the caregiver
- Emergency/urgent needs board remaining fixed and always accessible

Not acceptable:
- Randomly moving buttons
- Hiding important buttons automatically
- Reordering the full board without caregiver consent
- Making clinical assumptions about the child’s needs
- Changing the calm/urgent board automatically

---

### E. Privacy Requirements for Ranking

The ranking model should be local-first whenever possible.

Usage data should stay on the device unless a caregiver explicitly chooses cloud sync.

The app should avoid collecting:
- Diagnoses
- Medical history
- Audio recordings
- Exact location
- Sensitive behavioral logs
- Any unnecessary personal data

The model should use lightweight interaction data only, such as:
- Cell tapped
- Board used
- Timestamp
- Category
- Whether a caregiver pinned or prioritized a cell

---

### F. Why This Matters

The ranking model makes Bridgely more quantitative and personalized while still respecting accessibility principles.

It allows the app to learn from usage patterns and caregiver input, helping families create communication boards that are both simple and meaningful.

The ranking model should help caregivers customize better, not constantly rearrange the child’s communication system.

---

## 15. Data and Privacy Requirements

Because this app is for children and disability-related communication, privacy is extremely important.

MVP should include:
- No public profiles
- No social features
- No ads
- No selling user data
- Local-first storage where possible
- Clear caregiver control
- Minimal data collection
- Ability to delete all data
- No unnecessary account creation for basic use

Avoid collecting:
- Diagnoses
- Medical history
- Exact location
- Sensitive behavioral logs
- Audio recordings unless necessary
- School records
- Therapy records

If cloud sync is added later, the product will need stronger consent, security, and compliance planning.

---

## 16. Technical Requirements

### Frontend

Recommended frontend:
- React Native for mobile/tablet app
- React if building a web-first prototype
- Tablet-first responsive design
- Large grid component
- Board editor
- Child Mode
- Caregiver Mode

### Backend

For the first prototype, a backend is not required if the app is local-first.

Optional backend for later:
- Supabase
- Firebase
- Custom backend

Backend may be useful for:
- Account sync
- Sharing boards
- Multi-device access
- Caregiver/teacher collaboration
- Cloud backup

### Storage

MVP storage:
- Local storage
- IndexedDB for web prototype
- SQLite or local device storage for mobile

Later storage:
- Cloud sync
- Encrypted backups
- Shared caregiver access

### Speech

MVP speech:
- Browser/device text-to-speech API
- Tap-to-speak functionality
- Sentence bar speech

Later speech:
- Higher-quality voices
- Recorded voices
- Multilingual speech
- Voice customization

### Images

Image requirements:
- Built-in icon library
- Upload custom images
- Store images locally
- Compress uploaded images
- Allow caregiver to choose between photo and symbol

### Ranking Model

Ranking model technical requirements:
- Store lightweight usage events locally
- Track cell taps by board, timestamp, and category
- Calculate frequency scores
- Calculate recency scores
- Calculate context match scores
- Allow caregiver-pinned priority cells
- Rank cells within caregiver-approved contexts
- Surface recommendations in Caregiver Mode by default
- Keep child-facing layouts stable unless caregiver enables adaptive shortcuts
- Avoid sensitive data collection

---

## 17. Non-Functional Requirements

The app should be:
- Fast to open
- Usable offline
- Low-latency when tapping speech buttons
- Stable on iPad/tablet
- Simple enough for non-technical caregivers
- Durable during repeated tapping
- Not dependent on Wi-Fi for basic communication
- Easy to reset if caregiver makes a mistake
- Safe from accidental child edits

Performance requirements:
- App loads in under 3 seconds
- Button tap speaks in under 500ms if possible
- Boards switch instantly or near-instantly
- No unnecessary animations
- No lag when tapping cells repeatedly

---

## 18. MVP Feature Priority

### Must Build

1. Child Communication Mode
2. Caregiver Setup Mode
3. Picture-based cells
4. Text-to-speech
5. Starter boards
6. Custom boards
7. Add/edit/delete cells
8. Large button grid
9. Sentence bar
10. Calm/Urgent Needs Board
11. Local storage
12. Lock editing mode
13. Stable child-facing layout

---

### Should Build

1. Upload custom photos
2. Multiple grid sizes
3. Board templates
4. Hide/show cells
5. Color/category grouping
6. Export/import board setup
7. Tablet landscape optimization
8. Personalized vocabulary ranking model
9. Frequently used communication cells
10. Caregiver-facing cell recommendations

---

### Could Build Later

1. Cloud accounts
2. Sharing boards between caregiver and teacher
3. Sharing boards between caregiver and therapist
4. Multilingual support
5. Recorded voices
6. Usage insights
7. AI board suggestions
8. School profiles
9. Home profiles
10. Visual schedules
11. Emotion regulation tools
12. Integration with SLP-created plans
13. Multi-device sync
14. Caregiver collaboration
15. Data export

---

## 19. Features to Avoid in the MVP

Do not build these first:
- AI diagnosis
- Behavior prediction
- Medical recommendations
- Complex analytics
- Social/community features
- Full therapy integration
- Marketplace of boards
- Too many animations
- Chatbot-style communication
- Emotion detection from camera/audio
- Automatic board rearrangement in Child Mode
- Collecting sensitive medical information
- Requiring internet for basic communication

These would make the project harder, riskier, and less focused.

---

## 20. Suggested MVP User Flow

### Flow 1: First-Time Setup

1. Caregiver opens Bridgely
2. Adds child’s name
3. Chooses grid size
4. Selects starter boards
5. Adds key people
6. Adds common needs
7. Enters Child Mode

---

### Flow 2: Child Communication

1. Child sees large visual grid
2. Child taps a cell
3. App speaks the phrase aloud
4. Cell can be added to sentence bar
5. Child can speak full sentence
6. Child can clear sentence
7. Child can access calm/urgent board at any time

---

### Flow 3: Caregiver Editing

1. Caregiver enters Caregiver Mode
2. Selects a board
3. Adds or edits a cell
4. Chooses image/icon
5. Adds label
6. Adds spoken phrase
7. Saves changes
8. Previews Child Mode
9. Locks editing

---

### Flow 4: Ranking Model Recommendation

1. App tracks lightweight cell usage locally
2. Ranking model calculates frequently and recently used cells
3. App suggests useful cells or ordering changes in Caregiver Mode
4. Caregiver reviews suggestion
5. Caregiver accepts, rejects, or modifies
6. Child Mode remains stable unless caregiver approves changes

---

## 21. Best MVP Definition

Bridgely’s MVP should be:

**A tablet-first AAC communication app where a child can tap large visual cells to speak, and a caregiver can quickly customize calm, routine-based boards without overwhelming the child.**

The ranking model should support this by making customization more personalized and data-informed, while keeping the child-facing experience predictable and safe.
